import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientDashboard from './pages/Client/ClientDashboard/ClientDashboard';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

      </Routes>
    </BrowserRouter>    </>
  )
}

export default App