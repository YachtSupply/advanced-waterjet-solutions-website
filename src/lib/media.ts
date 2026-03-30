/**
 * Returns true if the URL is a video file based on its extension.
 */
export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url);
}

/**
 * Returns true if the URL is an image file.
 */
export function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(url);
}

/**
 * Returns a thumbnail URL for a Vimeo or YouTube video, or null.
 */
export function getVideoThumbnail(src: string): string | null {
  // YouTube
  const ytMatch = src.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
  );
  if (ytMatch) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }

  // Vimeo (async thumbnail not available here — return null)
  return null;
}
