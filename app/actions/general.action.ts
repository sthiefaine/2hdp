"use server";
import prisma from "@/helpers/prisma";
import { Movie, Podcast } from "@/models/podcast.model";

export const getPodcastAndMovieInfo = async (slug: string) => {
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
};

export const getPodcastReview = async (slug: string) => {
  const result: Podcast & {
    ReviewReleaseDate: Date;
    review: string;
    rating: number;
  } = await prisma.$queryRaw`
  SELECT "Podcasts".*,
  "Reviews"."releaseDate" as "ReviewReleaseDate",
  "Reviews"."review",
  "Reviews"."rating",
  "Reviews"."idAlloCine",
  "Movies"."slug"
    FROM "Podcasts"
    LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
    LEFT JOIN "Reviews" ON (("Podcasts"."movieIdAlloCine" IS NULL AND "Movies"."slug" = "Reviews"."slug") OR
                        ("Reviews"."idAlloCine" IS NOT NULL AND "Podcasts"."movieIdAlloCine" = "Reviews"."idAlloCine"))
    WHERE "Podcasts"."slug" = ${slug}
    LIMIT 1;
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
