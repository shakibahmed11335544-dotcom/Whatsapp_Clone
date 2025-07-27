import React, { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthenticated(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary text-white">
        <div className="animate-pulse text-2xl font-bold">CurryChat Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center p-4 bg-primary text-white">
        <h1 className="font-bold text-lg">CurryChat</h1>
        <ThemeToggle />
      </div>
      {authenticated ? <Chat /> : <Auth onAuth={() => setAuthenticated(true)} />}
    </div>
  );
}
