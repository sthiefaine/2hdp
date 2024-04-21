"use client";

import { useState } from "react";
import Stepper from "../Stepper/stepper";
import FilmInfo from "./FilmInfo";
import FilmSearchTmdb from "./FilmSearchTmdb";
import ImageInfo from "./ImageInfo";
import PodcastInfo from "./PodcastInfo";

import styles from "./searchMovie.module.css";

export default function SearchMovie({
  result,
  title,
  guid,
  slug,
}: {
  result: Array<any>;
  guid: string;
  title: string;
  slug: string;
}) {
  const [filmSelectedDetails, setFilmSelectedDetails] = useState<any>({});
  const [idTmdb, setIdTmdb] = useState<number>();
  const [step, setStep] = useState(1);
  const [podcastIsLinkedToMovie, setPodcastIsLinkedToMovie] = useState(false);

  const handleManualStep = () => {
    if (Object.entries(result).length !== 0) {
      setFilmSelectedDetails(result[0]);
    }
    setStep(2);
  };

  const handlePodcastIsLinkedToMovie = () => {
    setPodcastIsLinkedToMovie(true);
  };

  const handlePodcastIsNotLinkedToMovie = () => {
    setPodcastIsLinkedToMovie(false);
    setStep(2);
  };

  return (
    <>
      <Stepper
        step={step}
        setStep={setStep}
        setFilmSelectedDetails={setFilmSelectedDetails}
        stepsNames={["Selection", "Contenu", "Podcast", "Image"]}
        steps={[1, 2, 3, 4]}
      />

      <div className={styles.container}>
        {step === 1 && (
          <>
            <div>
              <section className={styles.section}>
                <h3 className={styles.title}>
                  Ce podcast est-il lié à un film ?
                </h3>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => handlePodcastIsLinkedToMovie()}
                    className={`${styles.button} ${
                      podcastIsLinkedToMovie ? styles.buttonActive : ""
                    }`}
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => handlePodcastIsNotLinkedToMovie()}
                    className={styles.button}
                  >
                    Non
                  </button>
                </div>
              </section>
            </div>

            {podcastIsLinkedToMovie && (
              <>
                <FilmSearchTmdb
                  slug={slug}
                  idTmdb={idTmdb}
                  setIdTmdb={setIdTmdb}
                  setFilmSelectedDetails={setFilmSelectedDetails}
                  guid={guid}
                  title={title}
                  filmSelectedDetails={filmSelectedDetails}
                  setStep={setStep}
                />
                <div className={styles.section}>
                  <button
                    className={styles.manualButton}
                    onClick={() => handleManualStep()}
                  >
                    Remplissage manuel
                  </button>
                  <span className={styles.legendText}>
                    Vous allez completer directement les informations relatives
                    au film
                  </span>
                </div>
              </>
            )}
          </>
        )}
        {step === 2 && (
          <>
            <FilmInfo
              idTmdb={idTmdb}
              setIdTmdb={setIdTmdb}
              slug={slug}
              guid={guid}
              title={result[0]?.movieTitle ?? title}
              filmSelectedDetails={filmSelectedDetails}
              setFilmSelectedDetails={setFilmSelectedDetails}
              isMovie={podcastIsLinkedToMovie}
              setStep={setStep}
            />
          </>
        )}
        {step === 3 && (
          <PodcastInfo
            idTmdb={filmSelectedDetails.idTmdb}
            slug={slug}
            guid={guid}
            setStep={setStep}
          />
        )}
        {step === 4 && (
          <ImageInfo
            specialSlug={result[0]?.specialSlug}
            idTmdb={filmSelectedDetails.idTmdb}
            slug={slug}
          />
        )}
      </div>
    </>
  );
}
