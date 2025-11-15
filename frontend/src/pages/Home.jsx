import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Health Tracker</h1>
      <p>A simple app to track weight, blood pressure, and heart rate.</p>
      <p><Link to="/register">Get started</Link> or <Link to="/login">Login</Link></p>
    </div>
  );
}
