"use client";
import { usePodcastList } from "@/context/podcastList.context";
import { useSearch } from "@/context/search.context";
import styles from "./filter.module.css";

type FilterProps = {};

export const Filter = (props: FilterProps) => {
  const { search, setSearch } = useSearch();
  const { podcasts } = usePodcastList();

  const seasonsList = Array.from(
    new Set(
      podcasts
        .filter((podcast) => podcast.saison !== null)
        .map((podcast) => podcast.saison)
    )
  ).sort((a, b) => Number(a) - Number(b));

  const handleTest = (term: string) => {
    setSearch({ ...search, season: term });
  };

  return (
    <span className={styles.container}>
      <span className={styles.label}>Saisons</span>
      <button
        className={`${styles.button__all} ${
          search.season ? "" : styles.button__active
        }`}
        onClick={() => handleTest("")}
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
          onClick={() => handleTest(season)}
        >
          {season}
        </button>
      ))}
    </span>
  );
};
