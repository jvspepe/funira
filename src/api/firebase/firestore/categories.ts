import { nanoid } from "nanoid";
import {
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { TCategory } from "../../../@types/categories";

const categoryConverter: FirestoreDataConverter<TCategory> = {
  toFirestore(category) {
    return category;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TCategory;
  },
};

async function addCategory(
  firestore: Firestore,
  categoryData: Omit<TCategory, "uid" | "createdAt">
) {
  const uid = nanoid(20);
  try {
    await setDoc(
      doc(firestore, "categories", uid).withConverter(categoryConverter),
      {
        uid,
        ...categoryData,
        createdAt: Timestamp.now(),
      }
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getCategories(firestore: Firestore) {
  const dataCollection: TCategory[] = [];
  const collectionReference = query(
    collection(firestore, "categories"),
    orderBy("label", "asc")
  );
  try {
    const data = await getDocs(
      collectionReference.withConverter(categoryConverter)
    );

    data.forEach((item) => {
      if (!item.exists()) return;
      dataCollection.push(item.data());
    });

    return dataCollection;
  } catch (error) {
    throw new Error(String(error));
  }
}

export { addCategory, getCategories };
