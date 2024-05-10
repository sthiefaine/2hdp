"use client";

import { Filter } from "../Filter/Filter";
import { SearchBar } from "../SearchBar/searchbar";

import { usePodcastsStore } from "@/zustand/context/podcasts";
import styles from "./search.module.css";

type SearchProps = {};

export const Search = ({}: SearchProps) => {
  const { search, setSearch } = usePodcastsStore((s) => s);
  return (
    <>
      {" "}
      <div className={styles.container__search}>
        <div className={styles.container__options}>
          <SearchBar />
          <Filter />
        </div>

        <div className={styles.container__checkbox}>
          <input
            type="checkbox"
            id="fandecaoch"
            name="fandecaoch"
            onChange={() =>
              setSearch({ ...search, fandecaoch: !search.fandecaoch })
            }
            checked={search.fandecaoch}
          />
          <label className={styles.label} htmlFor="fandecaoch">
            Avec fandecaoch
          </label>
        </div>
      </div>
    </>
  );
};
