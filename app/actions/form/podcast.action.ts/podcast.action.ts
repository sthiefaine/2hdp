"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import parse from "node-html-parser";

export const getPodcastInfoFromOrigin = async (slug: string) => {
  try {
    const response = await fetch("https://www.2hdp.fr/episode/" + slug);
    const html = await response.text();
    const doc = parse(html);
    const description = doc
      .querySelector(".max-w-3xl div:last-child")
      ?.textContent.trim();
    const participants = doc
      .querySelector(".text-white.mt-6.text-lg")
      ?.childNodes[2]?.textContent?.trim();

    const participantsClean = participants
      ?.replace(/^avec\s*/i, "")
      ?.replace(/\n\s*/g, " ")
      .trim();
    const participantsArray = participantsClean
      ?.split(/,| et/)
      .map((participant) => participant.trim())
      .filter((participant) => participant !== "");

    return { description, participantsArray };
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

export const getPodcastImageFromOrigin = async (slug: string) => {
  try {
    const response = await fetch("https://www.2hdp.fr/episode/" + slug);
    const html = await response.text();
    const doc = parse(html);
    const image = doc
      .querySelector(".object-cover.object-top.pointer-events-none")
      ?.getAttribute("src");

    return { image };
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

export const updatePodcastInfo = async (
  prevState: { podcastInfo: any; guid: string },
  initialState: any,
  formData: FormData
) => {
  const guid = prevState?.guid;

  const podcastInfo = prevState?.podcastInfo[0];

  delete podcastInfo?.id;
  delete podcastInfo?.ReviewReleaseDate;
  delete podcastInfo?.review;
  delete podcastInfo?.rating;

  // remove empty fields
  for (const [key, value] of formData.entries()) {
    if (!String(value).trim()) {
      formData.delete(key);
    }
  }

  const rawFormData = {
    ...podcastInfo,
    specialSlug: formData.get("specialSlug"),
    title: formData.get("title"),
    descriptionHtml: formData.get("description"),
    speakers: (formData.get("speakers") as string)?.split(", "),
    isEdited: true,
    movieIdAlloCine: formData?.get("idAllocine")
      ? parseInt(formData?.get("idAllocine") as string)
      : null,
  };

  const result = await prisma.podcasts.update({
    where: {
      guid: guid,
    },
    data: {
      ...rawFormData,
    },
  });

  if (result) {
    revalidatePath(`/details/${podcastInfo.slug}`);
    return {
      success: true,
      message: "Podcast updated",
    };
  }

  return {
    success: false,
    message: "Podcast not updated",
  };
};
