import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Firestore } from "firebase/firestore";

import { addUser } from "../firestore/users";
import { TUserCredentials } from "../../../@types/user";

async function createUser(
  auth: Auth,
  firestore: Firestore,
  userCredentials: TUserCredentials,
  isAdmin = false
) {
  const { displayName, email, password } = userCredentials;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await Promise.all([
    updateProfile(user, {
      displayName,
    }),
    addUser(firestore, {
      uid: user.uid,
      displayName,
      email,
      role: !isAdmin ? "cliente" : "admin",
    }),
  ]);
}

export default createUser;
