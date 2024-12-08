import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientDashboard from './pages/Client/ClientDashboard/ClientDashboard';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';
import Homepage from './pages/Guest/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>    
  );
}

export default App;