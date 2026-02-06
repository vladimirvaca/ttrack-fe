import { useNavigate } from 'react-router-dom';

import Layout from '../../components/layout/Layout';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return <Layout onLogout={handleLogout} />;
};

export default DashboardPage;
