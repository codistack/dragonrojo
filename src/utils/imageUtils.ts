/**
 * Transforma URLs de imágenes (incluyendo álbumes de Imgur)
 * a URLs de imagen directa que funcionen en las etiquetas <img> de HTML.
 */
export function getDirectImageUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Imgur Album format: https://imgur.com/a/IYGNbmi -> https://i.imgur.com/IYGNbmi.jpg
  const imgurAlbumMatch = trimmed.match(/imgur\.com\/a\/([a-zA-Z0-9]+)/i);
  if (imgurAlbumMatch && imgurAlbumMatch[1]) {
    return `https://i.imgur.com/${imgurAlbumMatch[1]}.jpg`;
  }

  // Imgur Single Page format: https://imgur.com/IYGNbmi -> https://i.imgur.com/IYGNbmi.jpg
  const imgurSingleMatch = trimmed.match(/imgur\.com\/([a-zA-Z0-9]+)$/i);
  if (imgurSingleMatch && imgurSingleMatch[1]) {
    return `https://i.imgur.com/${imgurSingleMatch[1]}.jpg`;
  }

  return trimmed;
}
