import { Timestamp } from 'firebase/firestore';

export type TUser = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'administrator';
  createdAt: Timestamp;
};
