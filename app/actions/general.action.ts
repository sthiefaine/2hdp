"use server";
import prisma from "@/lib/prisma";
import { Movie, Podcast } from "@/models/podcast.model";

import { cache } from "react";

export const getPodcastAndMovieInfo = cache(async (slug: string) => {
  const result: Podcast & Pick<Movie, "poster"> & { movieTitle: string } =
    await prisma.$queryRaw`
  SELECT "Podcasts".*,
"Movies".poster,
  "Movies".title as "movieTitle",
  "Movies"."sagaIdTmdb",
  "Movies"."directorsName",
  "Movies"."releaseDate",
  "Movies"."idTmdb",
  "Movies"."originalTitle",
  "Movies"."isMovie"
  FROM "Podcasts"
  LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
  WHERE "Podcasts"."slug" = ${slug}
  LIMIT 1;
  `;
  return result;
});

export const getPodcastReview = cache(async (slug: string) => {
  const result: Podcast & {
    ReviewReleaseDate: Date;
    review: string;
    rating: number;
  } = await prisma.$queryRaw`
SELECT 
    "Podcasts".*,
    "UniqueReviews"."releaseDate" as "ReviewReleaseDate",
    "UniqueReviews"."review",
    "UniqueReviews"."rating",
    "UniqueReviews"."idAlloCine",
    "Movies"."slug"
FROM 
    "Podcasts"
LEFT JOIN 
    "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
LEFT JOIN (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY "slug" ORDER BY "id") AS row_number
    FROM 
        "Reviews"
) AS "UniqueReviews" ON "Podcasts"."movieIdAlloCine" = "UniqueReviews"."idAlloCine" OR "Movies"."slug" = "UniqueReviews"."slug"
WHERE 
    ("UniqueReviews".row_number = 1 OR "UniqueReviews"."id" IS NULL)
    AND "Podcasts"."slug" = ${slug}
LIMIT 1;
  `;
  return result;
});

export const getAllPicturesUrlFromPodcasts = async () => {
  const result = await prisma.$queryRaw`
  SELECT "Movies"."poster"
  FROM "Movies"
  WHERE "Movies"."poster" IS NOT NULL
  `;
  return result;
};

export const getPodcastInfo = async (idTmdb: string) => {
  const result: Podcast & {
    ReviewReleaseDate: Date;
    review: string;
    rating: number;
  } = await prisma.$queryRaw`
  SELECT "Podcasts".*,
  "Reviews"."releaseDate" as "ReviewReleaseDate",
  "Reviews"."review",
  "Reviews"."rating"
    FROM "Podcasts"
    LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
    LEFT JOIN "Reviews" ON "Podcasts"."movieIdAlloCine" = "Reviews"."idAlloCine"
    OR ("Movies"."slug" = "Reviews"."slug" AND ("Podcasts"."movieIdAlloCine" IS NULL))
    WHERE "Podcasts"."movieIdTmdb" = ${idTmdb}
    LIMIT 1;
  `;
  return result;
};

export const getPodcastInfoWithPoster = async (idTmdb: number) => {
  const result: Podcast & {
    ReviewReleaseDate: Date;
    review: string;
    rating: number;
    poster: string;
  } = await prisma.$queryRaw`
  SELECT "Podcasts".*,
  "Reviews"."releaseDate" as "ReviewReleaseDate",
  "Reviews"."review",
  "Reviews"."rating",
  "Movies"."poster",
  "Movies"."title" as "movieTitle",
  "Movies"."releaseDate" as "releaseDate"
    FROM "Podcasts"
    LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
    LEFT JOIN "Reviews" ON "Podcasts"."movieIdAlloCine" = "Reviews"."idAlloCine"
    OR ("Movies"."slug" = "Reviews"."slug" AND "Reviews"."idAlloCine" IS NULL)
    WHERE "Podcasts"."movieIdTmdb" = ${idTmdb}
    LIMIT 1;
  `;
  return result;
};
