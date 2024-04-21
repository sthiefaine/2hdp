"use server";

import prisma from "@/helpers/prisma";
import { Movie, Podcast } from "@/models/podcast.model";
import { revalidatePath } from "next/cache";

export const updatePodcast = async (guid: string, idTmdb: number) => {
  const result = await prisma.podcasts.update({
    where: {
      guid: guid,
    },
    data: {
      movieIdTmdb: idTmdb,
    },
  });

  return result;
};

export type PodcastsAndMovieData = Podcast &
  Pick<Movie, "poster"> & { movieTitle: string };

export const podcastsListWithMovie = async (search: string) => {
  const result: (Podcast & Pick<Movie, "poster"> & { movieTitle: string })[] =
    await prisma.$queryRaw`
  SELECT "Podcasts".*, "Movies".poster, "Movies".title as "movieTitle"
  FROM "Podcasts"
  LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
  WHERE "Podcasts"."title" ILIKE ${"%" + search + "%"}
  ORDER BY "Podcasts"."createdAt" DESC;
`;

  return result;
};

export const fetchAllPodcastsListWithMovie = async () => {
  const result: (Podcast & Pick<Movie, "poster"> & { movieTitle: string })[] =
    await prisma.$queryRaw`
SELECT "Podcasts".*, "Movies".poster, "Movies".title as "movieTitle", "UniqueReviews".review
FROM "Podcasts"
LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
LEFT JOIN (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY "slug" ORDER BY "id") AS row_number
    FROM "Reviews"
) AS "UniqueReviews" ON "Podcasts"."movieIdAlloCine" = "UniqueReviews"."idAlloCine" OR "Movies"."slug" = "UniqueReviews"."slug"
WHERE "UniqueReviews".row_number = 1 OR "UniqueReviews"."id" IS NULL
ORDER BY "Podcasts"."createdAt" DESC;
`;

  const resultList = result.map((item) => {
    return {
      ...item,
    };
  });
  return resultList;
};

export const getPreviousPodcast = async (slug: string) => {
  const result: Podcast = await prisma.$queryRaw`
    SELECT "Podcasts".*, "Movies".poster, "Movies".title as "movieTitle"
    FROM "Podcasts"
    LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
    WHERE "Podcasts"."createdAt" < (
      SELECT "createdAt"
      FROM "Podcasts"
      WHERE "slug" = ${slug}
      LIMIT 1
    )
    ORDER BY "Podcasts"."createdAt" DESC
    LIMIT 1;
  `;

  return result;
};

export const getNextPodcast = async (slug: string) => {
  const result: Podcast = await prisma.$queryRaw`
    SELECT "Podcasts".*, "Movies".poster, "Movies".title as "movieTitle"
    FROM "Podcasts"
    LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
    WHERE "Podcasts"."createdAt" > (
      SELECT "createdAt"
      FROM "Podcasts"
      WHERE "slug" = ${slug}
      LIMIT 1
    )
    ORDER BY "Podcasts"."createdAt" ASC
    LIMIT 1;
  `;

  return result;
};

export const getPreviousAndNextPodcast = async (slug: string) => {
  const previousPodcast = await getPreviousPodcast(slug);
  const nextPodcast = await getNextPodcast(slug);
  revalidatePath(`/details/${slug}`);
  return {
    previousPodcast,
    nextPodcast,
  };
};
export const allPodcastsList = async () => {
  const result: Podcast[] = await prisma.$queryRaw`
  SELECT "Podcasts".*,
  FROM "Podcasts"
  ORDER BY "Podcasts"."createdAt" DESC;
`;

  return result;
};
