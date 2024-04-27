"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import SearchMovie from "../Forms/SearchMovie";
import styles from "./detail.module.css";
import { ModalReview } from "./modalReview";

import { usePlayerStore } from "@/zustand/store/player";
import { Download, MessageCircleHeart, Pause, Play } from "lucide-react";
import { useSession } from "next-auth/react";

export type PodcastPlayerProps = {
  result: Array<any>;
  reviewInfo: Array<any>;
  previousAndNext: { previousPodcast: any; nextPodcast: any };
};

export const PodcastDetail = ({
  result,
  reviewInfo,
  previousAndNext,
}: PodcastPlayerProps) => {
  const { data: session, status } = useSession();
  const loggedIn = status === "authenticated" && session.user?.name;
  const {
    podcast,
    setPodcast,
    isPlaying,
    setIsPlaying,
    setLaunchPlay,
    launchPlay,
  } = usePlayerStore();
  const [displayOpenEditMovie, setDisplayOpenEditMovie] = useState(false);
  const [displayReview, setDisplayReview] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setDisplayReview(false);
        setDisplayOpenEditMovie(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openEditMovie = () => {
    setDisplayOpenEditMovie(!displayOpenEditMovie);
  };

  const previousPodcast = previousAndNext.previousPodcast[0];
  const nextPodcast = previousAndNext.nextPodcast[0];

  const handleListen = () => {
    setIsPlaying(true);

    if (podcast.url !== result[0].audio) {
      setPodcast({
        ...podcast,
        title: result[0].title ?? result[0].movieTitle,
        url: result[0].audio,
        img: result[0].poster ?? "/cover.jpg",
        artist: result[0].speakers?.join(", ") ?? "",
      });
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  if (!result[0]) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        {" "}
        <Image
          className={styles.landingImage}
          src={
            result[0]?.poster && result[0]?.poster !== "null"
              ? result[0]?.poster
              : "/cover.jpg"
          }
          style={{ objectFit: "cover" }}
          alt="Poster of the movie"
          quality={100}
          fill={true}
          priority={true}
        />
        <div className={styles.informations}>
          <h1 className={styles.title}>
            {result[0].title ?? result[0].movieTitle}
          </h1>
          {result[0].releaseDate && (
            <span className={styles.releaseDate}>
              {"(" + new Date(result[0].releaseDate).getFullYear() + ")"}
            </span>
          )}

          {loggedIn && (
            <>
              <button className={styles.button} onClick={openEditMovie}>
                EDITER
              </button>
            </>
          )}
          <div className={styles.subtitle}>
            {result[0].directorsName && (
              <span className={styles.directors}>
                de {result[0].directorsName?.join(", ")}
              </span>
            )}
          </div>
          <div className={styles.text}>
            <span className={styles.saison}>S{result[0].saison}</span>
            <span className={styles.episode}>E{result[0].episode}</span>
            <span className={styles.description}>
              {result[0].descriptionHtml ?? result[0].description}
            </span>
          </div>
          <div className={styles.actionBar}>
            {(!isPlaying || result[0].audio !== podcast?.url) && (
              <button
                className={styles.buttonAction}
                onClick={() => handleListen()}
              >
                <Play /> Écouter
              </button>
            )}
            {isPlaying && result[0].audio === podcast.url && (
              <button
                className={styles.buttonAction}
                onClick={() => handlePause()}
              >
                <Pause /> Pause
              </button>
            )}

            <button className={styles.buttonAction}>
              <a
                href={result[0].audio}
                download
                about="Télécharger le podcast"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download /> Télécharger
              </a>
            </button>

            {reviewInfo[0]?.review && (
              <button
                className={styles.buttonAction}
                onClick={() => setDisplayReview(true)}
              >
                <MessageCircleHeart /> Fandecoatch
              </button>
            )}

            {result[0].idTmdb && result[0].isMovie && (
              <button className={styles.buttonAction}>
                <a
                  href={`https://www.themoviedb.org/movie/${result[0].idTmdb}`}
                  about="ouvrir le lien Tmdb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/tmdb_icon.svg"
                    alt="tmdb"
                    width={100}
                    height={30}
                  />{" "}
                </a>
              </button>
            )}

            {reviewInfo[0]?.idAlloCine && (
              <button className={styles.buttonAction}>
                <a
                  href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${reviewInfo[0]?.idAlloCine}.html`}
                  about="ouvrir le lien Allociné"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/allocine_icon.svg"
                    alt="tmdb"
                    width={100}
                    height={30}
                  />
                </a>
              </button>
            )}
          </div>

          <div>
            <span className={styles.publishDate}>
              Publié le{" "}
              {result[0].createdAt.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {result[0]?.speakers && (
              <span className={styles.speakers}>
                Avec {result[0]?.speakers?.join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.child}>
        <div className={styles.card__bottom__container}>
          <div className={styles.card__navigation}>
            {nextPodcast && (
              <div className={styles.card__navigation__container}>
                <span className={styles.card__navigation__title}>Suivant</span>
                <Card item={nextPodcast} />
              </div>
            )}
            {previousPodcast && (
              <div className={styles.card__navigation__container}>
                <span className={styles.card__navigation__title}>
                  Précédent
                </span>
                <Card item={previousPodcast} />
              </div>
            )}
          </div>
        </div>
      </div>
      {displayReview && (
        <div className={styles.popup} ref={modalRef}>
          <div className={styles.popupContent}>
            <button
              className={styles.closeButton}
              onClick={() => setDisplayReview(false)}
            >
              X
            </button>
            <ModalReview reviewInfo={reviewInfo[0].review} />
          </div>
        </div>
      )}
      {displayOpenEditMovie && (
        <div className={styles.popup} ref={modalRef}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={openEditMovie}>
              X
            </button>
            <SearchMovie
              result={result}
              guid={result[0].guid || ""}
              title={result[0].title || ""}
              slug={result[0].slug || ""}
            />
          </div>
        </div>
      )}
    </>
  );
};
