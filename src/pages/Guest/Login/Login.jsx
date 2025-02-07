import "./Login.css";
import { useState } from "react";
import Form from "/src/components/Form/Form";
import { useAuth } from '/src/hooks/useAuth';
import { Header } from "/src/components/Header/Header";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();

  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginResponse = await auth.login(formData.email, formData.password);
    
    if (loginResponse) {
      toast.success(t("login.success_message"));
      const userRole = loginResponse.user.role; 
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'producer') {
        navigate('/producer');
      } else if (userRole === 'client') {
        navigate('/client');
      }
    }
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

  return (
    <>
      <Header />
      <h2 className="text-center text-4xl font-bold mb-4 text-white">{t("login.title")}</h2>
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
