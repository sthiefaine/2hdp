"use server";

import { fetchAllPodcastsListWithMovie } from "@/app/actions/podcast.action";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const items = await fetchAllPodcastsListWithMovie();

  return NextResponse.json(items);
};
