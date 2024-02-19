"use server";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

export const GET = async (request: NextRequest) => {
  const prisma = new PrismaClient();

  // Trouver les GUID en doublon
  const duplicates: Prisma.PodcastsCreateManyInput[] = await prisma.$queryRaw`
      SELECT guid
      FROM "Podcasts"
      GROUP BY guid
      HAVING COUNT(*) > 1
    `;

  const duplicateGuids = duplicates.map((entry) => entry.guid);

  // Supprimer les enregistrements correspondants
  await prisma.podcasts.deleteMany({
    where: { guid: { in: duplicateGuids } },
  });
};
