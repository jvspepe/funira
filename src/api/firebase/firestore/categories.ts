import {
  Firestore,
  FirestoreDataConverter,
  collection,
  getDocs,
  orderBy,
  query,
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

export { getCategories };
