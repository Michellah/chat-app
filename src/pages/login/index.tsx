import LoginForm from '@/component/LoginForm';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Login.module.css'

const LoginPage: React.FC  = () => {

  return (
    <div className={styles.login}>
      <h1>Login page</h1>
      <LoginForm  />
      <Link href='sign_up'>Create new count</Link>
    </div>
  );
};

export default LoginPage;