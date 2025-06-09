import { use } from 'react';
import { AuthContext } from '@/features/users/contexts/auth-context';

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('Something went wrong');
  }

  return context;
}
