import { adminStorage, storage } from "@/config/storage";

const PRODUCT_IMAGES_BUCKET = "product-images";

export function getPublicUrl(path: string) {
  const { data } = storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProductImage(
  file: File,
  path: string
): Promise<string> {
  const result = await adminStorage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (result.error) {
    throw result.error;
  }

  return result.data.path;
}
