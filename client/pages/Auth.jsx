import React, { useState } from 'react';

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      onAuth();
    } else {
      alert(data.error || data.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-full mb-2" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 w-full mb-2" />
      <button onClick={submit} className="bg-primary text-white w-full py-2 rounded">{isLogin ? 'Login' : 'Sign Up'}</button>
      <p className="mt-2 text-sm text-center cursor-pointer text-primary" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </p>
    </div>
  );
}
