"use client";

import { handleCreateMovie } from "@/app/actions/form/form.action";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import styles from "./searchMovie.module.css";

type FilmInfoProps = {
  idTmdb?: number;
  setIdTmdb: (id: number) => void;
  setStep: (step: number) => void;
  setFilmSelectedDetails: (details: any) => void;
  slug: string;
  guid: string;
  title: string;
  filmSelectedDetails: any;
  isMovie: boolean;
};

export default function FilmInfo({
  idTmdb,
  setIdTmdb,
  guid,
  title,
  filmSelectedDetails,
  setFilmSelectedDetails,
  isMovie,
  setStep,
}: FilmInfoProps) {
  const updateMovieWithGuid = handleCreateMovie.bind(null, {
    filmSelectedDetails,
    isMovie,
    guid,
  });

  const [formState, formAction] = useFormState(updateMovieWithGuid, null);

  useEffect(() => {
    if ((formState as unknown as { success?: boolean })?.success) {
      setFilmSelectedDetails({
        idTmdb: formState?.message,
      });
      setStep(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, setStep]);

  return (
    <div className={styles.section}>
      <span className={styles.subtitle}>
        Info du {isMovie ? "film" : "contenu"}
      </span>
      <form className={styles.form} action={formAction}>
        <label htmlFor="title">Titre</label>
        <input
          className={styles.input}
          type="text"
          name="title"
          required
          defaultValue={filmSelectedDetails.title ?? title}
          placeholder="retour vers le futur"
        />
        <label htmlFor="year">Année</label>
        <input
          className={styles.input}
          type="number"
          name="year"
          placeholder="1985"
          defaultValue={filmSelectedDetails.releaseDate?.getFullYear()}
        />
        <label htmlFor="directorsName">Directeurs</label>
        <input
          className={styles.input}
          type="text"
          name="directorsName"
          placeholder="John Doe, John Smith"
          defaultValue={filmSelectedDetails.directorsName?.join(", ")}
        />
        {isMovie && (
          <>
            <label htmlFor="idTmdb">ID Tmdb</label>

            <div>
              <input
                className={styles.input}
                type="number"
                name="idTmdb"
                placeholder="00000"
                defaultValue={filmSelectedDetails.idTmdb ?? null}
                onChange={(e) => setIdTmdb(parseInt(e.target.value))}
                value={idTmdb}
              />
              {(filmSelectedDetails.idTmdb || idTmdb) && (
                <Link
                  className={styles.button}
                  href={
                    `https://www.themoviedb.org/movie/` +
                    (filmSelectedDetails.idTmdb || idTmdb)
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ouvrir
                </Link>
              )}
            </div>
          </>
        )}

        <button className={styles.button} type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}
