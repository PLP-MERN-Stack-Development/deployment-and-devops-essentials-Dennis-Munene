import React from 'react';

export default function HealthLogs({ metrics, onDelete }) {
  return (
    <ul>
      {metrics.map(m => (
        <li key={m._id}>
          {new Date(m.date).toLocaleString()} — {m.weightKg} kg — HR: {m.heartRate}
          <button onClick={() => onDelete(m._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
