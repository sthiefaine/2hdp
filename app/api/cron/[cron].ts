import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  console.log("Cron job started", req.url.split("/").pop());
  const dynamicData = await fetch(`./api/get_podcast`, { cache: "no-store" });

  return new NextResponse(JSON.stringify(dynamicData), {
    status: 200,
  });
}
