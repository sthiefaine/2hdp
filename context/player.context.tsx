"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type PlayerContext = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setPodcast: (podcast: { title: string; url: string }) => void;
  podcast: {
    title: string;
    url: string;
  };
};

const playerContext = createContext<PlayerContext>({
  isPlaying: false,
  setIsPlaying: () => {},
  setPodcast: () => {},
  podcast: {
    title: "",
    url: "",
  },
});

export const PlayerProvider = (
  props: { value?: PlayerContext } & PropsWithChildren
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [podcast, setPodcast] = useState({
    title: "",
    url: "",
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
