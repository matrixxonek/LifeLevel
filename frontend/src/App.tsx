import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './assets/context/authContext.tsx';
import LoginPage from './assets/pages/LoginPage';
import MainLayout from './assets/layouts/MainLayout';
import Dashboard from './assets/pages/Dashboard';
import CalendarPage from './assets/pages/CalendarPage';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-screen">Wczytywanie magii...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            {/* Każdy inny adres przekierowuje do /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          /* Jeśli zalogowany -> dostęp do reszty aplikacji przez Layout */
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  )
}

export default App