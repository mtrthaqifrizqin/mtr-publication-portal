export default function ProfileCard({ profile, onToggleLeave, onLogout }) {
  if (!profile) return null;

  const initials = profile.full_name
    ? profile.full_name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'MTR';

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 16, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {profile.profile_pic_url ? (
          <img
            src={profile.profile_pic_url}
            alt={profile.full_name}
            style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#222',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            {initials}
          </div>
        )}
        <div>
          <h3 style={{ margin: 0 }}>{profile.full_name}</h3>
          <p style={{ margin: '4px 0' }}>
            <strong>Jawatan:</strong> {profile.position} | <strong>Unit:</strong> {profile.unit}
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Email:</strong> {profile.email} | <strong>Point:</strong> {profile.points}
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Status:</strong> {profile.duty_status === 'on_leave' ? 'Bercuti' : 'Aktif'}
          </p>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
        <button onClick={onToggleLeave}>
          {profile.duty_status === 'on_leave' ? 'Set Status: Aktif' : 'Set Status: Bercuti'}
        </button>
        <button onClick={onLogout}>Log Keluar</button>
      </div>
    </div>
  );
}
