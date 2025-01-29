import './App.css'
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import ClientDashboard from './pages/Client/ClientDashboard/ClientDashboard';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';
import TermsAndConditions from './pages/Guest/TermsAndConditions/TermsAndConditions';
import Homepage from './pages/Guest/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import EmailVerificationSuccess from './pages/Guest/EmailVerification/EmailVerificationSuccess';
import EmailVerificationError from './pages/Guest/EmailVerification/EmailVerificationError';
import BeatDetail from './pages/Client/BeatDetail/BeatDetail';
import ProducerDashboard from './pages/Producer/ProducerDashboard/ProducerDashboard';
import UploadForm from './pages/Producer/UploadForm/UploadForm';
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import BeatManagement from './pages/Admin/BeatManagement/BeatManagement';
import UserProfile from './components/UserProfile/UserProfile';
import Discover from './pages/Client/Discover/Discover';
import MusicPlayer from './components/MusicPlayer/index';
import UserProfilePage from './pages/Client/UserProfile/UserProfilePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { Toaster } from 'sonner'

function App() {
  const { activeSong } = useSelector((state) => state.player);

 
  

  return (
    <AuthProvider> 
      <BrowserRouter>
      <Toaster position="bottom-right" richColors offset="6vh"/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beat-detail/:id" element={<BeatDetail />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route
            path="/client"
            element={
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/email-verification/success" element={<EmailVerificationSuccess />} />
          <Route path="/email-verification/error" element={<EmailVerificationError />} />
          <Route
            path="/producer"
            element={
              <ProtectedRoute requiredRole="producer">
                <ProducerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/upload-beat" element={<UploadForm />} />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beat-management"
            element={
              <ProtectedRoute requiredRole="admin">
                <BeatManagement />
              </ProtectedRoute>
            }
          />
          <Route path="/discover" element={<Discover />} />
          <Route path="/edit-user" element={<UserProfilePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-profile"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        {activeSong?.title && localStorage.getItem('token') && (
          <div className="music-player-fixed">
            <MusicPlayer />
          </div>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;