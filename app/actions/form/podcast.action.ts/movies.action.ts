"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadPosterMovies } from "../../upload.action";

export const fetchMoviePosterFromTmdb = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

export const updateMoviePoster = async (
  prevState: {
    idTmdb: number;
    title: string;
    releaseDate: string;
    slug: string;
    selectedImage: string;
    tmdbPosterUrl: string;
  },
  initialState: any,
  formData: FormData
) => {
  const podcastInfo = prevState;

  formData.append("name", prevState.slug);

  if (prevState.selectedImage === "base") {
    revalidatePath(`/details/${podcastInfo.slug}`);
    return {
      success: true,
      message: "Movie Poster updated",
    };
  } else if (prevState.selectedImage === "auto") {
    const imageBlob = await fetchMoviePosterFromTmdb(prevState.tmdbPosterUrl);
    formData.set("image", imageBlob);
  } else if (prevState.selectedImage === "manual") {
    // nothing yet
  } else {
    return {
      success: false,
      message: "Wrong argument you need to select picture",
    };
  }

  const blobUrl = await uploadPosterMovies(formData);

  // remove empty fields
  for (const [key, value] of formData.entries()) {
    if (!String(value).trim()) {
      formData.delete(key);
    }
  }

  const result = await prisma.movies.update({
    where: {
      idTmdb: prevState.idTmdb,
    },
    data: {
      poster: blobUrl,
    },
  });

  if (result) {
    revalidatePath(`/details/${podcastInfo.slug}`);
    return {
      success: true,
      message: "Movie Poster updated",
    };
  }

  return {
    success: false,
    message: "Movie Poster update failed",
  };
};
