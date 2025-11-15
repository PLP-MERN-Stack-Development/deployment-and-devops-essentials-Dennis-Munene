import api from './axiosInstance';

export const createMetric = (payload) => api.post('/health', payload).then(r => r.data);
export const getMetrics = () => api.get('/health').then(r => r.data);
export const deleteMetric = (id) => api.delete(`/health/${id}`).then(r => r.data);
