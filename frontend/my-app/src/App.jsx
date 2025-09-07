// App.jsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import MainLayout from "./components/Layout"; 

function App() {
  return (
    <>
      <Routes>
        {/* ROUTES WITH MAIN LAYOUT */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout showSidebar={true} />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* CHAT AND CALL OUTSIDE LAYOUT */}
        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/call"
          element={
            <PrivateRoute>
              <CallPage />
            </PrivateRoute>
          }
        />

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
