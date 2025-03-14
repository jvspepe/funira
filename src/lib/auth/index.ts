/* eslint-disable no-useless-catch */
import {
  AuthErrorCodes,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { TUser } from '@/@types/user';
import { auth } from '@/lib/config';
import { createDocument } from '@/lib/database';
import { FirebaseError } from 'firebase/app';

export const handleAuthError = (error: unknown) => {
  let message = '';
  if (!(error instanceof FirebaseError)) {
    message = String(error);
  }
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case AuthErrorCodes.USER_DELETED:
        message = 'Usuário não existe';
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        message = 'Senha incorreta';
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        message = 'E-mail já em uso';
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        message = 'E-mail inválido';
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        message = 'Senha muito fraca';
        break;
      default:
        message = 'Algo deu errado';
        break;
    }
  }
  return message;
};

export const handleCurrentUser = (callback: (user: User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
    callback(currentUser)
  );

  return unsubscribe;
};

const handleUserPersistence = async (persistUser: boolean) => {
  try {
    await setPersistence(
      auth,
      persistUser ? browserLocalPersistence : browserSessionPersistence
    );
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  persistUser = false
) => {
  try {
    await handleUserPersistence(persistUser);

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await Promise.all([
      createDocument<TUser>('users', user.uid, {
        id: user.uid,
        username,
        email,
        role: 'customer',
        createdAt: Timestamp.now(),
      }),
      updateProfile(user, {
        displayName: username,
      }),
    ]);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
  persistUser = false
) => {
  try {
    await handleUserPersistence(persistUser);

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
