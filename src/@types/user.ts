import { Timestamp } from "firebase/firestore";

export type TUser = {
  uid: string;
  displayName: string;
  email: string;
  role: "cliente" | "admin";
  createdAt: Timestamp;
};

export type TUserCredentials = {
  displayName: string;
  email: string;
  password: string;
};
