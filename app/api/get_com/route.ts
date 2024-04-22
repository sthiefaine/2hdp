"use server";
import { slugify } from "@/helpers";
import { parseFrenchDate } from "@/helpers/dates";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "node-html-parser";
import puppeteer from "puppeteer";

async function scrapePage(url: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const htmlContent = await page.content();
    await browser.close();

    return htmlContent;
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

export const GET = async (request: NextRequest) => {
  const cardsData: Prisma.ReviewsCreateManyInput[] = [];
  const page = request.nextUrl.searchParams.get("page") ?? "1";
  const url =
    "https://www.allocine.fr/membre-Z20090323193222567627582/critiques/films/";

  try {
    const html = await scrapePage(url + "?page=" + page);
    if (html !== null) {
      const doc = parse(html);
      const userName = doc.querySelector(".user-nickname")?.textContent ?? "";
      const lastPage = parseInt(
        doc.querySelector(".pagination-item-holder")?.lastChild?.textContent ??
          "0",
        10
      );
      const cards = doc.querySelectorAll(".review-card");

      await Promise.all(
        cards.map(async (card, i) => {
          const title = card
            .querySelector(".review-card-title-bar")
            ?.textContent?.trim();
          const rating = card.querySelector(".stareval-note")?.textContent;
          const regexDate = /Publiée le (\d+ \p{L}+ \d{4})/u;
          const releaseDateHtml =
            card.querySelector(".review-card-meta-date")?.textContent ?? "";
          const releaseDate = parseFrenchDate(
            releaseDateHtml.match(regexDate)?.[1] ?? ""
          );

          // /film/fichefilm_gen_cfilm=201381.html
          const movieLink =
            card.querySelector(".review-card-title a")?.getAttribute("href") ??
            "";
          const movieId =
            movieLink.match(/film\/fichefilm_gen_cfilm=(\d+)\.html/)?.[1] ?? "";

          const userIdLink = "Z20090323193222567627582";

          const response = await fetch(
            "https://www.allocine.fr/membre-Z20090323193222567627582/critiques/film-" +
              movieId +
              "/"
          );
          const html = await response.text();
          const movieDoc = parse(html);
          let completeDescription =
            movieDoc.querySelector(".review-card-content")?.textContent ?? "";

          if (movieLink) {
            cardsData.push({
              idAlloCine: parseInt(movieId, 10),
              userIdAlloCine: userIdLink,
              userName,
              originalTitle: title ?? "",
              slug: slugify(title ?? ""),
              rating: rating ? parseFloat(rating.replace(",", ".")) : 0,
              review: completeDescription.trim(),
              releaseDate,
              completed: false,
            });
          }
        })
      );

      await prisma.reviews.createMany({
        data: cardsData,
        skipDuplicates: true,
      });

      return NextResponse.json({ ...cardsData });
    } else {
      return NextResponse.json("Impossible de scraper la page.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      "Une erreur est survenue lors du traitement de la requête."
    );
  }
};
