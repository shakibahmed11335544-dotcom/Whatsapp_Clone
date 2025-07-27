import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ onRegister, switchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/auth/register', { email, password })
      onRegister(res.data.token)
    } catch {
      alert('Registration failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Register</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleSubmit}>Register</button>
        <p style={{marginTop: '10px', cursor: 'pointer'}} onClick={switchToLogin}>Back to Login</p>
      </div>
    </div>
  )
}
