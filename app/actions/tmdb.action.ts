"use server";

import { revalidatePath } from "next/cache";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export const handleValidateFilm = async (formData: any) => {
  const id = parseInt(formData.get("id") as string);
  const filmPoster = formData.get("filmPoster") as string;

  console.log("handleValidateFilm ID", id);
  const movieDetails = await getMovieDetails(id, filmPoster);

  return movieDetails;
};

export const searchMatchingMoviesWithTitle = async (title: string) => {
  try {
    const response: Response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=fr-Fr&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la requête HTTP");
    }

    return response.json();
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la recherche de films :",
      error
    );
    throw error;
  }
};

export const getMovieDetails = async (id: number, filmPoster: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=fr-Fr`,
      options
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la requête HTTP");
    }

    const movieDetails = await response.json();

    let directors = [] as string[];
    movieDetails.credits.crew.filter((crew: any) => {
      if (crew.job === "Director") {
        directors.push(crew.name);
      }
    });

    const movie = {
      idTmdb: movieDetails.id,
      title: movieDetails.title,
      originalTitle: movieDetails.original_title,
      poster: filmPoster,
      releaseDate: new Date(movieDetails.release_date),
      sagaIdTmdb: movieDetails.belongs_to_collection?.id,
      directorsName: directors,
    };

    console.log("movie FETCHED", movie.idTmdb);
    return movie;
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la recherche du film :",
      error
    );
    throw error;
  }
};
