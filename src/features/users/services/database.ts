import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { type User } from '@/@types/models';
import { database } from '@/config/app';
import { converter } from '@/features/utils';

export async function checkUserExists(userId: string) {
  const userQuery = query(
    collection(database, 'users').withConverter(converter<User>()),
    where(documentId(), '==', userId)
  );

  const result = await getCountFromServer(userQuery);

  return result.data().count > 0;
}

export async function createUser(user: User) {
  if (await checkUserExists(user.id)) {
    throw new Error('User already exists');
  }

  await setDoc(doc(database, 'users', user.id), user);
}

export async function getUser(userId: string) {
  const user = await getDoc(
    doc(database, 'users', userId).withConverter(converter<User>())
  );

  if (!user.exists()) {
    throw new Error('Invalid user ID.');
  }

  return user.data();
}

export async function getUsers(): Promise<User[]> {
  const data = await getDocs(
    collection(database, 'users').withConverter(converter<User>())
  );

  if (data.empty) {
    return [];
  }

  return data.docs.map((doc) => doc.data());
}

export async function deleteUser(userId: string) {
  await deleteDoc(
    doc(database, 'users', userId).withConverter(converter<User>())
  );
}
