import { Intro } from "@/components/Intro/Intro";
import { List } from "@/components/Lists/List";
import { fetchAllPodcastsListWithMovie } from "./actions/podcast.action";

import { Search } from "@/components/Search/Search";
import { MainProvider } from "@/context";
import styles from "./page.module.css";

export const getData = async () => {
  const item = await fetchAllPodcastsListWithMovie();
  return item;
};

export default async function Home(props: any) {
  const podcastsList = await getData();

  return (
    <MainProvider podcastList={podcastsList}>
      <main className={styles.main}>
        <Intro />
        <Search />
        <List />
      </main>
    </MainProvider>
  );
}
