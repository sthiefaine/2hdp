"use server";
import { slugify } from "@/helpers";
import { uploadPosterMovies } from "./upload.action";
import prisma from "@/helpers/prisma";

export const createMovie = async (movie: any) => {
  console.log("createMovie", movie.title);

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
  const url = "";
  const movieWithNewImage = { ...movie, poster: url ?? "" };

  const result = await prisma.movies.upsert({
    where: { idTmdb: movieWithNewImage.idTmdb },
    update: { ...movieWithNewImage },
    create: { ...movieWithNewImage },
  });

  return result;
};
