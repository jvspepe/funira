import { storage } from "@/config/storage";

const PRODUCT_IMAGES_BUCKET = "product-images";

export async function getSignedUrls(paths: string[]) {
  const result = await storage
    .from(PRODUCT_IMAGES_BUCKET)
    .createSignedUrls(paths, 120);

  if (result.error) {
    throw result.error;
  }

  return result.data;
}

export async function createSignedUploadUrls(paths: string[]) {
  const results = await Promise.all(
    paths.map(
      async (path) =>
        await storage.from(PRODUCT_IMAGES_BUCKET).createSignedUploadUrl(path)
    )
  );

  for (const result of results) {
    if (result.error) {
      throw result.error;
    }
  }

  return results.map((result) => result.data!);
}

export function getPublicUrl(path: string) {
  const { data } = storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
