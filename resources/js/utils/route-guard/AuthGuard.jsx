import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import useAuth from 'hooks/useAuth';
import { router } from '@inertiajs/inertia';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { url: pathname } = usePage().props;

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/login') {
      router.visit('/login');
    }
  }, [isLoggedIn, pathname]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
