import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

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
        <div className="mb-4 text-green-500">
          {/* Puedes añadir un ícono de éxito aquí */}
          ✓
        </div>
        <h2 className="text-2xl font-bold mb-4">¡Email Verificado!</h2>
        <p className="text-gray-600 mb-6">
          Tu correo electrónico ha sido verificado exitosamente.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Ir al Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;