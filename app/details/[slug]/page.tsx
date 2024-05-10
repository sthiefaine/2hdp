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
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
  const slug = params.slug;

  const product: any = await getPodcastAndMovieInfo(slug);

  return {
    metadataBase: new URL(`${process.env.SITE_URL}`),
    keywords: ["2hdp", "podcast", "cinema", "film", "fandecaoch"],
    title: product?.[0]?.title,
    openGraph: {
      images: [
        {
          url: product?.[0]?.poster,
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

  if (!resultData[0]) {
    notFound();
  }

  const resultTemplate = [
    {
      id: 123,
      title: "Soyez sympa, rembobinez",
      poster: "",
      sagaIdTmdb: null,
      directorsName: ["Michel Gondry"],
      releaseDate: "2008-02-22",
      createdAt: new Date("2024-04-24T00:00:00.000Z"),
      idTmdb: null,
      saison: 1,
      episode: 1,
      originalTitle: "Be Kind Rewind",
      isMovie: true,
      podcastId: null,
      podcastTitle: "Soyez sympa, rembobinez",
      podcastDescription: "Soyez sympa, rembobinez",
      podcastSlug: "soyez-sympa-rembobinez",
    },
  ];

  const reviewInfoTemplate = [
    {
      id: 123,
      title: "Titre du podcast",
      description: "Description du podcast",
      movieIdTmdb: 456,
      movieIdAlloCine: 789,
      slug: "slug-du-podcast",
      ReviewReleaseDate: "2024-04-25T00:00:00.000Z",
      review: "Excellente critique du film.",
      rating: 4.5,
    },
  ];

  return (
    <>
      <main className={styles.main}>
        <Suspense
          fallback={
            <PodcastDetail
              result={resultTemplate}
              reviewInfo={reviewInfoTemplate}
              previousAndNext={{ previousPodcast: [], nextPodcast: [] }}
            />
          }
        >
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
