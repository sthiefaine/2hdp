"use server";

import {
  getPodcastAndMovieInfo,
  getPodcastReview,
} from "@/app/actions/general.action";
import { PodcastDetail } from "@/components/Podcast/detail";

import {
  fetchAllPodcastsListWithMovie,
  getPreviousAndNextPodcast,
} from "@/app/actions/podcast.action";
import { auth } from "@/lib/auth";
import styles from "./page.module.css";

interface DetailProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const items = await fetchAllPodcastsListWithMovie();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Detail({ params }: DetailProps) {
  const { slug } = params;
  const result: any = await getPodcastAndMovieInfo(slug);
  const reviewInfo: any = await getPodcastReview(slug);
  const previousAndNext = await getPreviousAndNextPodcast(slug);
  const session = await auth();

  return (
    <>
      <main className={styles.main}>
        <PodcastDetail
          session={session}
          result={result}
          reviewInfo={reviewInfo}
          previousAndNext={previousAndNext}
        />
      </main>
    </>
  );
}
