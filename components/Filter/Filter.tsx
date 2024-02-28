"use client";
import { PodcastsAndMovieData } from "@/app/actions/podcast.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./filter.module.css";

type FilterProps = {
  podcastsList: PodcastsAndMovieData[];
};

export const Filter = (props: FilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchedSeason, setSearchedSeason] = useState<string>("");

  const seasonsList = Array.from(
    new Set(
      props.podcastsList
        .filter((podcast) => podcast.saison !== null)
        .map((podcast) => podcast.saison)
    )
  ).sort((a, b) => Number(a) - Number(b));

  const handleSelectSeason = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("season", term);
    } else {
      params.delete("season");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleResetSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("season");
    params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const searchedSeason = searchParams.get("season");
    if (!searchedSeason) {
      setSearchedSeason(searchParams.get("season") || "");
    } else {
      setSearchedSeason("");
    }
  }, [searchParams]);

  return (
    <span className={styles.containers}>
      <label htmlFor="saison-select">TEST</label>

      <select
        name="saison"
        id="saison-select"
        onChange={(e) => handleSelectSeason(e.target.value)}
        defaultValue={searchParams.get("season") || ""}
      >
        <option value="">Saison</option>
        <option value="">Toutes</option>
        {seasonsList.map((season, index) => (
          <option
            key={index}
            value={season}
            selected={(searchParams.get("season") ?? searchedSeason) === season}
          >
            {season}
          </option>
        ))}
      </select>

      <button className={styles.reset} onClick={handleResetSearch}>
        RESET
      </button>
    </span>
  );
};
