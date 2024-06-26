import { create } from "zustand";
import { persist } from "zustand/middleware";

type PodcastInfo = {
  artist: string;
  title: string;
  url: string;
  img: string;
};

type PlayerState = {
  isPlaying: boolean;
  launchPlay: boolean;
  currentPlayTime: number;
  podcast: PodcastInfo;
  totalDuration: number;
};

export type PlayerActions = {
  setIsPlaying: (isPlaying: boolean) => void;
  setLaunchPlay: (lauchPlay: boolean) => void;
  setPodcast: (podcast: PodcastInfo) => void;
  setCurrentPlayTime: (currentPlayTime: number) => void;
  setTotalDuration: (totalDuration: number) => void;
  setClearPlayerStore: () => void;
};

export type PlayerStore = PlayerState & PlayerActions;

export const defaultInitState: PlayerState = {
  isPlaying: false,
  launchPlay: false,
  currentPlayTime: 0,
  totalDuration: 0,
  podcast: {
    title: "",
    artist: "",
    url: "",
    img: "",
  },
};

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
      setPodcast: (podcast: PodcastInfo) => set({ podcast }),
      setLaunchPlay: (launchPlay: boolean) => set({ launchPlay }),
      setCurrentPlayTime: (currentPlayTime: number) => set({ currentPlayTime }),
      setTotalDuration: (totalDuration: number) => set({ totalDuration }),
      setClearPlayerStore: () => set(defaultInitState),
    }),
    {
      name: "player",
      partialize: (state: PlayerStore) => ({
        podcast: { ...state.podcast },
        currentPlayTime: state.currentPlayTime,
        totalDuration: state.totalDuration,
      }),
    }
  )
);
