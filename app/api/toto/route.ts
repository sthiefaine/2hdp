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
    await page.goto(url, { waitUntil: "networkidle2" }); // Wait until there are no more than 2 network connections for at least 500 ms.

    const htmlContent = await page.content();
    await browser.close();

    return htmlContent;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const GET = async (request: NextRequest) => {
  var cardsData: Prisma.ReviewsCreateManyInput[] = [];

  const page = request.nextUrl.searchParams.get("page") ?? "1";

  const url =
    "https://www.allocine.fr/membre-Z20090323193222567627582/critiques/films/";

  await scrapePage(url + "?page=" + page).then((html) => {
    if (html !== null) {
      const doc = parse(html);

      const userName = doc.querySelector(".user-nickname")?.textContent ?? "";
      const lastPage = parseInt(
        doc.querySelector(".pagination-item-holder")?.lastChild?.textContent ??
          "0",
        10
      );

      const cards = doc.querySelectorAll(".review-card");

      cards.forEach(async (card, i) => {
        const title = card
          .querySelector(".review-card-title-bar")
          ?.textContent?.trim();
        const rating = card.querySelector(".stareval-note")?.textContent;
        const review = card.querySelector(".content-txt")?.textContent ?? "";

        const regexDate = /Publiée le (\d+ \p{L}+ \d{4})/u;
        const releaseDateHtml =
          card.querySelector(".review-card-meta-date")?.textContent ?? "";

        const releaseDate = parseFrenchDate(
          releaseDateHtml.match(regexDate)?.[1] ?? ""
        );

        const movieLink =
          card.querySelector(".link-more")?.getAttribute("href") ?? "";
        const movieId = movieLink.match(/film-(\d+)\//)?.[1] ?? "";
        const userIdAlloCine =
          movieLink.match(/\/membre-([A-Z0-9]+)\//)?.[1] ?? "";

        await fetch(
          "https://www.allocine.fr/membre-Z20090323193222567627582/critiques/film-" +
            movieId +
            "/"
        )
          .then((response) => {
            return response.text();
          })
          .then((html) => {
            const doc = parse(html);

            let completeDescrition =
              doc.querySelector(".review-card-content")?.textContent ?? "";

            cardsData.push({
              idAlloCine: parseInt(movieId, 10),
              userIdAlloCine,
              userName,
              originalTitle: title ?? "",
              slug: slugify(title ?? ""),
              rating: rating ? parseFloat(rating.replace(",", ".")) : 0,
              review: completeDescrition.trim(),
              releaseDate,
              completed: false,
            });
          });

        await prisma.reviews.createMany({
          data: cardsData,
          skipDuplicates: true,
        });
      });
    } else {
      return NextResponse.json("Failed to scrape the page.");
    }
  });

  return NextResponse.json({ ...cardsData });
};
