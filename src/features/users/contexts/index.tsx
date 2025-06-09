import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { type IAuthContext, AuthContext } from './auth-context';
import { handleCurrentUser } from '@/features/users/services';
import { getUser } from '@/features/users/services';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] =
    useState<IAuthContext['currentUser']>(null);

  const [currentUserData, setCurrentUserData] =
    useState<IAuthContext['currentUserData']>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      currentUser,
      currentUserData,
    }),
    [currentUser, currentUserData]
  );

  useEffect(() => {
    const unsubscribe = handleCurrentUser((user) => {
      if (!user) {
        setCurrentUser(null);
        setCurrentUserData(null);
        setLoading(false);
      } else {
        getUser(user.uid)
          .then((data) => {
            setCurrentUser(user);
            setCurrentUserData(data);
            setLoading(false);
          })
          .catch((error) => {
            throw error;
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext value={value}>{!loading && children}</AuthContext>;
}
