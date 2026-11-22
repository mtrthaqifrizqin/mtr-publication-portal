import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setErrorMsg('Email atau kata laluan tidak sah.');
      return;
    }
    navigate('/dashboard');
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Login User MTR PUBLICATION AND PRODUCTION</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Sedang Log Masuk...' : 'Log Masuk'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 13, color: '#555' }}>
        Terlupa password? Sila check Telegram rasmi MTR PUBLICATION AND PRODUCTION.
      </p>
    </div>
  );
    }
      
