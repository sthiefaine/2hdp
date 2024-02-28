"use server";
import { Filter } from "@/components/Filter/Filter";
import { Footer } from "@/components/Footer/footer";
import { Header } from "@/components/Header/header";
import { Intro } from "@/components/Intro/Intro";
import { List } from "@/components/Lists/List";
import { SearchBar } from "@/components/SearchBar/searchbar";
import { allPodcastsListWithMovie } from "./actions/podcast.action";
import styles from "./page.module.css";

export default async function Home(props: any) {
  const podcastsList = await allPodcastsListWithMovie();
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Intro />
        <div className={styles.container__search}>
          <SearchBar />
          <Filter podcastsList={podcastsList} />
        </div>

        <List podcastsList={podcastsList} searchParams={props.searchParams} />
      </main>
      <Footer />
    </>
  );
}
