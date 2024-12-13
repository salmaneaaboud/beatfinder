import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "/src/services/api";
import Form from "/src/components/Form/Form";
import { Header }from "/src/components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import SocialButton from "/src/components/SocialButton/SocialButton";
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Definición de los campos del formulario
  const campos = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese su nombre",
      required: true,
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "Ingrese su correo electrónico",
      required: true,
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingrese su contraseña",
      required: true,
    },
    {
      name: "password_confirmation",
      label: "Confirmar contraseña",
      type: "password",
      placeholder: "Confirme su contraseña",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validaciones del lado del cliente
      if (formData.password !== formData.password_confirmation) {
        alert("Las contraseñas no coinciden");
        return;
      }

      if (formData.password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      // Enviar los datos al servidor
      const response = await api.post("/register", formData);
      localStorage.setItem("token", response.data.token);
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      // Obtener mensaje de error del servidor
      let mensajeError = "Error al registrar el usuario";

      if (error.response?.data) {
        if (error.response.data.errors) {
          const errores = Object.values(error.response.data.errors).flat();
          mensajeError = errores.join("\n");
        } 
        else if (error.response.data.message || error.response.data.error) {
          mensajeError = error.response.data.message || error.response.data.error;
        }
      }
      else if (error.request) {
        mensajeError = "No se pudo conectar con el servidor";
      }

      alert(mensajeError);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <Container className="register-container">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="register-form">
              <div className="register-center">
                <Form
                  title="Crear cuenta"
                  fields={campos}
                  onSubmit={handleSubmit}
                  botonTexto="Registrarse"
                  values={formData}
                  onChange={handleChange}
                />
              </div>
              <p className="login-text">¿Ya tienes una cuenta Beatfinder? <a href="/login">Inicia sesión</a></p>
              <div className="social-register">
                <SocialButton icon='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' url='#' />
                <SocialButton icon='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png' url='#' />
                <SocialButton icon='https://www.svgrepo.com/show/442910/brand-apple.svg' url='#' />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
