import { useEffect, useState } from "react";

const imageCache = new Map<string, string>();

export function useProductImage(productName: string, color?: string) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      const cacheKey = `${productName}-${color || ""}`;

      // Check local cache first
      if (imageCache.has(cacheKey)) {
        setImageUrl(imageCache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      try {
        const queryParams = new URLSearchParams({
          product: productName,
          ...(color && { color }),
        });

        const response = await fetch(`/api/images?${queryParams}`);
        const data = await response.json();
        const url = data.imageUrl || "";

        imageCache.set(cacheKey, url);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch image:", error);
        setImageUrl("");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [productName, color]);

  return { imageUrl, loading };
}
