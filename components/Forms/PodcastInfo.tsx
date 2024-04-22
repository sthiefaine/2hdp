"use client";

import {
  getPodcastInfoFromOrigin,
  updatePodcastInfo,
} from "@/app/actions/form/podcast.action.ts/podcast.action";
import { getPodcastInfo } from "@/app/actions/general.action";
import { useEffect, useState } from "react";

import { useFormState } from "react-dom";
import styles from "./searchMovie.module.css";

type PodcastInfoProps = {
  idTmdb: string;
  slug: string;
  guid: string;
  setStep: (step: number) => void;
};

export default function PodcastInfo({
  idTmdb,
  slug,
  guid,
  setStep,
}: PodcastInfoProps) {
  const [podcastInfo, setPodcastInfo] = useState<any>([]);
  const [podcastParticipants, setPodcastParticipants] = useState<any>("");
  const [podcastDescription, setPodcastDescription] = useState<any>("");
  const [specialSlug, setSpecialSlug] = useState<any>("");

  const updatePodcastInfoWithGuid = updatePodcastInfo.bind(null, {
    podcastInfo,
    guid,
  });
  const [formState, formAction] = useFormState(updatePodcastInfoWithGuid, null);

  useEffect(() => {
    const fetchPodcastInfo = async () => {
      setPodcastInfo(await getPodcastInfo(idTmdb));
    };

    fetchPodcastInfo();
  }, [idTmdb]);

  useEffect(() => {
    if (podcastInfo.length !== 1) return;
    if (podcastInfo[0]?.speakers)
      setPodcastParticipants(podcastInfo[0]?.speakers.toString().split(","));
    if (podcastInfo[0]?.descriptionHtml)
      setPodcastDescription(podcastInfo[0]?.descriptionHtml);
  }, [podcastInfo]);

  useEffect(() => {
    if (podcastInfo.length !== 1) return;
    if (podcastInfo[0].isEdited) return;
    (async () => {
      const podcastInfoFromOrigin = await getPodcastInfoFromOrigin(slug);
      if (podcastInfoFromOrigin) {
        setPodcastParticipants(
          podcastInfoFromOrigin.participantsArray?.join(", ")
        );
        setPodcastDescription(podcastInfoFromOrigin.description);
      }
    })();
  }, [slug, podcastInfo]);

  const handleRecatch = async (e: any) => {
    e.preventDefault();
    const podcastInfoFromOrigin = await getPodcastInfoFromOrigin(
      specialSlug.trim() ?? slug
    );
    if (podcastInfoFromOrigin) {
      setPodcastParticipants(
        podcastInfoFromOrigin.participantsArray?.join(", ")
      );
      setPodcastDescription(podcastInfoFromOrigin.description);
    }
  };

  useEffect(() => {
    if ((formState as unknown as { success?: boolean })?.success) {
      setStep(4);
    }
  }, [formState, setStep]);

  useEffect(() => {
    if (podcastInfo.length !== 1) return;
    if (podcastInfo[0]?.specialSlug) {
      setSpecialSlug(podcastInfo[0]?.specialSlug);
    }
  }, [podcastInfo]);

  if (!idTmdb)
    return (
      <>
        <h1>Podcast</h1>
      </>
    );

  return (
    <div className={styles.section}>
      <span className={styles.subtitle}>Information du Podcast</span>
      <form className={styles.form} action={formAction}>
        <div>
          <input
            className={styles.input}
            type="text"
            id="specialSlug"
            name="specialSlug"
            placeholder="slug special"
            value={specialSlug}
            onChange={(e) => {
              setSpecialSlug(e.target.value);
            }}
          />
          <button className={styles.button} onClick={(e) => handleRecatch(e)}>
            Recherche auto
          </button>
        </div>

        <>
          <label htmlFor="title">Titre</label>
          <input
            className={styles.input}
            type="text"
            id="title"
            name="title"
            defaultValue={podcastInfo?.[0]?.title}
          />
          <label htmlFor="speakers">Annimateurs</label>
          <input
            className={styles.input}
            required
            type="text"
            id="speakers"
            name="speakers"
            value={
              podcastParticipants?.length !== 0 ? podcastParticipants : "2hdp"
            }
            onChange={(e) => {
              setPodcastParticipants(e.target.value);
            }}
          />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            className={styles.input}
            id="description"
            name="description"
            rows={4}
            cols={50}
            defaultValue={podcastInfo?.[0]?.descriptionHtml}
            value={podcastDescription}
            onChange={(e) => {
              setPodcastDescription(e.target.value);
            }}
          />
          <br />
        </>
        <label htmlFor="idAllocine">ID AlloCiné</label>
        <input
          className={styles.input}
          type="number"
          name="idAllocine"
          placeholder="00000"
          defaultValue={podcastInfo?.[0]?.movieIdAlloCine}
        />
        <label htmlFor="comentaire">Commentaire FanDeCoach</label>
        <br />
        {podcastInfo?.[0]?.review && (
          <>
            <button className={styles.button}>Afficher</button>
            <button className={styles.button}>Masquer</button>
            <textarea
              id="comentaire"
              name="comentaire"
              rows={10}
              cols={50}
              defaultValue={podcastInfo[0].review}
            ></textarea>
          </>
        )}
        {!podcastInfo?.[0]?.review && (
          <button className={styles.button}>Rechercher</button>
        )}
        <br />
        <button className={styles.button} type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
