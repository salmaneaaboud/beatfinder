// audioAnalysis.js

let essentia = null;

// Inicializar Essentia
export const initializeEssentia = () => {
  return EssentiaWASM().then((wasmModule) => {
    essentia = new wasmModule.EssentiaJS(false);
    essentia.arrayToVector = wasmModule.arrayToVector;
  });
};

// Función para procesar el archivo de audio
export const processAudioFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      decodeFile(arrayBuffer, resolve, reject);
    };
    reader.readAsArrayBuffer(file);
  });
};

// Decodificar el archivo de audio y procesarlo
const decodeFile = (arrayBuffer, resolve, reject) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.decodeAudioData(arrayBuffer)
    .then((audioBuffer) => {
      console.log("Audio decodificado");
      const audioSignal = preprocess(audioBuffer);
      const keyBPM = computeKeyBPM(audioSignal);
      resolve(keyBPM);
    })
    .catch((error) => {
      reject(error);
    });
};

// Preprocesar el audio
const preprocess = (audioBuffer) => {
  const mono = monomix(audioBuffer);
  return downsampleArray(mono, audioBuffer.sampleRate, 16000);
};

// Convertir audio estéreo a mono
const monomix = (buffer) => {
  let monoAudio;
  if (buffer.numberOfChannels > 1) {
    const leftCh = buffer.getChannelData(0);
    const rightCh = buffer.getChannelData(1);
    monoAudio = leftCh.map((sample, i) => 0.5 * (sample + rightCh[i]));
  } else {
    monoAudio = buffer.getChannelData(0);
  }
  return monoAudio;
};

// Reducir la tasa de muestreo
const downsampleArray = (audioIn, sampleRateIn, sampleRateOut) => {
  const sampleRateRatio = sampleRateIn / sampleRateOut;
  const newLength = Math.round(audioIn.length / sampleRateRatio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetAudioIn = 0;

  while (offsetResult < result.length) {
    let nextOffsetAudioIn = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0, count = 0;
    for (let i = offsetAudioIn; i < nextOffsetAudioIn && i < audioIn.length; i++) {
      accum += audioIn[i];
      count++;
    }
    result[offsetResult] = accum / count;
    offsetResult++;
    offsetAudioIn = nextOffsetAudioIn;
  }
  return result;
};

// Función para obtener el BPM y la clave
const computeKeyBPM = (audioSignal) => {
  const vectorSignal = essentia.arrayToVector(audioSignal);
  const keyData = essentia.KeyExtractor(vectorSignal, true, 4096, 4096, 12, 3500, 60, 25, 0.2, 'bgate', 16000, 0.0001, 440, 'cosine', 'hann');
  
  const bpm = essentia.PercivalBpmEstimator(vectorSignal, 1024, 2048, 128, 128, 210, 50, 16000).bpm;

  const roundedBPM = Math.round(bpm); 

  const key = keyData.key;
  const scale = keyData.scale || "Desconocido"; 
  const fullKey = `${key} ${scale}`;

  return { keyData: { key: fullKey, scale }, bpm: roundedBPM };
};
