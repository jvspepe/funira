import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import { TUser } from '@/@types/user';
import { handleCurrentUser } from '@/lib/auth';
import { getDocument } from '@/lib/database';

type TAuthContext = {
  currentUser: User | null;
  currentUserData: TUser | null;
};

const AuthContext = createContext<TAuthContext | null>(null);

const useAuth = () => {
  const authContextCheck = useContext(AuthContext);

  if (!authContextCheck) {
    throw new Error('Something went wrong');
  }

  return authContextCheck;
};

function AuthProvider({ children }: { children: ReactNode }) {
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
}

export { AuthProvider, useAuth };
