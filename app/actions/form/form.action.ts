"use server";

import { slugify } from "@/helpers";
import { revalidatePath } from "next/cache";
import { createMovie } from "../movies.action";
import { updatePodcast } from "../podcast.action";

export async function handleCreateMovie(
  prevState: { guid: string; isMovie: boolean; filmSelectedDetails: any },
  initialState: any,
  formData: FormData
) {
  const guid = prevState?.guid;
  const filmSelectedDetails = prevState?.filmSelectedDetails;

  // remove empty fields
  for (const [key, value] of formData.entries()) {
    if (!String(value).trim()) {
      formData.delete(key);
    }
  }

  const date = formData?.get("year") || "";
  const formReleaseTimeStamp = new Date().setFullYear(parseInt(date as string));

  const formDirectorsName = (formData.get("directorsName") as string)
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");

  const idTmdb = formData.get("idTmdb");
  const randomNumber = new Uint32Array(1);
  crypto.getRandomValues(randomNumber);

  const rawFormData = {
    isMovie: prevState.isMovie,
    idTmdb: idTmdb
      ? parseInt(formData.get("idTmdb") as string)
      : randomNumber[0],
    title: formData.get("title"),
    slug: slugify(formData.get("title") as string),
    originalTitle: filmSelectedDetails?.originalTitle,
    sagaIdTmdb: filmSelectedDetails?.sagaIdTmdb,
    releaseDate:
      new Date(formReleaseTimeStamp)?.toISOString() ??
      filmSelectedDetails?.releaseDate,
    directorsName: formDirectorsName,
  };

  return await Promise.all([
    updatePodcast(guid, rawFormData.idTmdb),
    createMovie(rawFormData),
  ])
    .then((values) => {
      revalidatePath(`/details/${filmSelectedDetails.slug}`);
      return {
        success: true,
        message: rawFormData.idTmdb,
      };
    })
    .catch((reason) => {
      return {
        success: false,
        message: reason.message,
      };
    });
}
