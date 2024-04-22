"use server";
import prisma from "@/lib/prisma";

export const createMovie = async (movie: any) => {
  /*   const imageUrl = await fetch(
    `https://image.tmdb.org/t/p/w1280${movie.poster}`,
    {
      mode: "no-cors",
    }
  );

  console.log("Image DOWNLOAD INIT");
  const blob = await imageUrl.blob();
  console.log("Image DOWNLOAD OK");
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("name", slugify(movie.title));
  console.log("blob", blob);
  const url = await uploadPosterMovies(formData);
 */

  const movieWithNewImage = { ...movie };

  const result = await prisma.movies.upsert({
    where: { idTmdb: movieWithNewImage.idTmdb },
    update: { ...movieWithNewImage },
    create: { ...movieWithNewImage },
  });

  return result;
};

export const fetchBlob = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  console.log("blob", blob);
  const base64String = await convertBlobToBase64(blob);
  return base64String as string;
};

const convertBlobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
