import React, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatWindow from './components/ChatWindow'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [page, setPage] = useState(token ? 'chat' : 'login')

  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
    setPage('chat')
  }

  if (page === 'login') return <Login onLogin={handleLogin} switchToRegister={() => setPage('register')} />
  if (page === 'register') return <Register onRegister={handleLogin} switchToLogin={() => setPage('login')} />
  return <ChatWindow token={token} />
}
