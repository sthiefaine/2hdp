"use server";
import prisma from "@/helpers/prisma";
import { Movie, Podcast } from "@/models/podcast.model";

export const updatePodcast = async (guid: string, idTmdb: number) => {
  console.log("updatePodcast", idTmdb);

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

export const allPodcastsListWithMovie = async () => {
  const result: (Podcast & Pick<Movie, "poster"> & { movieTitle: string })[] =
    await prisma.$queryRaw`
  SELECT "Podcasts".*, "Movies".poster, "Movies".title as "movieTitle"
  FROM "Podcasts"
  LEFT JOIN "Movies" ON "Podcasts"."movieIdTmdb" = "Movies"."idTmdb"
  ORDER BY "Podcasts"."createdAt" DESC;
`;

  return result;
};
