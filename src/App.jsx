import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientDashboard from './pages/Client/ClientDashboard/ClientDashboard';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';
import Homepage from './pages/Guest/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EmailVerificationSuccess from './pages/Guest/EmailVerification/EmailVerificationSuccess';
import EmailVerificationError from './pages/Guest/EmailVerification/EmailVerificationError';
import ProducerDashboard from './pages/Producer/ProducerDashboard/ProducerDashboard';
import UploadForm from './pages/Producer/UploadForm/UploadForm';

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
        <Route path="/email-verification/success" element={<EmailVerificationSuccess />} />
        <Route path="/email-verification/error" element={<EmailVerificationError />} />
        <Route path="/producer-dashboard" element={<ProducerDashboard />} />
        <Route path="/upload-beat" element={<UploadForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;