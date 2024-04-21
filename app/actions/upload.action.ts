"use server";
import { put } from "@vercel/blob";

export const uploadPosterMovies = async (formData: FormData) => {
  const file = formData.get("image") as File;
  const name = formData.get("name") as string;
  const blob = await put("movies/" + name, file, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    access: "public",
  });

  return blob.url;
};

export const uploadPosterCategories = async (formData: FormData) => {
  const file = formData.get("image") as File;
  const name = formData.get("name") as string;
  const blob = await put("categories/" + name, file, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    access: "public",
  });

  return blob.url;
};
