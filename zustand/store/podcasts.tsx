import { PodcastsAndMovieData } from "@/app/actions/podcast.action";
import { createStore } from "zustand/vanilla";

export type PodcastsState = {
  podcasts: PodcastsAndMovieData[];
  search: {
    title: string;
    season: string;
    fandecaoch: boolean;
  };
};

export type PodcastsActions = {
  setSearch: (search: {
    title: string;
    season: string;
    fandecaoch: boolean;
  }) => void;
};

export type PodcastsStore = PodcastsState & PodcastsActions;

export const defaultInitState: PodcastsState = {
  podcasts: [],
  search: {
    title: "",
    season: "",
    fandecaoch: false,
  },
};

export const createPodcastsStore = (
  initState: PodcastsState = defaultInitState
) => {
  return createStore<PodcastsStore>()((set) => ({
    ...initState,
    setSearch: (search) => set({ search }),
  }));
};
