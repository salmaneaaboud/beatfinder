import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="container">
      <div className="terms-header">
        <h1>Términos y Condiciones de BeatFinder</h1>
      </div>

      <div className="terms-section">
        <div className="highlight-box">
          <p>
            Bienvenido a BeatFinder, la plataforma líder en conexión entre productores musicales y artistas. 
            Estos términos y condiciones establecen los derechos, obligaciones y responsabilidades de todos los usuarios de nuestra plataforma.
          </p>
        </div>

        <h2>Definiciones Detalladas</h2>
        <ul>
          <li>
            <strong>Beat:</strong> Composición musical instrumental creada digitalmente o mediante otros medios, 
            disponible para su compra y uso bajo diferentes tipos de licencias en nuestra plataforma.
          </li>
          <li>
            <strong>Usuario:</strong> Cualquier persona que acceda a BeatFinder, incluyendo compradores ocasionales, 
            artistas registrados y visitantes de la plataforma.
          </li>
          <li>
            <strong>Productor:</strong> Creador musical verificado que ha completado nuestro proceso de validación 
            y está autorizado para vender beats en la plataforma.
          </li>
          <li>
            <strong>Licencia:</strong> Documento legal que especifica los términos de uso permitidos para cada beat, 
            incluyendo derechos, limitaciones y duración.
          </li>
        </ul>

        <h2>Proceso de Verificación de Productores</h2>
        <div className="highlight-box">
          <p>Para garantizar la calidad y originalidad del contenido, todos los productores deben pasar por un riguroso proceso de verificación.</p>
        </div>

        <h3>Requisitos para Productores</h3>
        <ul>
          <li>
            <strong>Documentación:</strong> Identificación oficial y documentación que acredite la propiedad de los beats.
          </li>
          <li>
            <strong>Portfolio:</strong> Mínimo de 5 beats originales de calidad profesional.
          </li>
          <li>
            <strong>Equipo:</strong> Descripción del setup de producción y software utilizado.
          </li>
          <li>
            <strong>Referencias:</strong> Enlaces a trabajos previos o colaboraciones verificables.
          </li>
        </ul>

        <h2>Tipos de Licencias y Condiciones</h2>
        <div className="highlight-box">
          <p>Cada licencia está diseñada para diferentes necesidades y usos comerciales, con términos específicos y restricciones.</p>
        </div>

        <h3>1. Licencia Básica (MP3)</h3>
        <ul>
          <li><strong>Formato:</strong> MP3 de alta calidad (320 kbps)</li>
          <li><strong>Límite de reproducciones:</strong> 500,000 reproducciones</li>
          <li><strong>Límite de ventas:</strong> 10,000 unidades</li>
          <li><strong>Uso permitido:</strong>
            <ul>
              <li>Mixtapes no comerciales</li>
              <li>Actuaciones en directo</li>
              <li>Streaming en plataformas musicales</li>
            </ul>
          </li>
          <li><strong>Restricciones:</strong>
            <ul>
              <li>No permite uso en televisión o cine</li>
              <li>No permite modificación del beat</li>
              <li>Requiere créditos al productor</li>
            </ul>
          </li>
        </ul>

        <h3>2. Licencia Premium (WAV + MP3)</h3>
        <ul>
          <li><strong>Formato:</strong> WAV + MP3 de alta calidad</li>
          <li><strong>Límite de reproducciones:</strong> 1,000,000 reproducciones</li>
          <li><strong>Límite de ventas:</strong> 50,000 unidades</li>
          <li><strong>Uso permitido:</strong>
            <ul>
              <li>Todo lo incluido en la licencia básica</li>
              <li>Uso comercial en YouTube y redes sociales</li>
              <li>Distribución en plataformas digitales</li>
              <li>Modificaciones menores del beat</li>
            </ul>
          </li>
          <li><strong>Beneficios adicionales:</strong>
            <ul>
              <li>Stems incluidos</li>
              <li>Soporte prioritario</li>
              <li>Acceso a actualizaciones</li>
            </ul>
          </li>
        </ul>

        <h3>3. Licencia Exclusiva (WAV + MP3)</h3>
        <ul>
          <li><strong>Formato:</strong> WAV + MP3 + Stems</li>
          <li><strong>Propiedad:</strong> Derechos completos sobre el beat</li>
          <li><strong>Sin límites de uso</strong></li>
          <li><strong>Beneficios exclusivos:</strong>
            <ul>
              <li>Retirada del beat de la plataforma</li>
              <li>Transferencia de derechos de autor</li>
              <li>Archivos de proyecto originales</li>
              <li>Soporte personalizado del productor</li>
            </ul>
          </li>
        </ul>

        <h2>Sistema de Regalías y Distribución de Ingresos</h2>
        <div className="highlight-box">
          <p>Nuestro sistema de regalías está diseñado para recompensar justamente tanto a productores como a artistas por el éxito de sus creaciones.</p>
        </div>

        <h3>Estructura de Regalías</h3>
        <table className="royalties-table">
          <thead>
            <tr>
              <th>Nivel de Reproducciones</th>
              <th>Porcentaje de Regalías</th>
              <th>Condiciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0 - 100,000</td>
              <td>5%</td>
              <td>De los ingresos generados por streaming</td>
            </tr>
            <tr>
              <td>100,001 - 500,000</td>
              <td>10%</td>
              <td>De los ingresos generados por streaming</td>
            </tr>
            <tr>
              <td>500,001 - 1,000,000</td>
              <td>15%</td>
              <td>De los ingresos generados por streaming</td>
            </tr>
            <tr>
              <td>Más de 1,000,000</td>
              <td>20%</td>
              <td>De los ingresos generados por streaming</td>
            </tr>
          </tbody>
        </table>

        <h3>Sistema de Bonificaciones</h3>
        <ul>
          <li>
            <strong>Beat Trending:</strong> +5% adicional durante el período de tendencia
          </li>
          <li>
            <strong>Productor Verificado:</strong> +2% en todas sus ventas
          </li>
          <li>
            <strong>Exclusividad:</strong> +3% para beats exclusivos de la plataforma
          </li>
          <li>
            <strong>Colaboraciones:</strong> +1% en proyectos colaborativos
          </li>
        </ul>

        <h3>Términos Adicionales de Regalías</h3>
        <ul>
          <li>
            <strong>Período de Pago:</strong> Pagos mensuales (mínimo 50€ acumulados)
          </li>
          <li>
            <strong>Verificación:</strong> Sistema anti-fraude para validar reproducciones
          </li>
          <li>
            <strong>Transparencia:</strong> Dashboard en tiempo real con estadísticas
          </li>
          <li>
            <strong>Métodos de Pago:</strong> PayPal, transferencia bancaria, crypto
          </li>
        </ul>

        <h2>Infracciones y Penalizaciones</h2>
        <div className="highlight-box">
          <p>BeatFinder mantiene una política estricta contra el fraude y el incumplimiento de términos.</p>
        </div>

        <h3>Tipos de Infracciones</h3>
        <ul>
          <li>
            <strong>Infracción Leve:</strong>
            <ul>
              <li>Uso incorrecto de créditos</li>
              <li>Retraso en pagos</li>
              <li>Información incorrecta en el perfil</li>
            </ul>
          </li>
          <li>
            <strong>Infracción Grave:</strong>
            <ul>
              <li>Exceder límites de licencia</li>
              <li>Reventa no autorizada</li>
              <li>Manipulación de reproducciones</li>
            </ul>
          </li>
          <li>
            <strong>Infracción Crítica:</strong>
            <ul>
              <li>Plagio</li>
              <li>Fraude</li>
              <li>Violación de derechos de autor</li>
            </ul>
          </li>
        </ul>

        <h3>Consecuencias</h3>
        <ul>
          <li>
            <strong>Infracciones Leves:</strong>
            <ul>
              <li>Advertencia formal</li>
              <li>Restricción temporal de funciones</li>
              <li>Período de prueba de 30 días</li>
            </ul>
          </li>
          <li>
            <strong>Infracciones Graves:</strong>
            <ul>
              <li>Suspensión temporal de la cuenta</li>
              <li>Retención de pagos pendientes</li>
              <li>Multa del 50% de las ganancias relacionadas</li>
            </ul>
          </li>
          <li>
            <strong>Infracciones Críticas:</strong>
            <ul>
              <li>Suspensión permanente de la cuenta</li>
              <li>Retención total de fondos</li>
              <li>Acciones legales</li>
            </ul>
          </li>
        </ul>

        <h2>Resolución de Disputas</h2>
        <ul>
          <li>
            <strong>Mediación:</strong> Proceso interno de resolución en primera instancia
          </li>
          <li>
            <strong>Arbitraje:</strong> Para casos que no se resuelvan por mediación
          </li>
          <li>
            <strong>Jurisdicción:</strong> Tribunales españoles para casos legales
          </li>
        </ul>

        <h2>Modificaciones y Actualizaciones</h2>
        <div className="highlight-box">
          <p>BeatFinder se reserva el derecho de actualizar estos términos para mejorar el servicio y adaptarse a cambios legales.</p>
        </div>
        <ul>
          <li>
            <strong>Notificaciones:</strong> Aviso por email 30 días antes de cambios importantes
          </li>
          <li>
            <strong>Aceptación:</strong> Uso continuado implica aceptación de nuevos términos
          </li>
          <li>
            <strong>Historial:</strong> Acceso al archivo de versiones anteriores
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
