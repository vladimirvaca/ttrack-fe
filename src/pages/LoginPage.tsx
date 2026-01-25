import { LoginView } from '../features/login';

import type { LoginFormData } from '../features/login';

const LoginPage = () => {
  // const navigate = useNavigate(); // Uncomment when implementing navigation
  const handleLogin = (data: LoginFormData) => {
    // TODO: Implement actual authentication logic
    console.warn('Login submitted with data:', data);

    // For now, just navigate to a dashboard or home page
    // navigate('/dashboard');
  };

  return <LoginView onSubmit={handleLogin} />;
};

export default LoginPage;
