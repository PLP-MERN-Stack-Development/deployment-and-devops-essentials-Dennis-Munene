const HealthMetric = require('../models/HealthMetric');

exports.createMetric = async (req, res, next) => {
  try {
    const { weightKg, heightCm, systolic, diastolic, heartRate, notes, date } = req.body;
    const metric = await HealthMetric.create({
      user: req.user._id,
      weightKg,
      heightCm,
      systolic,
      diastolic,
      heartRate,
      notes,
      date: date || Date.now()
    });
    res.status(201).json(metric);
  } catch (err) {
    next(err);
  }
};

exports.getUserMetrics = async (req, res, next) => {
  try {
    const metrics = await HealthMetric.find({ user: req.user._id }).sort({ date: 1 });
    res.json(metrics);
  } catch (err) {
    next(err);
  }
};

exports.deleteMetric = async (req, res, next) => {
  try {
    const metric = await HealthMetric.findById(req.params.id);
    if (!metric) return res.status(404).json({ message: 'Metric not found' });
    if (metric.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    await metric.remove();
    res.json({ message: 'Metric removed' });
  } catch (err) {
    next(err);
  }
};
