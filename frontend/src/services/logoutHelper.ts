import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const getLogoutHandler = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context.logout;
};
