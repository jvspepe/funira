import {
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  QueryNonFilterConstraint,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { TProduct } from "@/@types/product";

const productConverter: FirestoreDataConverter<TProduct> = {
  toFirestore(product) {
    return product;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TProduct;
  },
};

async function getProduct(firestore: Firestore, productUID: string) {
  try {
    const data = await getDoc(
      doc(firestore, "products", productUID).withConverter(productConverter)
    );
    if (!data.exists()) {
      throw new Error(String("Produto não existente."));
    }
    return data.data();
  } catch (error) {
    throw new Error(String(error));
  }
}

async function getProducts(
  firestore: Firestore,
  constraints: QueryNonFilterConstraint[] = []
) {
  const databaseProducts: TProduct[] = [];

  let lastDocument: QueryDocumentSnapshot<TProduct>;

  let isLastDocument: boolean;

  try {
    const queryProducts = await getDocs(
      query(
        collection(firestore, "products").withConverter(productConverter),
        ...constraints
      )
    );

    queryProducts.forEach((product) => databaseProducts.push(product.data()));

    isLastDocument = queryProducts.size < 1;

    lastDocument = queryProducts.docs[queryProducts.size - 1];
  } catch (error) {
    throw new Error(String(error));
  }

  return { databaseProducts, lastDocument, isLastDocument };
}

export { getProduct, getProducts };
