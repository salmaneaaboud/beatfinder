import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ClientDashboard from "./pages/Client/ClientDashboard/ClientDashboard";
import Login from "./pages/Guest/Login/Login";
import Register from "./pages/Guest/Register/Register";
import TermsAndConditions from "./pages/Guest/TermsAndConditions/TermsAndConditions";
import Homepage from "./pages/Guest/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";
import EmailVerificationSuccess from "./pages/Guest/EmailVerification/EmailVerificationSuccess";
import EmailVerificationError from "./pages/Guest/EmailVerification/EmailVerificationError";
import BeatDetail from "./pages/Client/BeatDetail/BeatDetail";
import ProducerDashboard from "./pages/Producer/ProducerDashboard/ProducerDashboard";
import UploadForm from "./pages/Producer/UploadForm/UploadForm";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import BeatManagement from "./pages/Admin/BeatManagement/BeatManagement";
import UserProfile from "./components/UserProfile/UserProfile";
import Discover from "./pages/Client/Discover/Discover";
import PurchasedBeats from "./pages/Client/PurchasedBeats/PurchasedBeats";
import MusicPlayer from "./components/MusicPlayer/index";
import UserProfilePage from "./pages/Client/UserProfile/UserProfilePage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import ClientLikes from "./pages/Client/ClientLikes/ClientLikes";
import Payment from "./pages/Client/Payment/Payment";
import ProducerProfile from "./pages/Client/ProducerProfile/ProducerProfile";
import PurchaseSummary from "./pages/Client/PurchaseSummary/PurchaseSummary";
import ProducerProfileForm from "./pages/Producer/ProducerProfileForm/ProducerProfileForm";

function App() {
  const { activeSong } = useSelector((state) => state.player);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const trackVisitorIP = async () => {
    if (!localStorage.getItem("ipTracked")) {
      try {
        const ipResponse = await fetch(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`
        );
        const ipData = await ipResponse.json();

        const userAgentResponse = await fetch(
          `https://api.ipgeolocation.io/user-agent?apiKey=${API_KEY}`
        );
        const userAgentData = await userAgentResponse.json();

        await fetch(BASE_URL + "/storeip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: ipData.country_name,
            city: ipData.city,
            user_id: null,
            ip: ipData.ip,
            userAgent: userAgentData.name,
            device: userAgentData.device.name,
            operatingSystem: userAgentData.operatingSystem.name,
            countryFlag: ipData.country_flag,
            latitude: ipData.latitude,
            longitude: ipData.longitude,
          }),
        });

        localStorage.setItem("ipTracked", "true");
      } catch (error) {
        console.error("Error al rastrear IP:", error);
      }
    }
  };

  useEffect(() => {
    trackVisitorIP();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" richColors offset="6vh" />
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
          <Route
            path="/purchased-beats"
            element={
              <ProtectedRoute requiredRole="client">
                <PurchasedBeats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-summary/:orderId"
            element={
              <ProtectedRoute requiredRole="client">
                <PurchaseSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute requiredRole="client">
                <Discover />
              </ProtectedRoute>
            }
          />
          <Route path="/client/likes" element={<ClientLikes />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/email-verification/success"
            element={<EmailVerificationSuccess />}
          />
          <Route
            path="/email-verification/error"
            element={<EmailVerificationError />}
          />
          <Route
            path="/producer"
            element={
              <ProtectedRoute requiredRole="producer">
                <ProducerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute requiredRole="producer">
                <ProducerProfileForm />
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
          <Route path="/producer/:id" element={<ProducerProfile />} />
        </Routes>
        {activeSong?.title && localStorage.getItem("token") && (
          <div className="music-player-fixed">
            <MusicPlayer />
          </div>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
