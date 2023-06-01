import { useRouter } from 'next/router';
import AppNavbar from './AppNavBar';

const Layout = ({ children }: any) => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  );
};

export default Layout;
