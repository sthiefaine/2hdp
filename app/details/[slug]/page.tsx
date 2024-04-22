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
import { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { params }: DetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product: any = await getPodcastAndMovieInfo(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.[0].title,
    openGraph: {
      images: [
        {
          url: product?.[0].poster,
          width: 1280,
          height: 720,
        },
      ],
    },
  };
}

export default async function Detail({ params }: DetailProps) {
  const { slug } = params;
  const result: any = await getPodcastAndMovieInfo(slug);
  const reviewInfo: any = await getPodcastReview(slug);
  const previousAndNext = await getPreviousAndNextPodcast(slug);

  return (
    <>
      <main className={styles.main}>
        <PodcastDetail
          result={result}
          reviewInfo={reviewInfo}
          previousAndNext={previousAndNext}
        />
      </main>
    </>
  );
}
