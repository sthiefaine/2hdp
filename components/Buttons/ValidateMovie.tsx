"use client";

import { handleValidateFilm } from "@/app/actions/tmdb.action";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

import styles from "./button.module.css";
export type ValidateMovieProps = {
  film: any;
  guid: string;
  setFilmsWithMatching: any;
  setFilmSelectedDetails: any;
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

    props.setFilmSelectedDetails(getMovieDetail);
    props.setFilmsWithMatching([]);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit}>
      <button className={styles.button} type="submit">
        Selectionner
      </button>{" "}
    </form>
  );
};
