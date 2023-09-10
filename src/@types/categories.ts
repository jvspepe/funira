import { Timestamp } from "firebase/firestore";

export type TCategory = {
  uid: string;
  label: string;
  value: string;
  createdAt: Timestamp;
};
