import type { ReactNode } from "react";

import { useEffect, useMemo, useState } from "react";

import { handleCurrentUser, getUser } from "@/features/users/services";

import type { IAuthContext } from "./auth-context";

import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] =
    useState<IAuthContext["currentUser"]>(null);

  const [currentUserData, setCurrentUserData] =
    useState<IAuthContext["currentUserData"]>(null);

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
      if (user) {
        getUser(user.uid)
          .then((data) => {
            setCurrentUser(user);
            setCurrentUserData(data);
            setLoading(false);
          })
          .catch((error) => {
            throw error;
          });
      } else {
        setCurrentUser(null);
        setCurrentUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext value={value}>{!loading && children}</AuthContext>;
}
