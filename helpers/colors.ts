function adjustColorBrightness(
  rgb: number[],
  threshold: number,
  adjustment: number
): number[] {
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

  if (luminance > threshold) {
    // Si la luminance est trop élevée, ajuster la couleur en réduisant la luminosité
    return rgb.map((color) => Math.max(0, color - adjustment));
  } else {
    return rgb;
  }
}

function adjustColorYellowness(
  rgb: number[],
  threshold: number,
  adjustment: number
): number[] {
  // Calculer la proportion de rouge et de vert par rapport au bleu
  const yellowProportion = (rgb[0] + rgb[1]) / (rgb[2] + 1); // Ajouter 1 pour éviter une division par zéro

  // Vérifier si la proportion est supérieure au seuil spécifié
  if (yellowProportion > threshold) {
    // Si la proportion est trop élevée, ajuster la couleur en augmentant la composante bleue
    return [rgb[0], rgb[1], Math.min(255, rgb[2] + adjustment)];
  } else {
    // Sinon, retourner la couleur d'origine
    return rgb;
  }
}

export async function getAverageRGB(src: string): Promise<number[]> {
  /* https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript */
  return new Promise((resolve) => {
    const context = document.createElement("canvas").getContext("2d");
    context!.imageSmoothingEnabled = true;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "";

    img.onload = () => {
      context!.drawImage(img, 0, 0, 1, 1);
      const imageData = context!.getImageData(0, 0, 1, 1);
      const rgb: Uint8ClampedArray = imageData.data.slice(0, 3);

      // Appeler la fonction d'ajustement de la luminosité
      let adjustedRGB = adjustColorBrightness(Array.from(rgb), 0.8, 30);

      adjustedRGB = adjustColorYellowness(adjustedRGB, 2, 20);
      resolve(adjustedRGB);
    };
  });
}
