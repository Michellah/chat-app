import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>Se déconnecter</button>
  );
};

export default LogoutButton;
