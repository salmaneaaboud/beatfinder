import './Register.css';
import { Header } from '/src/components/Header/Header.jsx';
import { Container, Row, Col } from "react-bootstrap";
import Form from '/src/components/Form/Form';
import SocialButton from '/src/components/SocialButton/SocialButton';

const campos = [
  {
    name: 'email',
    label: 'Correo electrónico ',
    type: 'text',
    placeholder: 'Ingresa tu correo',
    required: true,
  },
  {
    name: 'username',
    label: 'Nombre de usuario',
    type: 'text',
    placeholder: 'Ingresa tu nombre de usuario',
    required: true,
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirmar contraseña',
    type: 'password',
    placeholder: 'Confirma tu contraseña',
    required: true,
  },
];

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Formulario enviado');
};

function Register() {
  return (
    <>
      <Header />
      <Container className="register-container">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="register-form">
              <h2>Crear cuenta</h2>
              <div className='register-center'>
                <Form
                  title=""
                  campos={campos}
                  onSubmit={handleSubmit}
                  botonTexto="Registrarse"
                />
              </div>
              <p className="login-text">¿Ya tienes una cuenta Beatfinder? <a href="/login">Inicia sesión</a></p>
              <div className="social-register">
                <SocialButton icon='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' url='#'/>
                <SocialButton icon='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png' url='#'/>
                <SocialButton icon='https://www.svgrepo.com/show/442910/brand-apple.svg' url='#'/>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
