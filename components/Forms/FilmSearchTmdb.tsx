"use client";

import { searchMatchingMoviesWithTitle } from "@/app/actions/tmdb.action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ValidateMovie } from "../Buttons/ValidateMovie";
import styles from "./filmSearchTmdb.module.css";

type FilmSearchTmdbProps = {
  idTmdb?: number;
  setIdTmdb: (id: number) => void;
  setFilmSelectedDetails: (film: any) => void;
  setStep: (step: number) => void;
  slug: string;
  guid: string;
  title: string;
  filmSelectedDetails: any;
};

export default function FilmSearchTmdb({
  idTmdb,
  setIdTmdb,
  setFilmSelectedDetails,
  setStep,
  guid,
  title,
  filmSelectedDetails,
}: FilmSearchTmdbProps) {
  const [filmsWithMatching, setFilmsWithMatching] = useState([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (Object.entries(filmSelectedDetails).length !== 0) {
      setStep(2);
    }
  }, [filmSelectedDetails, setStep]);

  const handleSearchMovieFromTitle = async (formData: FormData) => {
    const title = formData.get("title") as string;

    const test = await searchMatchingMoviesWithTitle(title);

    if (test.results === 0) {
      setError(true);
    } else {
      setFilmsWithMatching(test.results.slice(0, 6));
    }
  };

  const DisplayFilms = () => {
    return (
      <>
        <section className={styles.subSection}>
          <FilmMatchingList />
        </section>
      </>
    );
  };

  const DisplayCleanSearch = () => {
    return (
      <button onClick={() => setFilmsWithMatching([])}>Reinitialiser</button>
    );
  };

  const FilmMatchingList = () => {
    return filmsWithMatching.map((film: any) => {
      return (
        <div className={styles.card} key={film.id}>
          <h2>{film.title}</h2>
          <h3>{film.release_date}</h3>
          <div className={styles.pictureContainer}>
            {film.backdrop_path && (
              <Image
                unoptimized
                src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`}
                width={280}
                height={160}
                alt={film.title}
              />
            )}{" "}
            <ValidateMovie
              film={film}
              guid={guid}
              setFilmsWithMatching={setFilmsWithMatching}
              setFilmSelectedDetails={setFilmSelectedDetails}
            />
          </div>

          <br />
          {film.directors && (
            <div className={styles.directors}>
              <strong>Directeurs :</strong> {film.directors.join(", ")}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.section}>
        <span className={styles.subtitle}>
          Recherche automatique{" "}
          {!error && filmsWithMatching?.length > 0 && <DisplayCleanSearch />}
        </span>
        {!error && filmsWithMatching?.length > 0 && <DisplayFilms />}
        {error && <span>Aucun film trouvé</span>}
        {filmsWithMatching?.length === 0 && (
          <form className={styles.form} action={handleSearchMovieFromTitle}>
            <label className={styles.label} htmlFor="title">
              Titre du film
            </label>
            <input
              className={styles.input}
              type="text"
              name="title"
              required
              defaultValue={title}
              placeholder="retour vers le futur"
            />
            <button className={styles.button} type="submit">
              Rechercher
            </button>
          </form>
        )}
      </div>
    </>
  );
}
