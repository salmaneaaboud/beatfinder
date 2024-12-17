import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientDashboard from './pages/Client/ClientDashboard/ClientDashboard';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';
import TermsAndConditions from './pages/Guest/TermsAndConditions/TermsAndConditions';
import Homepage from './pages/Guest/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EmailVerificationSuccess from './pages/Guest/EmailVerification/EmailVerificationSuccess';
import EmailVerificationError from './pages/Guest/EmailVerification/EmailVerificationError';
import ExploreBeats from './pages/Client/ExploreBeats/ExploreBeats';
import BeatDetail from './pages/Client/BeatDetail/BeatDetail';
import ProducerDashboard from './pages/Producer/ProducerDashboard/ProducerDashboard';
import UploadForm from './pages/Producer/UploadForm/UploadForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beat-detail" element={<BeatDetail />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/explore" element={
          <ProtectedRoute>
            <ExploreBeats />
          </ProtectedRoute>
        } />
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