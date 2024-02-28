"use client";
import { PodcastsAndMovieData } from "@/app/actions/podcast.action";
import Card from "../Card/Card";
import styles from "./list.module.css";

export function List({
  podcastsList,
  searchParams,
}: {
  searchParams: { q: string; season: string };
  podcastsList: any;
}) {
  const podcastSearch = searchParams?.q?.trim() ?? "";
  const seasonSearch = searchParams?.season?.trim() ?? "";

  console.log("saison search", seasonSearch);
  const filteredPodcasts: PodcastsAndMovieData[] = podcastsList?.filter(
    (podcast: any) => {
      if (seasonSearch) {
        const filteredPodcasts =
          podcast.saison === seasonSearch &&
          podcast.saison !== null &&
          podcast.title.toLowerCase().includes(podcastSearch.toLowerCase());

        console.log("filteredPodcasts", filteredPodcasts);
        return filteredPodcasts ?? [];
      }
      return (
        podcast.title.toLowerCase().includes(podcastSearch.toLowerCase()) ?? []
      );
    }
  );

  return (
    <section className={styles.section}>
      {filteredPodcasts?.map((item, index) => (
        <Card key={item.title + index} item={item} />
      ))}
    </section>
  );
}
