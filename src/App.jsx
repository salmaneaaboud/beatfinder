import './App.css'
import { useSelector } from 'react-redux';
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
import BeatDetail from './pages/Client/BeatDetail/BeatDetail';
import ProducerDashboard from './pages/Producer/ProducerDashboard/ProducerDashboard';
import UploadForm from './pages/Producer/UploadForm/UploadForm';
import UserManagement from './components/UserManagement/UserManagement';
import UserProfile from './components/UserProfile/UserProfile';
import Discover from './pages/Client/Discover/Discover';
import MusicPlayer from './components/MusicPlayer/index';

function App() {
  const { activeSong } = useSelector((state) => state.player);

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
        <Route path="/email-verification/success" element={<EmailVerificationSuccess />} />
        <Route path="/email-verification/error" element={<EmailVerificationError />} />
        <Route path="/producer-dashboard" element={<ProducerDashboard />} />
        <Route path="/upload-beat" element={<UploadForm />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/edit-user/:id" element={<UserProfile />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
        {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;