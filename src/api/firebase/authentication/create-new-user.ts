import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/api/firebase/firebase-config";
import { addUser } from "@/api/firebase/firestore/users";
import { TUserCredentials } from "@/@types/user";

async function createUser(userCredentials: TUserCredentials, isAdmin = false) {
  const { displayName, email, password } = userCredentials;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await Promise.all([
    updateProfile(user, {
      displayName,
    }),
    addUser({
      uid: user.uid,
      displayName,
      email,
      role: !isAdmin ? "cliente" : "admin",
    }),
  ]);
}

export default createUser;
