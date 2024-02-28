"use server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const prisma = new PrismaClient();
  function slugify(title: string): string {
    return title
      .normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  // Récupérer tous les podcasts de la base de données
  const podcasts = await prisma.podcasts.findMany({
    where: {
      OR: [{ slug: undefined }, { slug: "" }],
    },
  });

  // Parcourir chaque podcast
  for (const podcast of podcasts) {
    // Générer le slug à partir du titre du podcast
    const slug = slugify(podcast.title);

    // Mettre à jour le podcast avec le nouveau slug
    await prisma.podcasts.update({
      where: {
        id: podcast.id,
      },
      data: {
        slug: slug,
      },
    });
  }

  return NextResponse.json(podcasts.length);
};
