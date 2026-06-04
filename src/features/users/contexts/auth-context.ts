import type { User as AuthUser } from "firebase/auth";
import { createContext } from "react";

import type { User } from "@/@types/models";

export interface IAuthContext {
  currentUser: AuthUser | null;
  currentUserData: User | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);
