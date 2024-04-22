"use client";
import { PodcastsAndMovieData } from "@/app/actions/podcast.action";
import { usePodcastList } from "@/context/podcastList.context";
import { useSearch } from "@/context/search.context";
import Card from "../Card/Card";
import styles from "./list.module.css";

type ListProps = {
  data?: PodcastsAndMovieData[];
};

export function List({ data }: ListProps) {
  const { search } = useSearch();
  const { podcasts } = usePodcastList();

  const podcastsList = data ?? podcasts ?? [];
  const podcastSearchKeyWord =
    search?.title?.trim().toLowerCase().split(" ") ?? [];
  const seasonSearch = search?.season?.trim() ?? "";

  const filteredPodcasts: PodcastsAndMovieData[] = podcastsList?.filter(
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
