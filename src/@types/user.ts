import { Timestamp } from 'firebase/firestore';

export type TUser = {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: Timestamp;
};

export type TUserCredentials = {
  username: string;
  email: string;
  password: string;
};
