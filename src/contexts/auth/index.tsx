import { ReactNode, useEffect, useMemo, useState } from 'react';
import { TAuthContext, AuthContext } from './context';
import { TUser } from '@/@types/user';
import { getDocument } from '@/lib/database';
import { handleCurrentUser } from '@/lib/auth';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] =
    useState<TAuthContext['currentUser']>(null);
  const [currentUserData, setCurrentUserData] =
    useState<TAuthContext['currentUserData']>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      currentUser,
      currentUserData,
    }),
    [currentUser, currentUserData]
  );

  async function handleCurrentUserData(userId: string) {
    try {
      const { data } = await getDocument<TUser>('users', userId);
      if (data) setCurrentUserData(data);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    const unsubscribe = handleCurrentUser((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      handleCurrentUserData(currentUser.uid).catch((error) => {
        throw new Error(String(error));
      });
    } else {
      setCurrentUserData(null);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
