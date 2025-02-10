import { useContext } from 'react';
import { AuthContext } from './context';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Something went wrong');
  }

  return context;
};

export default useAuth;
