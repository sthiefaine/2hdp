"use client";
import { createMovie } from "@/app/actions/movies.action";
import { updatePodcast } from "@/app/actions/podcast.action";
import { handleValidateFilm } from "@/app/actions/tmdb.action";
import { Movie } from "@/models/podcast.model";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { useFormStatus } from "react-dom";
export type ValidateMovieProps = {
  film: any;
  guid: string;
  setFilmsWithMatching: any;
};

export const ValidateMovie = (props: ValidateMovieProps) => {
  const router = useRouter();
  const { film, guid } = props;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", film.id);
    formData.append("filmPoster", film.backdrop_path);

    const getMovieDetail = await handleValidateFilm(formData);

    await Promise.all([
      updatePodcast(guid, getMovieDetail.idTmdb),
      createMovie(getMovieDetail),
    ]).then((values) => {
      console.log("PROMESSE OK");
      props.setFilmsWithMatching([]);
      router.refresh();
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">OK</button>{" "}
    </form>
  );
};
