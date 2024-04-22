"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type PodcastInfo = {
  artist: string;
  title: string;
  url: string;
  img: string;
};

type PlayerContext = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setPodcast: (podcast: PodcastInfo) => void;
  podcast: PodcastInfo;
};

const playerContext = createContext<PlayerContext>({
  isPlaying: false,
  setIsPlaying: () => {},
  setPodcast: () => {},
  podcast: {
    title: "",
    artist: "",
    url: "",
    img: "",
  },
});

export const PlayerProvider = (
  props: { value?: PlayerContext } & PropsWithChildren
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [podcast, setPodcast] = useState({
    title: "",
    artist: "",
    url: "",
    img: "",
  });

  return (
    <playerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        setPodcast,
        podcast,
      }}
    >
      {props.children}
    </playerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(playerContext);

  if (!context) {
    throw new Error("Player needs to be used within a PlayerProvider");
  }
  return context;
};
