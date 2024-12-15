import { useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { Header } from "/src/components/Header/Header";

const EmailVerificationError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  const errorMessages = {
    "usuario-no-encontrado": "Usuario no encontrado",
    "url-invalida": "URL de verificación inválida",
    "ya-verificado": "El email ya ha sido verificado",
    "error-general": "Ocurrió un error durante la verificación",
  };

  return (
    <>
      <Header />
      <Container className="min-h-screen d-flex align-items-center justify-content-center">
        <div
          className="bg-white rounded-4 shadow p-4 text-center"
          style={{ maxWidth: "500px" }}
        >
          <div>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <circle cx="32" cy="32" r="32" fill="#8B5CF6" fillOpacity="0.1" />
              <path
                d="M44 24L28 40L20 32"
                stroke="#8B5CF6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="fw-bold mb-2" style={{ color: "#333" }}>
            Error en la Verificación
          </h2>
          <p className="text-muted mb-4">
            {errorMessages[message] || "Error desconocido"}
          </p>
          <div className="d-flex flex-column align-items-center gap-3">
            <CustomButton
              type="btn-primary"
              value="Ir al Login"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default EmailVerificationError;