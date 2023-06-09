import { useRouter } from 'next/router';
import AppNavbar from './AppNavBar';
import Sidebar from './SideBar';

const Layout = ({ children }: any) => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  const isSignuPage = router.pathname === '/sign_up'

  if (isLoginPage || isSignuPage) {
    return <>{children}</>;
  }

  return (
    <div>
      <AppNavbar/>
      <Sidebar/>
      
      {children}
    </div>
  );
};

export default Layout;
