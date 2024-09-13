import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InstagramProfile from './components/InstagramProfile';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import PostPage from './components/PostPage';
import Footer from './components/footer'; 
import { Analytics } from "@vercel/analytics/react"

const globalStyles = `
  body {
    background-color: #0f172a;
    color: #e2e8f0;
  }
`;

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (

    <Router>
      <Analytics/>
      <style>{globalStyles}</style>
      <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<InstagramProfile />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/post/:id" element={<PostPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer /> {/* Add the Footer component here */}
      </div>
    </Router>
  );
};

export default App;