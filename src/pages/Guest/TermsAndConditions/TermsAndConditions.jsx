import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="container">
      <h1>Términos y Condiciones de BeatFinder</h1>
      <p>
        Bienvenido a BeatFinder, un servicio de e-commerce y SaaS diseñado para conectar a productores de beats con usuarios interesados en adquirir contenido musical. Al acceder y utilizar nuestro sitio web, o al adquirir cualquiera de los productos ofrecidos, aceptas cumplir con los términos y condiciones que se detallan a continuación. Si no estás de acuerdo con estos términos, te pedimos que no utilices nuestros servicios. BeatFinder es propiedad y operado por BeatFinder, S.L., con domicilio en [Dirección Completa] y CIF [Número de CIF].
      </p>

      <h2>Definiciones</h2>
      <p>Para facilitar la comprensión de estos términos, a continuación se definen algunos términos clave:</p>
      <ul>
        <li><strong>"Beat"</strong>: Pista musical creada por un productor disponible para su compra en nuestra plataforma. Este puede ser un beat instrumental completo o una base de audio que se ofrece para su uso bajo diversas licencias.</li>
        <li><strong>"Usuario"</strong>: Persona que utiliza la plataforma BeatFinder para adquirir beats o acceder a servicios. Esto incluye a personas que adquieren licencias para usar los beats, productores que suben los beats, y cualquier otra persona que interactúa con la plataforma.</li>
        <li><strong>"Productor"</strong>: Persona o entidad que crea y sube beats a la plataforma BeatFinder para su venta o distribución. Los productores mantienen la propiedad intelectual de los beats, pero otorgan licencias a los usuarios bajo las condiciones detalladas en estos términos.</li>
        <li><strong>"Licencia"</strong>: Permiso otorgado por BeatFinder para el uso de un beat bajo condiciones específicas, que determinan cómo puede ser utilizado, distribuido y modificado. Existen diferentes tipos de licencias, que detallamos a continuación.</li>
        <li><strong>"Licencia Exclusiva"</strong>: Licencia que transfiere todos los derechos sobre un beat a un único comprador, haciendo que el beat ya no esté disponible para otros usuarios. El comprador adquiere la propiedad completa del beat.</li>
        <li><strong>"Licencia No Exclusiva"</strong>: Licencia que permite el uso del beat bajo condiciones limitadas. El beat sigue estando disponible para otros usuarios, pero el comprador puede utilizarlo en proyectos personales y comerciales, dentro de los límites establecidos en la licencia.</li>
        <li><strong>"Formato de Archivo"</strong>: El tipo de archivo en el que se entrega el beat. Los formatos disponibles incluyen MP3 y WAV, y la disponibilidad de estos puede variar según la licencia seleccionada.</li>
        <li><strong>"Venta o Distribución"</strong>: Acción de vender, distribuir o de alguna otra manera poner a disposición el beat o un producto derivado que contenga el beat. Esto puede incluir la distribución física o digital del producto final, como canciones, álbumes, o comerciales.</li>
        <li><strong>"Reproducciones"</strong>: El número de veces que una canción, álbum, o cualquier producto derivado del beat se escucha en plataformas de streaming o se reproduce en otros entornos públicos o privados.</li>
      </ul>

      <h2>Tipos de Licencias</h2>
      <p>BeatFinder ofrece diferentes tipos de licencias para sus beats, que varían en función de los derechos de uso, el formato del archivo y las limitaciones establecidas. A continuación se detallan las tres licencias principales:</p>

      <h3>1. Licencia Básica (MP3)</h3>
      <p>La Licencia Básica permite el uso del beat bajo condiciones limitadas, ideal para proyectos pequeños o personales:</p>
      <ul>
        <li><strong>Formato de archivo</strong>: El beat se proporciona en formato MP3 de alta calidad (320 kbps). Este es un formato comprimido de alta calidad, adecuado para la mayoría de las aplicaciones de reproducción musical.</li>
        <li><strong>Límite de reproducciones</strong>: El uso del beat está limitado a un máximo de <strong>500,000 reproducciones</strong> en plataformas de streaming como Spotify, YouTube, SoundCloud, etc. Una vez alcanzado este límite, el usuario deberá actualizar su licencia.</li>
        <li><strong>Límite de ventas</strong>: El usuario puede vender hasta <strong>10,000 unidades</strong> del producto final (canción, álbum, etc.) que utilice este beat. Las ventas pueden ser en formato físico o digital, en plataformas como iTunes, Bandcamp, Spotify, etc.</li>
        <li><strong>Uso comercial</strong>: El beat puede ser utilizado en proyectos comerciales, como campañas publicitarias locales, videos promocionales, etc., siempre que no exceda los límites de reproducción o ventas establecidos.</li>
        <li><strong>Uso permitido</strong>: Puedes utilizar el beat para crear canciones, álbumes o proyectos derivados, siempre y cuando el resultado sea un producto nuevo y transformado, como una canción con letras, arreglos o producción adicional. Cualquier uso debe respetar los límites establecidos.</li>
        <li><strong>Uso prohibido</strong>: Está prohibido revender el beat tal cual o distribuirlo en su formato original sin modificar. No está permitido incluir el beat tal cual en otros paquetes de beats o en servicios de suscripción.</li>
      </ul>

      <h3>2. Licencia Intermedia (WAV + MP3)</h3>
      <p>La Licencia Intermedia es adecuada para proyectos de mayor escala, con una mayor flexibilidad en términos de uso:</p>
      <ul>
        <li><strong>Formato de archivo</strong>: El beat se entrega en dos formatos: WAV (sin pérdida de calidad) y MP3 (320 kbps). El formato WAV es ideal para producciones de estudio, mientras que el MP3 es más adecuado para su distribución digital.</li>
        <li><strong>Límite de reproducciones</strong>: El uso del beat está limitado a <strong>1,000,000 reproducciones</strong> en plataformas como Spotify, YouTube, SoundCloud, etc.</li>
        <li><strong>Límite de ventas</strong>: El usuario puede vender hasta <strong>50,000 unidades</strong> del producto final (canción, álbum, etc.) que utilice este beat.</li>
        <li><strong>Uso comercial</strong>: Permitido para proyectos comerciales de mayor escala, como anuncios regionales, campañas digitales de mayor alcance, o distribución de música en plataformas globales.</li>
        <li><strong>Uso permitido</strong>: Puedes crear productos derivados como canciones, álbumes, o remixes. El beat debe ser una parte de un producto completamente nuevo y transformado.</li>
        <li><strong>Uso prohibido</strong>: No está permitido revender el beat tal cual o redistribuirlo sin modificarlo. El beat no puede ser incluido en otros paquetes de beats o en servicios de suscripción.</li>
      </ul>

      <h3>3. Licencia Exclusiva (WAV + MP3)</h3>
      <p>La Licencia Exclusiva otorga todos los derechos sobre el beat a un único comprador, convirtiéndose en el único propietario del beat.</p>
      <ul>
        <li><strong>Formato de archivo</strong>: El beat se entrega en formatos WAV y MP3.</li>
        <li><strong>Propiedad</strong>: El comprador adquiere todos los derechos sobre el beat, convirtiéndose en su único propietario. Esto significa que el beat ya no estará disponible para otros usuarios en nuestra plataforma.</li>
        <li><strong>Uso ilimitado</strong>: No hay límites en cuanto a reproducciones, ventas o distribución del beat. Puede ser utilizado en proyectos de cualquier escala sin restricciones adicionales.</li>
        <li><strong>Exclusividad</strong>: Tras la compra de la Licencia Exclusiva, el beat será retirado de la plataforma y ya no podrá ser adquirido por otros usuarios. El comprador se convierte en el único titular de todos los derechos del beat.</li>
        <li><strong>Uso permitido</strong>: El comprador tiene la libertad de utilizar el beat en canciones, álbumes, producciones cinematográficas, publicidades, etc., sin ninguna restricción de distribución o ventas.</li>
        <li><strong>Uso prohibido</strong>: Está prohibido sublicenciar o revender el beat tal cual sin haber realizado modificaciones sustanciales en el producto final.</li>
      </ul>

      <h2>Procedimiento por Exceso de Uso</h2>
      <p>Si un usuario excede los límites establecidos por la licencia adquirida, como el número de reproducciones o ventas, BeatFinder se reserva el derecho de suspender el uso del beat en nuevos proyectos. Tras la notificación correspondiente, el usuario tendrá un plazo de 15 días para actualizar su licencia y regularizar el uso. Si el usuario no toma las acciones correspondientes:</p>
      <ul>
        <li>Se suspenderá el uso del beat en nuevos proyectos.</li>
        <li>Se enviará una reclamación formal por infracción de derechos de autor.</li>
        <li>Se podría iniciar una acción legal para proteger los derechos de propiedad intelectual asociados al beat.</li>
      </ul>

      <h2>Propiedad Intelectual</h2>
      <p>Todos los beats disponibles en BeatFinder son propiedad intelectual de los productores correspondientes, quienes conservan los derechos de autor. Los usuarios adquieren una licencia para utilizar los beats bajo las condiciones especificadas en este documento. El uso no autorizado de los beats, incluida la distribución o venta sin la licencia adecuada, constituye una violación de los derechos de propiedad intelectual.</p>

      <h2>Modificaciones</h2>
      <p>BeatFinder se reserva el derecho de modificar estos términos y condiciones en cualquier momento, sin previo aviso. Las modificaciones entrarán en vigencia de inmediato tras su publicación en el sitio web. Es responsabilidad del usuario revisar periódicamente los términos para mantenerse informado sobre cualquier cambio.</p>

      <h2>Jurisdicción y Ley Aplicable</h2>
      <p>Estos términos y condiciones se rigen por la legislación vigente en [País]. Cualquier disputa relacionada con estos términos será resuelta ante los tribunales competentes en [Ubicación del Tribunal].</p>

      <h2>Aceptación</h2>
      <p>Al utilizar nuestros servicios, aceptas todos los términos y condiciones descritos en este documento. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestros servicios.</p>
    </div>
  );
};

export default TermsAndConditions;
