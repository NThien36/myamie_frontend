import { noAvatar, noCover } from "@/assets/images";

// export function getCoverUrl(imagePath: string | null): string {
//   const baseUrl = import.meta.env.VITE_BASE_URL_IMAGE;

//   // Return a full URL or a default fallback image
//   return imagePath ? `${baseUrl}/${imagePath}` : noCover;
// }

// export function getAvatarUrl(imagePath: string | null): string {
//   const baseUrl = import.meta.env.VITE_BASE_URL_IMAGE;

//   // Return a full URL or a default fallback image
//   return imagePath ? `${baseUrl}/${imagePath}` : noAvatar;
// }

export default function getImageUrl(
  imagePath: string | null | undefined,
  type: "cover" | "avatar"
): string {
  const fallbackImage = type === "cover" ? noCover : noAvatar;

  const baseUrl = import.meta.env.VITE_BASE_URL_IMAGE;
  // Return a full URL or a default fallback image
  return imagePath ? `${baseUrl}/${imagePath}` : fallbackImage;
}
