"use client";
import { usePodcastsStore } from "@/zustand/context/podcasts";
import styles from "./filter.module.css";

type FilterProps = {};

export const Filter = (props: FilterProps) => {
  const { podcasts, search, setSearch } = usePodcastsStore((s) => s);

  const seasonsList = Array.from(
    new Set(
      podcasts
        .filter((podcast) => podcast.saison !== null)
        .map((podcast) => podcast.saison)
    )
  ).sort((a, b) => Number(a) - Number(b));

  const handleSeason = (term: string) => {
    setSearch({ ...search, season: term });
  };

  return (
    <span className={styles.container}>
      <span className={styles.label}>Saisons</span>
      <button
        className={`${styles.button__all} ${
          search.season ? "" : styles.button__active
        }`}
        onClick={() => handleSeason("")}
      >
        Toutes
      </button>
      {seasonsList.map((season, index) => (
        <button
          className={`${styles.button} ${
            search.season === season || search.season === ""
              ? styles.button__active
              : ""
          }`}
          key={index}
          onClick={() => handleSeason(season)}
        >
          {season}
        </button>
      ))}
    </span>
  );
};
