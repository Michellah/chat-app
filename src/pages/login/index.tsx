import LoginForm from '@/component/LoginForm';
import Link from 'next/link';
import React from 'react'

const LoginPage: React.FC  = () => {

  return (
    <div>
      <h1>Page de connexion</h1>
      <LoginForm  />
      <Link href='sign_up'>Create count</Link>
    </div>
  );
};

export default LoginPage;