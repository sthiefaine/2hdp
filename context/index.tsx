"use client";

import { PodcastListProvider } from "./podcastList.context";

type MainProviderProps = {
  children: React.ReactNode;
  podcastList?: any;
};

export const MainProvider = (props: MainProviderProps) => {
  return (
    <PodcastListProvider value={props.podcastList}>
      {props.children}
    </PodcastListProvider>
  );
};
