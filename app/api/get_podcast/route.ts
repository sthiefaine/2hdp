"use server";
import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";
import { Prisma, PrismaClient } from "@prisma/client";

export const GET = async (request: NextRequest) => {
  const prisma = new PrismaClient();
  const parser = new Parser();
  const feedData = await parser.parseURL("https://feed.ausha.co/Loa7srdWGm1b");

  function slugify(title: string): string {
    return title
      .normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const podcastsList: Prisma.PodcastsCreateManyInput[] = feedData.items.map(
    (item: any) => ({
      guid: item.guid,
      title: item.title,
      author: item.itunes.author,
      audio: item.enclosure.url,
      slug: slugify(item.title),
      duration: item.itunes.duration,
      saison: item.itunes?.season,
      episode: item.itunes?.episode,
      description: item.contentSnippet,
      createdAt: new Date(item.pubDate),
    })
  );

  const json = {
    podcastsList,
  };

  await prisma.podcasts.createMany({
    data: podcastsList,
    skipDuplicates: true,
  });

  return NextResponse.json(json);
};
