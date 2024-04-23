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
import { Suspense } from "react";
import styles from "./page.module.css";

interface DetailProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const items = await fetchAllPodcastsListWithMovie();
  console.log("generateStaticParams DETAIL", items[0].slug);
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
    metadataBase: new URL(`${process.env.SITE_URL}`),
    keywords: ["2hdp", "podcast", "cinema", "film", "fandecoatch"],
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
  const resultData: any = await getPodcastAndMovieInfo(slug);
  const reviewInfoData: any = await getPodcastReview(slug);
  const previousAndNextData = await getPreviousAndNextPodcast(slug);

  const [result, reviewInfo, previousAndNext] = await Promise.all([
    resultData,
    reviewInfoData,
    previousAndNextData,
  ]);

  return (
    <>
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <PodcastDetail
            result={result}
            reviewInfo={reviewInfo}
            previousAndNext={previousAndNext}
          />
        </Suspense>
      </main>
    </>
  );
}
