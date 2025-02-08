import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "/src/services/api";
import Form from "/src/components/Form/Form";
import { Header } from "/src/components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import SocialButton from "/src/components/SocialButton/SocialButton";
import './Register.css';
import { useTranslation } from "react-i18next";
import { CustomButton } from "/src/components/CustomButton/CustomButton";

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const campos = [
    {
      name: "name",
      label: t("register.name_label"),
      type: "text",
      placeholder: t("register.name_field"),
      required: true,
    },
    {
      name: "email",
      label: t("register.email_label"),
      type: "email",
      placeholder: t("register.email_field"),
      required: true,
    },
    {
      name: "password",
      label: t("register.password_label"),
      type: "password",
      placeholder: t("register.password_field"),
      required: true,
    },
    {
      name: "password_confirmation",
      label: t("register.password_confirmation_label"),
      type: "password",
      placeholder: t("register.password_confirmation_field"),
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.password_confirmation) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      if (formData.password.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      const response = await api.post("/register", formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Usuario registrado exitosamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      let mensajeError = "Error al registrar el usuario";

      if (error.response?.data) {
        if (error.response.data.errors) {
          const errores = Object.values(error.response.data.errors).flat();
          mensajeError = errores.join("\n");
        } else if (error.response.data.message || error.response.data.error) {
          mensajeError = error.response.data.message || error.response.data.error;
        }
      } else if (error.request) {
        mensajeError = "No se pudo conectar con el servidor";
      }

      toast.error(mensajeError);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonClick = (role) => {
    setFormData({
      ...formData,
      role: role,
    });
  };

  return (
    <>
      <Header />
      <Container className="register-container">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="register-form">
              <h2 className='formulario-title text-center text-4xl font-bold mb-4 text-white'>{t("register.title")}</h2>
              <div className="d-flex justify-content-center align-items-center text-center">
                <div className="d-flex justify-content-center mb-2" style={{ gap: '30px' }}>
                  <CustomButton
                    type={formData.role === "client" ? 'btn-primary' : 'btn-outline-light'}
                    value={t("register.role_client")}
                    onClick={() => handleButtonClick("client")}
                  />
                  <CustomButton
                    type={formData.role === "producer" ? 'btn-primary' : 'btn-outline-light'}
                    value={t("register.role_producer")}
                    onClick={() => handleButtonClick("producer")}
                  />
                </div>
              </div>
              <Form
                fields={campos}
                onSubmit={handleSubmit}
                botonTexto={t("register.register_button")}
                values={formData}
                onChange={handleChange}
              />
              <p className="login-text">{t("register.already_have_account")} <a href="/login">{t("register.login")}</a></p>
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
