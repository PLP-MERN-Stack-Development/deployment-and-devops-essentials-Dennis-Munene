const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weightKg: { type: Number },
  heightCm: { type: Number },
  systolic: { type: Number },
  diastolic: { type: Number },
  heartRate: { type: Number },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
