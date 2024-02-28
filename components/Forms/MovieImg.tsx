"use client";
import { uploadPosterMovies } from "@/app/actions/upload.action";
import { FormEventHandler } from "react";

export default function MovieImg() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const url = await uploadPosterMovies(formData);

    console.log("url", url);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required />
        <button type="submit">Upload img</button>
      </form>
    </>
  );
}
