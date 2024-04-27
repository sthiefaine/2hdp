import { create } from "zustand";

type PodcastInfo = {
  artist: string;
  title: string;
  url: string;
  img: string;
};

type PlayerState = {
  isPlaying: boolean;
  launchPlay: boolean;
  podcast: PodcastInfo;
};

export type PlayerActions = {
  setIsPlaying: (isPlaying: boolean) => void;
  setLaunchPlay: (lauchPlay: boolean) => void;
  setPodcast: (podcast: PodcastInfo) => void;
};

export type PlayerStore = PlayerState & PlayerActions;

export const defaultInitState: PlayerState = {
  isPlaying: false,
  launchPlay: false,
  podcast: {
    title: "",
    artist: "",
    url: "",
    img: "",
  },
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  ...defaultInitState,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setPodcast: (podcast: PodcastInfo) => set({ podcast }),
  setLaunchPlay: (launchPlay: boolean) => set({ launchPlay }),
}));
