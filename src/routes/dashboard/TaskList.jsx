import { useState } from 'react';

export default function TaskList({ tasks, dutyStatus, onAccept, onReject }) {
  const [reasons, setReasons] = useState({});

  function handleRejectClick(taskId) {
    const reason = (reasons[taskId] || '').trim();
    if (!reason) {
      alert('Sila isi alasan penolakan tugasan rakan sekerja.');
      return;
    }
    onReject(taskId, reason);
  }

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 16, marginBottom: 20 }}>
      <h3>Tugasan Masuk</h3>
      {tasks.length === 0 ? (
        <p>Tiada tugasan buat masa ini.</p>
      ) : (
        tasks.map((task) => {
          const isColleague = task.sender_type === 'colleague';
          const canReject = isColleague || dutyStatus === 'on_leave';

          return (
            <div key={task.id} style={{ borderTop: '1px solid #eee', padding: '12px 0' }}>
              <strong>{task.title}</strong> ({task.sender_type}) — <em>{task.status}</em>
              {task.description && <p style={{ margin: '6px 0' }}>{task.description}</p>}
              {task.status === 'pending' && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => onAccept(task.id)} style={{ marginRight: 8 }}>
                    Terima
                  </button>
                  {canReject ? (
                    <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Alasan tolak..."
                        value={reasons[task.id] || ''}
                        onChange={(e) => setReasons({ ...reasons, [task.id]: e.target.value })}
                      />
                      <button onClick={() => handleRejectClick(task.id)}>Tolak</button>
                    </span>
                  ) : (
                    <span style={{ fontSize: 12, color: '#777' }}>
                      Tugasan Ketua Unit/Pentadbir tidak boleh ditolak kecuali status Bercuti.
                    </span>
                  )}
                </div>
              )}
              {task.reject_reason && (
                <p style={{ fontSize: 13, color: '#a00', marginTop: 4 }}>
                  Alasan tolak: {task.reject_reason}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
