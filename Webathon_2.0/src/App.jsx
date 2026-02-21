import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import ProtectedLayout from './layout/ProtectedLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Workouts from './pages/Workouts';
import Training from './pages/Training';
import Nutrition from './pages/Nutrition';
import Habits from './pages/Habits';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Workshops from './pages/Workshops';
import { useAuth } from './context/AuthContext';

// Simple wrapper to prevent logged-in users from seeing the Login/Landing page
const PublicRoute = ({ children }) => {
  const { user, isAuthInitialized } = useAuth();

  if (!isAuthInitialized) {
    return (
      <div className="flex min-h-screen bg-[#09090B] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#CBFB5E]/30 border-t-[#CBFB5E] animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/training" element={<Training />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workshops" element={<Workshops />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  );
}
