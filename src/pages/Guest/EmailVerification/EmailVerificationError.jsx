import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerificationError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');

  const errorMessages = {
    'usuario-no-encontrado': 'Usuario no encontrado',
    'url-invalida': 'URL de verificación inválida',
    'ya-verificado': 'El email ya ha sido verificado',
    'error-general': 'Ocurrió un error durante la verificación'
  };

  useEffect(() => {
    // Opcional: Timer para redireccionar automáticamente después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4 text-red-500">
          {/* Puedes añadir un ícono de error aquí */}
          ✗
        </div>
        <h2 className="text-2xl font-bold mb-4">Error en la Verificación</h2>
        <p className="text-gray-600 mb-6">
          {errorMessages[message] || 'Error desconocido'}
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationError;