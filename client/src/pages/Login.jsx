import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      onLogin(res.data.token)
    } catch {
      alert('Login failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleSubmit}>Login</button>
        <p style={{marginTop: '10px', cursor: 'pointer'}} onClick={switchToRegister}>Create an account</p>
      </div>
    </div>
  )
}
