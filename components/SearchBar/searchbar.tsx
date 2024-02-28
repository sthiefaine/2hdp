"use client";
import styles from "./searchbar.module.css";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function SearchBar() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [defaultValue, setDefaultValue] = useState("");

  function handleSearch(term: string) {
    setDefaultValue(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  useEffect(() => {
    const searchedPodcast = searchParams.get("q");
    if (!searchedPodcast) {
      setDefaultValue(new URLSearchParams(searchParams).get("q") || "");
    }
  }, [searchParams]);

  return (
    <search title="search" className={styles.searchbar}>
      <label htmlFor="search" className={styles.searchbar__label}>
        Find a Podcast
      </label>
      <input
        spellCheck={false}
        onChange={(e) => handleSearch(e.target.value)}
        type="search"
        id="search"
        name="search"
        placeholder="Search for a podcast..."
        value={defaultValue}
        className={styles.searchbar__input}
      />
    </search>
  );
}
