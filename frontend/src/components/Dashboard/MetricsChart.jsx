import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function MetricsChart({ data }) {
  const labels = data.map(d => new Date(d.date));
  const weight = data.map(d => d.weightKg ?? null);
  const heart = data.map(d => d.heartRate ?? null);

  const chartData = {
    labels,
    datasets: [
      { label: 'Weight (kg)', data: weight, tension: 0.2 },
      { label: 'Heart Rate', data: heart, tension: 0.2 }
    ]
  };

  const options = {
    scales: {
      x: { type: 'time', time: { unit: 'day' } }
    },
    responsive: true
  };

  return <Line data={chartData} options={options} />;
}
