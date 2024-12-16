import "./Login.css";
import { useState } from "react";
import Form from "/src/components/Form/Form";
import { useAuth } from '/src/hooks/useAuth';
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { Header } from "/src/components/Header/Header";
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation(); 

  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [selectedRole, setSelectedRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await auth.login(formData.email, formData.password);
  };

  const campos = [
    {
      name: "email",
      label: t("login.email_label"),
      type: "text",
      placeholder: t("login.email_field"),
      required: true,
    },
    {
      name: "password",
      label: t("login.password_label"),
      type: "password",
      placeholder: t("login.password_field"),
      required: true,
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonClick = (role) => {
    setSelectedRole(role); 
  };

  return (
    <>
      <Header />
      <h2>{t("login.title")}</h2>
      <div className='login-center'>
        <div className="login-toggle-buttons">
          <CustomButton
            type={selectedRole === "cliente" ? 'btn-primary' : 'btn-outline-light'}
            value={t("login.client_button")}
            onClick={() => handleButtonClick("cliente")}
          />
          <CustomButton
            type={selectedRole === "productor" ? 'btn-primary' : 'btn-outline-light'}
            value={t("login.producer_button")}
            onClick={() => handleButtonClick("productor")}
          />
        </div>
      </div>
      <Form
        fields={campos}
        onSubmit={handleLogin}
        botonTexto={t("login.login_button")}
        values={formData}
        onChange={handleChange}
      />
    </>
  );
};

export default Login;
