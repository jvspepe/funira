import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryDocumentSnapshot,
  type QueryNonFilterConstraint,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { type Product } from '@/@types/models';
import { database } from '@/config/app';
import { uploadImage } from '@/features/storage/services';
import {
  converter,
  generateRandomNumber,
  generateRandomRating,
} from '@/features/utils';

const productsCollectionRef = collection(database, 'products').withConverter(
  converter<Product>()
);

export async function createProduct(
  product: Omit<
    Product,
    'id' | 'ratingsAverage' | 'sales' | 'createdAt' | 'imageCover'
  > & {
    imageCover: File;
  }
) {
  const productRef = doc(collection(database, 'products')).withConverter(
    converter<Product>()
  );

  const imageCoverURL = await uploadImage(
    `products/${productRef.id}`,
    product.imageCover
  );

  await setDoc(productRef, {
    id: productRef.id,
    ...product,
    imageCover: imageCoverURL,
    ratingsAverage: generateRandomRating(3, 5),
    sales: generateRandomNumber(30, 100),
    createdAt: serverTimestamp(),
  });
}

export async function getProduct(productId: string): Promise<Product> {
  const product = await getDoc(
    doc(database, 'products', productId).withConverter(converter<Product>())
  );

  if (!product.exists()) throw new Error('Produto não existe');

  return product.data();
}

export async function getAllProducts(
  ...queryConstraints: QueryNonFilterConstraint[]
): Promise<{
  products: Product[];
  lastDocument?: QueryDocumentSnapshot<Product, Product>;
  totalSize?: number;
}> {
  const count = await getCountFromServer(
    query(productsCollectionRef, ...queryConstraints)
  );
  const result = await getDocs(
    query(productsCollectionRef, ...queryConstraints)
  );

  if (result.empty)
    return {
      products: [],
    };

  const lastDocument = result.docs[result.size - 1];

  const products = result.docs.map((product) => product.data());

  return {
    products,
    lastDocument,
    totalSize: count.data().count,
  };
}

interface GetProductsOptions {
  limitBy?: number;
  sortBy?: [keyof Product, 'asc' | 'desc'];
}
export async function getProducts({
  limitBy = 8,
  sortBy = ['createdAt', 'desc'],
}: GetProductsOptions) {
  const productsQuery = query(
    collection(database, 'products').withConverter(converter<Product>()),
    orderBy(...sortBy),
    limit(limitBy)
  );

  const data = await getDocs(productsQuery);

  if (data.empty) {
    return [];
  }

  return data.docs.map((product) => product.data());
}

export async function updateProduct(product: Partial<Product>) {
  if (!product.id) {
    throw new Error('Product id is required to update a product.');
  }

  await updateDoc(
    doc(database, 'products', product.id).withConverter(converter<Product>()),
    product
  );
}

export async function deleteProduct(productId: string) {
  await deleteDoc(doc(database, 'products', productId));

  return 'Produto excluído com sucesso';
}
