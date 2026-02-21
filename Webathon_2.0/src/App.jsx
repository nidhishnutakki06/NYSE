import React from 'react';
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

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/training" element={<Training />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  );
}
