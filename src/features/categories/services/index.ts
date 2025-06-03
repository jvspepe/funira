import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { type Category } from '@/@types/models';
import { database } from '@/config/app';
import { converter } from '@/features/utils';

export async function createCategory(category: Omit<Category, 'id'>) {
  const categoryRef = doc(collection(database, 'categories')).withConverter(
    converter<Category>()
  );

  await setDoc(categoryRef, {
    id: categoryRef.id,
    ...category,
  });
}

export async function getCategories() {
  const categories = await getDocs(
    collection(database, 'categories').withConverter(converter<Category>())
  );

  if (categories.empty) {
    return [];
  }

  return categories.docs.map((category) => category.data());
}
