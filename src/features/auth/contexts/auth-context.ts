import { createContext } from 'react';
import { User as AuthUser } from 'firebase/auth';
import { User } from '@/@types/models';

export interface IAuthContext {
  currentUser: AuthUser | null;
  currentUserData: User | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);
