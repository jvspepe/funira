/* eslint-disable no-useless-catch */
import { FirebaseError } from 'firebase/app';
import {
  AuthErrorCodes,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import type { User } from '@/@types/models';
import { auth } from '@/lib/config';
import { createDocument, getDocument } from '@/lib/database';

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
      case AuthErrorCodes.POPUP_CLOSED_BY_USER:
        message = 'Operação cancelada';
        break;
      case AuthErrorCodes.POPUP_BLOCKED:
        message = 'Operação bloqueada';
        break;
      default:
        message = 'Algo deu errado';
        break;
    }
  }
  return message;
};

export const handleCurrentUser = (
  callback: (user: FirebaseUser | null) => void
) => {
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
      createDocument<User>('users', user.uid, {
        id: user.uid,
        username,
        email,
        role: 'user',
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

export const loginUserWithGoogle = async (persistUser = false) => {
  try {
    await handleUserPersistence(persistUser);

    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

    const document = await getDocument<User>('users', user.uid);

    switch (document.status) {
      case 'fail':
        return await createDocument<User>('users', user.uid, {
          id: user.uid,
          email: user.email ?? '',
          username: user.displayName ?? '',
          role: 'user',
          createdAt: Timestamp.now(),
        });
      case 'success':
      case 'error':
        return document;
    }
  } catch (error) {
    throw error;
  }
};
