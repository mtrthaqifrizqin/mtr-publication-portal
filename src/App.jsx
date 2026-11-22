import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './routes/log-in/LoginPage';
import DashboardPage from './routes/dashboard/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/log-in" replace />} />
      <Route path="/log-in" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/log-in" replace />} />
    </Routes>
  );
}
