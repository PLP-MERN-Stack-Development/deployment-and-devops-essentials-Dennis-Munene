import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';

export default function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile(res.data);
      } catch (err) {
        setStatus('Could not load profile');
      }
    };
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', profile);
      setStatus('Saved');
    } catch (err) {
      setStatus('Save failed');
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <form onSubmit={submit}>
      <input value={profile.name || ''} onChange={e=>setProfile({...profile, name: e.target.value})} />
      <input value={profile.age || ''} onChange={e=>setProfile({...profile, age: e.target.value})} />
      <button type="submit">Save</button>
      <div>{status}</div>
    </form>
  );
}
