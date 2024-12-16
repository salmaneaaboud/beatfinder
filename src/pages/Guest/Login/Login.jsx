import "./Login.css";
import { useState } from "react";
import Form from "/src/components/Form/Form";
import { useAuth } from '/src/hooks/useAuth';
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { Header } from "/src/components/Header/Header";

const Login = () => {
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

  const handleButtonClick = (role) => {
    setSelectedRole(role); 
  };

  return (
    <>
      <Header />
      <h2>Conectarse</h2>
      <div className='login-center'>
        <div className="login-toggle-buttons">
          <CustomButton
            type={selectedRole === "cliente" ? 'btn-primary' : 'btn-outline-light'}
            value="Cliente"
            onClick={() => handleButtonClick("cliente")}
          />
          <CustomButton
            type={selectedRole === "productor" ? 'btn-primary' : 'btn-outline-light'}
            value="Productor"
            onClick={() => handleButtonClick("productor")}
          />
        </div>
      </div>
      <Form
        fields={campos}
        onSubmit={handleLogin}
        botonTexto="Iniciar sesión"
        values={formData}
        onChange={handleChange}
      />
    </>
  );
};

export default Login;
