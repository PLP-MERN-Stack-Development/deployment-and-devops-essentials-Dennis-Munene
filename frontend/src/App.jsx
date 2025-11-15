import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function App() {
  return (
    <div>
      <header style={{ padding: 10, borderBottom: '1px solid #eee' }}>
        <Link to="/">Home</Link> {' | '}
        <Link to="/dashboard">Dashboard</Link> {' | '}
        <Link to="/login">Login</Link>
      </header>
      <main style={{ padding: 20 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
