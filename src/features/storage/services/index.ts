import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/app';

export async function uploadImage(url: string, image: File) {
  const result = await uploadBytes(ref(storage, url), image);

  return await getDownloadURL(result.ref);
}
