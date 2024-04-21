"use client";
import { PodcastsAndMovieData } from "@/app/actions/podcast.action";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type PodcastListContext = {
  podcasts: PodcastsAndMovieData[];
  setPodcastsList: (podcasts: PodcastsAndMovieData[]) => void;
  search: {
    title: string;
    season: string;
  };
  setSearch: (search: { title: string; season: string }) => void;
};

const podcastListContext = createContext<PodcastListContext>({
  podcasts: [],
  setPodcastsList: () => {},
  search: {
    title: "",
    season: "",
  },
  setSearch: () => {},
});

export const PodcastListProvider = (
  props: { value: PodcastsAndMovieData[] } & PropsWithChildren
) => {
  const [podcastsList, setPodcastsList] = useState<PodcastsAndMovieData[]>([]);
  const [search, setSearch] = useState({
    title: "",
    season: "",
  });

  const podcasts = podcastsList.length > 0 ? podcastsList : props.value;
  return (
    <podcastListContext.Provider
      value={{
        podcasts: podcasts,
        setPodcastsList,
        search,
        setSearch,
      }}
    >
      {props.children}
    </podcastListContext.Provider>
  );
};

export const usePodcastList = () => {
  const context = useContext(podcastListContext);

  if (!context) {
    throw new Error("usePodcastList must be used within a PodcastListProvider");
  }
  return context;
};
