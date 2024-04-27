// src/providers/counter-store-provider.tsx
"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

import {
  createPodcastsStore,
  type PodcastsStore,
} from "@/zustand/store/podcasts";

export const PodcastsStoreContext =
  createContext<StoreApi<PodcastsStore> | null>(null);

export interface PodcastsStoreProviderProps {
  children: ReactNode;
  podcasts: PodcastsStore["podcasts"];
}

export const PodcastsStoreProvider = ({
  children,
  podcasts,
}: PodcastsStoreProviderProps) => {
  const storeRef = useRef<StoreApi<PodcastsStore>>();
  if (!storeRef.current) {
    storeRef.current = createPodcastsStore({
      podcasts: podcasts,
      search: { title: "", season: "", fandecoatch: false },
    });
  }

  return (
    <PodcastsStoreContext.Provider value={storeRef.current}>
      {children}
    </PodcastsStoreContext.Provider>
  );
};

export const usePodcastsStore = <T,>(
  selector: (store: PodcastsStore) => T
): T => {
  const podcastsStoreContext = useContext(PodcastsStoreContext);

  if (!podcastsStoreContext) {
    throw new Error(
      `usePodcastsrStore must be use within PodcastsrStoreProvider`
    );
  }

  return useStore(podcastsStoreContext, selector);
};
