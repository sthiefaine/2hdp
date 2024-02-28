"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "../../app/details/[slug]/page.module.css";
import SearchMovie from "../Forms/SearchMovie";
import PodcastPlayer from "./player";

export type PodcastPlayerProps = {
  result: Array<any>;
};

export const PodcastDetail = ({ result }: PodcastPlayerProps) => {
  const [displayAdmin, setDisplayAdmin] = useState(false);

  const handleDisplayAdmin = () => {
    setDisplayAdmin(!displayAdmin);
  };
  return (
    <>
      <div className={styles.container}>
        <button className={styles.adminButton} onClick={handleDisplayAdmin}>
          ADMIN
        </button>
        <Image
          className={styles.landingImage}
          src={result[0].poster || "/cover.jpg"}
          alt="Poster of the movie"
          style={{ objectFit: "cover" }}
          fill={true}
        />{" "}
        <div className={styles.child}>
          <div className={styles.informations}>
            <h1 className={styles.title}>{result[0].movieTitle}</h1>
            <span className={styles.releaseDate}>
              {"(" + new Date(result[0].releaseDate).getFullYear() + ")"}{" "}
            </span>
            <div className={styles.subtitle}>
              <span className={styles.directors}>
                de {result[0].directorsName?.join(", ")}
              </span>
            </div>
            <div className={styles.text}>
              <span className={styles.saison}>S{result[0].saison}</span>
              <span className={styles.episode}>E{result[0].episode}</span>
              <span className={styles.description}>
                {result[0].description}
              </span>
            </div>

            <div className={styles.podcastPlayer}>
              <PodcastPlayer src={result[0].audio} />
            </div>

            <div>
              <span className={styles.publishDate}>
                {" "}
                Publié le{" "}
                {result[0].createdAt.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {displayAdmin && (
        <div className={styles.rightPanel}>
          <SearchMovie
            guid={result[0].guid || ""}
            title={result[0].title || ""}
          />
        </div>
      )}
    </>
  );
};
