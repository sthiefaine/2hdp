"use server";

import {
  getPodcastAndMovieInfo,
  getPodcastReview,
} from "@/app/actions/general.action";
import { PodcastDetail } from "@/components/Podcast/detail";

import { getPreviousAndNextPodcast } from "@/app/actions/podcast.action";
import { auth } from "@/lib/auth";
import styles from "./page.module.css";

interface DetailProps {
  params: { slug: string };
}

export default async function Detail({ params: { slug } }: DetailProps) {
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
