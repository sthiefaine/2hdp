"use server";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";

export default async function handler(req: NextRequest) {
  const cron = req.nextUrl.pathname.split("/")[3] as string;
  if (!cron) return new Response("No cron provided", { status: 400 });
  const response = await get(cron);
  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}

async function get(cron: string) {
  if (cron !== "get_podcasts")
    return new Response("Invalid cron", { status: 400 });
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
}
