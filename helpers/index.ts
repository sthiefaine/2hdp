export function slugify(title: string): string {
  return title
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Transforme une URL de Vercel Blob Storage vers le domaine personnalisé
 * @param url - L'URL originale de Vercel Blob Storage
 * @returns L'URL transformée vers uploadfiles.clairdev.com
 */
export function transformUrl(url: string): string {
  // Vérifie si l'URL est une URL de Vercel Blob Storage
  if (url.includes("public.blob.vercel-storage.com")) {
    // Extrait le chemin du fichier après le domaine
    const urlParts = url.split("public.blob.vercel-storage.com/");
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      // Construit la nouvelle URL avec le domaine personnalisé
      return `https://uploadfiles.clairdev.com/uploads/${filePath}`;
    }
  } else if (url.includes("uploadfiles.clairdev.com")) {
    return url;
  }

  // Si ce n'est pas une URL de Vercel Blob Storage, retourne l'URL originale
  return `https://uploadfiles.clairdev.com/uploads/${url}`;
}
