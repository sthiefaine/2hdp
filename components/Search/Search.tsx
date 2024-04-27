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
            id="fandecoatch"
            name="fandecoatch"
            onChange={() =>
              setSearch({ ...search, fandecoatch: !search.fandecoatch })
            }
            checked={search.fandecoatch}
          />
          <label className={styles.label} htmlFor="fandecoatch">
            Avec fandecoatch
          </label>
        </div>
      </div>
    </>
  );
};
