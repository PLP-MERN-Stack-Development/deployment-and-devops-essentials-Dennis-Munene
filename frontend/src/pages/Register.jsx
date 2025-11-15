import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav('/dashboard');
    } catch (err) {
      setErr(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button type="submit">Register</button>
      </form>
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </div>
  );
}
