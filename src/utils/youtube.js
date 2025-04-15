/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The YouTube video ID or null if not found
 */
export function getYoutubeVideoId(url) {
  if (!url) return null;

  // Regular expressions to match different YouTube URL formats
  const regexps = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/i, // Standard and shortened URLs
    /youtube\.com\/embed\/([^/?]+)/i, // Embed URLs
    /youtube\.com\/v\/([^/?]+)/i, // Old embed URLs
    /youtube\.com\/user\/[^/?]+\/?\?v=([^&?/]+)/i, // User page URLs
    /youtube\.com\/attribution_link\?.*?v%3D([^%&]+)/i, // Attribution links
  ];

  for (const regex of regexps) {
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Gets the YouTube thumbnail URL for a given YouTube URL
 * @param {string} url - The YouTube URL
 * @param {string} quality - The thumbnail quality (default, mq, hq, sd, max)
 * @returns {string} - The thumbnail URL or a placeholder if not found
 */
export function getYoutubeThumbnail(url, quality = "hq") {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return "/placeholder.svg?height=400&width=600";
  }

  const qualityMap = {
    default: "default.jpg",
    mq: "mqdefault.jpg",
    hq: "hqdefault.jpg",
    sd: "sddefault.jpg",
    max: "maxresdefault.jpg",
  };

  const thumbnailQuality = qualityMap[quality] || qualityMap.hq;
  return `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}`;
}
