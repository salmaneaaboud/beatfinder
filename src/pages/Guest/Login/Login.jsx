import './Login.css';
import { Header } from '/src/components/Header/Header.jsx';
import { Container, Row, Col } from "react-bootstrap";
import Form from '/src/components/Form/Form';
import SocialButton from '/src/components/SocialButton/SocialButton';
import { CustomButton } from '/src/components/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LoadingOverlay from '/src/components/LoadingOverlay/LoadingOverlay.jsx'; // Importa el componente

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1300);
  };

  const campos = [
    {
      name: 'emailOrUsername',
      label: 'Correo electrónico o nombre de usuario',
      type: 'text',
      placeholder: 'Ingresa tu correo o usuario',
      required: true,
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: 'Ingresa tu contraseña',
      required: true,
    },
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} message="Iniciando sesión..." /> {/* Componente de carga */}
      <Header />
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="login-form">
              <h2>Conectarse</h2>
              <div className='login-center'>
                <div className="login-toggle-buttons">
                  <CustomButton type='' value='Cliente' />
                  <CustomButton type='btn-outline-light' value='Productor' />
                </div>
              </div>

              <Form
                title=""
                campos={campos}
                onSubmit={handleLogin}
                botonTexto="Iniciar sesión"
                disabled={isLoading}
              />
              <div className="social-login">
                <SocialButton icon='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' url='#' />
                <SocialButton icon='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png' url='#' />
                <SocialButton icon='https://www.svgrepo.com/show/442910/brand-apple.svg' url='#' />
              </div>
              <p className="register-text">¿Todavía no tienes una cuenta Beatfinder? <a href="/register">Regístrate</a></p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
