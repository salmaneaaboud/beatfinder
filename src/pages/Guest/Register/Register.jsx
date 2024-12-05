import './Register.css';
import { Header } from '/src/components/Header/Header.jsx';
import { Container, Row, Col } from "react-bootstrap";
import Form from '/src/components/Form/Form';
import SocialButton from '/src/components/SocialButton/SocialButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation('register');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(t('register.form.submitMessage'));
    navigate('/login');
  };

  const campos = [
    {
      name: 'email',
      label: t('register.form.fields.email.label'),
      type: 'text',
      placeholder: t('register.form.fields.email.placeholder'),
      required: true,
    },
    {
      name: 'username',
      label: t('register.form.fields.username.label'),
      type: 'text',
      placeholder: t('register.form.fields.username.placeholder'),
      required: true,
    },
    {
      name: 'password',
      label: t('register.form.fields.password.label'),
      type: 'password',
      placeholder: t('register.form.fields.password.placeholder'),
      required: true,
    },
    {
      name: 'confirmPassword',
      label: t('register.form.fields.confirmPassword.label'),
      type: 'password',
      placeholder: t('register.form.fields.confirmPassword.placeholder'),
      required: true,
    },
  ];

  return (
    <>
      <Header />
      <Container className="register-container">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="register-form">
              <h2>{t('register.header')}</h2>
              <div className='register-center'>
                <Form
                  title=""
                  campos={campos}
                  onSubmit={handleSubmit}
                  botonTexto={t('register.form.buttonText')}
                />
              </div>
              <p className="login-text">{t('register.loginText')} <a href="/login">{t('register.loginLink')}</a></p>
              <div className="social-register">
                <SocialButton icon={t('register.socialButtons.google')} url='#' />
                <SocialButton icon={t('register.socialButtons.facebook')} url='#' />
                <SocialButton icon={t('register.socialButtons.apple')} url='#' />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
