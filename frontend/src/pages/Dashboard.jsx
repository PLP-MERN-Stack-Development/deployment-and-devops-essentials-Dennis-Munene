import React, { useEffect, useState, useContext } from 'react';
import { getMetrics, createMetric } from '../api/healthApi';
import MetricsChart from '../components/Dashboard/MetricsChart';
import AuthContext from '../context/AuthContext';

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const load = async () => {
    setLoading(true);
    const data = await getMetrics();
    setMetrics(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addMetric = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      weightKg: +form.get('weightKg'),
      heightCm: +form.get('heightCm'),
      systolic: +form.get('systolic'),
      diastolic: +form.get('diastolic'),
      heartRate: +form.get('heartRate'),
      notes: form.get('notes'),
      date: form.get('date') || undefined
    };
    await createMetric(payload);
    await load();
    e.target.reset();
  };

  if (!user) return <div>Please login to use the dashboard</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <section>
        <form onSubmit={addMetric}>
          <input name="date" type="date" />
          <input name="weightKg" placeholder="Weight (kg)" />
          <input name="heightCm" placeholder="Height (cm)" />
          <input name="systolic" placeholder="Systolic" />
          <input name="diastolic" placeholder="Diastolic" />
          <input name="heartRate" placeholder="Heart rate" />
          <input name="notes" placeholder="Notes" />
          <button type="submit">Add Metric</button>
        </form>
      </section>

      <section>
        {loading ? <div>Loading metrics...</div> : (
          <>
            <MetricsChart data={metrics} />
            <ul>
              {metrics.slice().reverse().map(m => (
                <li key={m._id}>
                  {new Date(m.date).toLocaleString()} — {m.weightKg ?? '-'} kg, HR: {m.heartRate ?? '-'}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
