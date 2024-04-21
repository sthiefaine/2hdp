"use client";
import styles from "./searchbar.module.css";

import { useDebouncedCallback } from "use-debounce";

import { useSearch } from "@/context/search.context";
import { useRef, useState } from "react";

export function SearchBar() {
  const { search, setSearch } = useSearch();
  const [specialSearch, setSpecialSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearch({ ...search, title: term });
  }, 300);

  return (
    <>
      <search title="search" className={styles.searchbar}>
        <label htmlFor="search" className={styles.searchbar__label}>
          Chercher un Podcast
        </label>
        <input
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
          type="search"
          id="search"
          name="search"
          placeholder="Rechercher un podcast..."
          className={styles.searchbar__input}
          defaultValue={search.title}
        />{" "}
      </search>
    </>
  );
}
