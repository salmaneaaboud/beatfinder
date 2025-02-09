import Loader from "/src/components/Loader/Loader";
import Error from "/src/components/Error/Error";
import Sidebar from "/src/components/Sidebar/Sidebar";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetPurchasedBeatsQuery } from "/src/redux/services/shazamCore";
import { useSelector } from "react-redux";
import useDownloadFile from "/src/hooks/useDownloadFile";

const PurchasedBeats = () => {
  const { data, isFetching, error } = useGetPurchasedBeatsQuery();
  console.log(data);

  console.log("Raw API Response:", data); // Ver estructura completa
  console.log("First beat object:", data?.[0]); // Ver primer objeto en la lista

  const purchasedBeats = Array.isArray(data) ? data : [];

  const downloadFile = useDownloadFile();

  if (error) return <Error />;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <LoggedHeader />
        {isFetching ? (
          <Loader title="Cargando beats comprados..." />
        ) : (
          <div className="container mt-4">
            <h2 className="text-center mb-4 text-white">Mis Beats Comprados</h2>

            {purchasedBeats.length === 0 ? (
              <p className="text-center text-white">
                No has comprado ningún beat todavía.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Género</th>
                      <th>Productor</th>
                      <th>Precio</th>
                      <th>Fecha de Compra</th>
                      <th>Licencia</th>
                      <th>Descargar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasedBeats.map((beat, i) =>
                      beat?.id ? (
                        <tr key={beat.id}>
                          <td>{i + 1}</td>
                          <td>{beat.title}</td>
                          <td>{beat.genre}</td>
                          <td>{beat.producer || "Desconocido"}</td>
                          <td>
                            {beat.price.toLocaleString("es-ES", {
                              minimumFractionDigits: 2,
                            })}
                            €
                          </td>
                          <td>
                            {new Date(beat.purchased_at).toLocaleDateString()}
                          </td>
                          <td>
                            <p className="text-muted mb-0">
                              <strong>{beat.license_type}</strong>
                            </p>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() =>
                                downloadFile(
                                  beat.mp3_file,
                                  `beat_${beat.id}.mp3`
                                )
                              }
                            >
                              MP3
                            </button>
                            {beat.wav_file && ( 
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() =>
                                  downloadFile(
                                    beat.wav_file,
                                    `beat_${beat.id}.wav`
                                  )
                                }
                              >
                                WAV
                              </button>
                            )}
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedBeats;
