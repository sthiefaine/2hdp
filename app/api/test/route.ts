import { getAllPicturesUrlFromPodcasts } from "@/app/actions/general.action";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const result: any = await getAllPicturesUrlFromPodcasts();

  const prefixe =
    "https://jjrruaoms5jmeqd5.public.blob.vercel-storage.com/movies/";
  const suffixe = "?download=1";

  const urls = result?.map((r: any) => r.poster + suffixe);
  return NextResponse.json(urls);
};
