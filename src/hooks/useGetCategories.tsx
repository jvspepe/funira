import { useEffect, useState } from "react";
import { TCategory } from "../@types/categories";
import { firestore } from "../api/firebase/firebase-config";
import { getCategories } from "../api/firebase/firestore/categories";

function useGetCategories() {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    getCategories(firestore)
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return categories;
}

export default useGetCategories;
