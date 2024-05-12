"use server";
import { Intro } from "@/components/Intro/Intro";
import { List } from "@/components/Lists/List";
import { fetchAllPodcastsListWithMovie } from "./actions/podcast.action";

import { Search } from "@/components/Search/Search";

import { PodcastsStoreProvider } from "@/zustand/context/podcasts";
import styles from "./page.module.css";

const getData = async () => {
  const item = await fetchAllPodcastsListWithMovie();
  return item;
};

export default async function Home() {
  const podcastsList = await getData();

  return (
    <PodcastsStoreProvider podcasts={podcastsList}>
      <main className={styles.main}>
        <Intro />
        <Search />
        <List />
      </main>
    </PodcastsStoreProvider>
  );
}
