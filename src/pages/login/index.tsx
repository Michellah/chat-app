import LoginForm from '@/component/LoginForm';
import React from 'react'

const LoginPage: React.FC  = () => {
  const handleLogin= (token: string) => {
    console.log('Token de connexion:', token);
  };

  return (
    <div>
      <h1>Page de connexion</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;