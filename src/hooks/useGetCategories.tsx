import { useEffect, useState } from 'react';
import { TCategory } from '@/@types/categories';
import { getDocuments } from '@/lib/database';

function useGetCategories() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetCategories = async () => {
    try {
      const { data } = await getDocuments<TCategory>('categories');
      if (data) setCategories(data.documents);
    } catch (error) {
      console.log(error);
      throw error;
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCategories().catch((error) => console.log(error));
  }, []);

  return { categories, loading };
}

export default useGetCategories;
