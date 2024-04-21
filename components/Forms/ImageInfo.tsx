"use client";

import { getPodcastInfoWithPoster } from "@/app/actions/general.action";
import Image from "next/image";
import { useEffect, useState } from "react";

import { updateMoviePoster } from "@/app/actions/form/podcast.action.ts/movies.action";
import { getPodcastImageFromOrigin } from "@/app/actions/form/podcast.action.ts/podcast.action";
import { useFormState } from "react-dom";
import styles from "./ImageInfo.module.css";

type ImageInfoProps = {
  idTmdb: number;
  slug: string;
  specialSlug?: string;
};

export default function ImageInfo({
  idTmdb,
  slug,
  specialSlug,
}: ImageInfoProps) {
  const [podcastInfo, setPodcastInfo] = useState<any>([]);
  const [movieInfo, setMovieInfo] = useState<any>([]);
  const [imageBlob, setImageBlob] = useState<Blob | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  function handleChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  }

  async function handleSelectImage(e: any, value: string) {
    e.preventDefault();
    switch (value) {
      case "base":
        setSelectedImage("base");
        break;
      case "auto":
        setSelectedImage("auto");
        break;
      case "manual":
        setSelectedImage("manual");
        break;
      default:
        movieInfo?.[0]?.poster
          ? setSelectedImage("base")
          : setSelectedImage("auto");
    }
  }

  useEffect(() => {
    const fetchPodcastInfo = async () => {
      setMovieInfo(await getPodcastInfoWithPoster(idTmdb));
    };

    fetchPodcastInfo();
  }, [idTmdb]);

  useEffect(() => {
    const fetchPodcastOriginalImg = async () => {
      setPodcastInfo(await getPodcastImageFromOrigin(specialSlug ?? slug));
    };
    fetchPodcastOriginalImg();
  }, [slug, specialSlug]);

  const updateMoviePosterWithInfo = updateMoviePoster.bind(null, {
    title: movieInfo?.[0]?.movieTitle,
    releaseDate: movieInfo?.[0]?.releaseDate,
    idTmdb,
    slug,
    selectedImage,
    tmdbPosterUrl: podcastInfo.image,
  });

  const [formState, formAction] = useFormState(updateMoviePosterWithInfo, null);

  if (!idTmdb)
    return (
      <>
        <h1>IMAGE 111</h1>
      </>
    );

  return (
    <section>
      <form action={formAction} className={styles.form}>
        <h3>ImageInfo</h3>

        <>
          <div>
            {movieInfo?.[0]?.poster && movieInfo?.[0]?.poster !== "null" && (
              <div
                className={`${styles.container} ${
                  selectedImage === "base" ? styles.selected : ""
                }`}
              >
                <Image
                  className={styles.image}
                  src={movieInfo?.[0]?.poster}
                  width={300}
                  height={200}
                  alt="Fetched"
                />
                <button
                  onClick={(e) => handleSelectImage(e, "base")}
                  className={styles.select}
                >
                  Selectionner B
                </button>
              </div>
            )}
            {podcastInfo?.image && (
              <div
                className={`${styles.container} ${
                  selectedImage === "auto" ? styles.selected : ""
                }`}
              >
                <Image
                  className={styles.image}
                  src={podcastInfo.image}
                  width={300}
                  height={200}
                  alt="Fetched"
                />
                <button
                  onClick={(e) => handleSelectImage(e, "auto")}
                  className={styles.select}
                >
                  Selectionner F
                </button>
              </div>
            )}
            {imageUrl && (
              <div
                className={`${styles.container} ${
                  selectedImage === "manual" ? styles.selected : ""
                }`}
              >
                <Image
                  className={styles.image}
                  src={imageUrl}
                  width={300}
                  height={200}
                  alt="Fetched"
                />
                <button
                  onClick={(e) => handleSelectImage(e, "manual")}
                  className={styles.select}
                >
                  Selectionner M
                </button>
              </div>
            )}
          </div>
        </>
        <>
          <label htmlFor="image">Image</label>
          <input onChange={handleChange} type="file" id="image" name="image" />
        </>

        <button type="submit">Enregistrer</button>
      </form>
    </section>
  );
}
