import { withAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage = () => {
  return <AdminDashboard />;
};

export default withAuth(AdminPage, ['Admin']);