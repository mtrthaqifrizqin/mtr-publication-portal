import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import ProfileCard from './ProfileCard';
import TaskList from './TaskList';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    setLoading(true);
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;
    if (!user) {
      navigate('/log-in');
      return;
    }

    const { data: prof } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const { data: taskRows } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', user.id)
      .order('created_at', { ascending: false });

    setProfile(prof);
    setTasks(taskRows || []);
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleToggleLeave() {
    if (!profile) return;
    const nextStatus = profile.duty_status === 'on_leave' ? 'active' : 'on_leave';
    await supabase.from('profiles').update({ duty_status: nextStatus }).eq('id', profile.id);
    loadDashboard();
  }

  async function handleAccept(taskId) {
    await supabase.from('tasks').update({ status: 'accepted' }).eq('id', taskId);
    loadDashboard();
  }

  async function handleReject(taskId, reason) {
    await supabase
      .from('tasks')
      .update({ status: 'rejected', reject_reason: reason })
      .eq('id', taskId);
    loadDashboard();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/log-in');
  }

  if (loading) return <p style={{ padding: 20 }}>Memuatkan /dashboard...</p>;

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 16, fontFamily: 'sans-serif' }}>
      <ProfileCard profile={profile} onToggleLeave={handleToggleLeave} onLogout={handleLogout} />
      <TaskList
        tasks={tasks}
        dutyStatus={profile?.duty_status}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 16 }}>
        <h3>Navigasi Modul (Fasa Seterusnya)</h3>
        <ul>
          <li>Chat (DM, Group Unit, Group Custom, Pentadbir, Deskhelp & Pemantauan Pentadbir)</li>
          <li>Edit Novel yang Diberi (Draf Rakan Sekerja)</li>
          <li>Buat Novel (Semua Pekerja; Wajib Unit Penulisan; Bab ≤ 50,000 aksara)</li>
          <li>Lagu & Video / Filem (OST Novel + Kod QR + YouTube Rasmi MTR)</li>
          <li>Pengumuman (Pentadbir)</li>
          <li>Taqwim (Pentadbir)</li>
        </ul>
      </div>
    </div>
  );
}
