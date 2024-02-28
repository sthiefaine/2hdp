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
  "Movies"."releaseDate"
  FROM "Podcasts"
  LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
  WHERE "Podcasts"."slug" = ${slug}
  LIMIT 1;
  `;
  return result;
};
