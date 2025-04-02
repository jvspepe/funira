import { Timestamp } from 'firebase/firestore';

export type ReturnData<T> = {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
};

export type User = {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
};
