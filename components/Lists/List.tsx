"use client";
import { PodcastsAndMovieData } from "@/app/actions/podcast.action";
import { usePodcastsStore } from "@/zustand/context/podcasts";
import Card from "../Card/Card";
import styles from "./list.module.css";

type ListProps = {};

export function List({}: ListProps) {
  const search = usePodcastsStore((s) => s.search);
  const podcasts = usePodcastsStore((s) => s.podcasts);

  const podcastSearchKeyWord =
    search?.title?.trim().toLowerCase().split(" ") ?? [];
  const seasonSearch = search?.season?.trim() ?? "";

  const filteredPodcasts: PodcastsAndMovieData[] = podcasts?.filter(
    (podcast: any) => {
      if (
        seasonSearch &&
        search?.fandecoatch &&
        podcastSearchKeyWord.length > 0
      ) {
        const filteredPodcasts =
          podcast.saison === seasonSearch &&
          podcast.saison !== null &&
          podcast.review !== null &&
          podcastSearchKeyWord.every((word: string) =>
            podcast.title.toLowerCase().includes(word)
          );

        return filteredPodcasts ?? [];
      }
      if (seasonSearch && search?.fandecoatch) {
        const filteredPodcasts =
          podcast.saison === seasonSearch &&
          podcast.saison !== null &&
          podcast.review !== null;

        return filteredPodcasts ?? [];
      }
      if (seasonSearch && !search?.fandecoatch) {
        const filteredPodcasts =
          podcast.saison === seasonSearch &&
          podcast.saison !== null &&
          podcastSearchKeyWord.every((word: string) =>
            podcast.title.toLowerCase().includes(word)
          );

        return filteredPodcasts ?? [];
      }

      if (search?.fandecoatch && podcastSearchKeyWord.length === 0) {
        return podcast.review && podcast.review !== null;
      }
      if (search?.fandecoatch && podcastSearchKeyWord.length > 0) {
        return (
          podcast.review &&
          podcast.review !== null &&
          podcastSearchKeyWord.every((word: string) =>
            podcast.title.toLowerCase().includes(word)
          )
        );
      }
      return (
        podcastSearchKeyWord.every((word: string) =>
          podcast.title.toLowerCase().includes(word)
        ) ?? []
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
