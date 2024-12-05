import './Login.css';
import { Header } from '/src/components/Header/Header.jsx';
import { Container, Row, Col } from "react-bootstrap";
import Form from '/src/components/Form/Form';
import SocialButton from '/src/components/SocialButton/SocialButton';
import { CustomButton } from '/src/components/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation('login');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  const campos = [
    {
      name: 'emailOrUsername',
      label: t('login.form.fields.emailOrUsername.label'),
      type: 'text',
      placeholder: t('login.form.fields.emailOrUsername.placeholder'),
      required: true,
    },
    {
      name: 'password',
      label: t('login.form.fields.password.label'),
      type: 'password',
      placeholder: t('login.form.fields.password.placeholder'),
      required: true,
    },
  ];

  return (
    <>
      <Header />
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="login-form">
              <h2>{t('login.title')}</h2>
              <div className='login-center'>
                <div className="login-toggle-buttons">
                  <CustomButton type='' value={t('login.toggleButtons.client')} />
                  <CustomButton type='btn-outline-light' value={t('login.toggleButtons.producer')} />
                </div>
              </div>

              <Form
                title=""
                campos={campos}
                onSubmit={handleLogin}
                botonTexto={t('login.form.submitButton')}
              />
              <div className="social-login">
                <SocialButton icon={t('login.socialLogin.google.icon')} url={t('login.socialLogin.google.url')} />
                <SocialButton icon={t('login.socialLogin.facebook.icon')} url={t('login.socialLogin.facebook.url')} />
                <SocialButton icon={t('login.socialLogin.apple.icon')} url={t('login.socialLogin.apple.url')} />
              </div>
              <p className="register-text">
                {t('login.registerText.text')} <a href="/register">{t('login.registerText.link')}</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
