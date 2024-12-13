import "./Login.css";
import { useState } from "react";
import Form from "/src/components/Form/Form";
import { useAuth } from '/src/hooks/useAuth';

const Login = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await auth.login(formData.email, formData.password);
  };

  const campos = [
    {
      name: "email",
      label: "Correo electrónico o nombre de usuario",
      type: "text",
      placeholder: "Ingresa tu correo o usuario",
      required: true,
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingresa tu contraseña",
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
    <Form
      title="Iniciar sesión"
      fields={campos}
      onSubmit={handleLogin}
      botonTexto="Iniciar sesión"
      values={formData}
      onChange={handleChange}
    />
  );
};

export default Login;
