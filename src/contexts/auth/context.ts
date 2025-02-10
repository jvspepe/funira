import { createContext } from 'react';
import { User } from 'firebase/auth';
import { TUser } from '@/@types/user';

export type TAuthContext = {
  currentUser: User | null;
  currentUserData: TUser | null;
};

export const AuthContext = createContext<TAuthContext | null>(null);
