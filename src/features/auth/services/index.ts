import {
  type User,
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as authSignOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  signInWithPopup,
  deleteUser as authDeleteUser,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { env } from '@/config/env';
import { auth } from '@/config/app';
import {
  checkUserExists,
  createUser,
  deleteUser,
} from '@/features/users/services';

export function handleCurrentUser(fn: (user: User | null) => void) {
  const unsub = onAuthStateChanged(auth, (user) => fn(user));

  return unsub;
}

async function handleRememberUser(rememberUser: boolean) {
  await setPersistence(
    auth,
    rememberUser ? browserLocalPersistence : browserSessionPersistence
  );
}

export async function signUp(
  username: string,
  email: string,
  password: string,
  rememberUser = false
) {
  await handleRememberUser(rememberUser);

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await Promise.all([
    updateProfile(user, { displayName: username }),
    createUser({
      id: user.uid,
      username,
      email,
      role: 'customer',
      createdAt: Timestamp.now(),
    }),
  ]);
}

export async function signIn(
  email: string,
  password: string,
  rememberUser = false
) {
  await handleRememberUser(rememberUser);

  await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle(rememberUser = false) {
  await handleRememberUser(rememberUser);

  const googleProvider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(auth, googleProvider);

  if (!(await checkUserExists(user.uid))) {
    await createUser({
      id: user.uid,
      email: user.email ?? '',
      username: user.displayName ?? '',
      role: 'customer',
      createdAt: Timestamp.now(),
    });
  }
}

export async function signOut() {
  await authSignOut(auth);
}

export async function forgotPassword(email: string) {
  await sendPasswordResetEmail(auth, email, {
    url: env.VITE_FIREBASE_CONTINUE_URL,
  });
}

export async function resetPassword(code: string, newPassword: string) {
  await confirmPasswordReset(auth, code, newPassword);
}

export async function deleteAccount(user: User) {
  await deleteUser(user.uid);

  await authDeleteUser(user);
}
