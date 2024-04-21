"use client";
/* eslint-disable react/no-unescaped-entities */
import styles from "./intro.module.css";

import Image from "next/image";

const typedMoviesData: Partial<RSS> = {};

function addDurations(durations: any[]): string {
  const totalSeconds = durations.reduce((acc, duration) => {
    const parts = duration.split(":").map(Number);

    if (parts.length === 1) {
      // Si la durée est seulement en minutes
      return acc + parts[0] * 60;
    } else if (parts.length === 2) {
      // Si la durée est en minutes et secondes
      return acc + parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      // Si la durée est au format "hh:mm:ss"
      return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    return acc;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const hoursRest = hours % 24;
    return `
    ${days} jours
    ${hoursRest} Heures
  `;
  } else {
    return `
    ${hours}h
    ${String(minutes).padStart(2, "0")} Minutes
  `;
  }
}

function durationExpended(duration: string): string {
  const parts = duration.split(":").map(Number);

  if (parts.length === 1) {
  } else if (parts.length === 2) {
  } else if (parts.length === 3) {
  }
  return "";
}

function getMoviesNumber(): number {
  return typedMoviesData?.rss?.channel.item.length || 0;
}

function getTotalsMoviesDuration(): number {
  let total = 0 as any;
  total = addDurations([
    ...(typedMoviesData?.rss?.channel.item.map((item) =>
      item?.duration.toString()
    ) ?? []),
  ]);
  return total;
}

export function Intro() {
  return (
    <section className={styles.main__section}>
      <article className={styles.main__article}>
        <Image src="/2hdp-hero-logo.svg" alt="2HDP+" width={210} height={56} />
        <a
          href="https://fr.wiktionary.org/wiki/su%C3%A9d%C3%A9"
          about="définition de suédé"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.letters}>
            {" "}
            <span className={`${styles.letter} ${styles.letter_s}`}>S</span>
            <span className={`${styles.letter} ${styles.letter_u}`}>U</span>
            <span className={`${styles.letter} ${styles.letter_e}`}>É</span>
            <span className={`${styles.letter} ${styles.letter_d}`}>D</span>
            <span className={`${styles.letter} ${styles.letter_e2}`}>É</span>
          </div>
        </a>
      </article>
      <div className={styles.text_container}>
        <p className={styles.text}>
          Le Site officiel c'est{" "}
          <a
            href="https://2hdp.fr"
            about="lien vers le site officiel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong className={styles.text_strong}> par ici !</strong>
          </a>
        </p>
      </div>
    </section>
  );
}
