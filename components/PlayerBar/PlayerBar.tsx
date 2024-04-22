"use client";
import { usePlayer } from "@/context/player.context";
import { slugify } from "@/helpers";
import { CircleX, Eye, PauseIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./playerBar.module.css";

export const PlayerBar = () => {
  const { podcast, isPlaying, setIsPlaying, setPodcast } = usePlayer();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [formattedDuration, setFormattedDuration] = useState("00:00:00");
  const [durationTotal, setDurationTotal] = useState(0);
  const [formattedDurationTotal, setFormattedDurationTotal] =
    useState("00:00:00");
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: podcast.title,
        artist: podcast.artist,
        artwork: [
          {
            src: podcast.img,
            sizes: "1280x720",
            type: "image/png",
          },
        ],
      });
    }
  }, [podcast]);

  useEffect(() => {
    setFormattedDurationTotal("00:00:00");
    const audioElement = audioRef.current;
    if (!audioElement) return;
    const setAudioData = () => {
      setDurationTotal(audioElement.duration);
    };

    const updateProgress = () => {
      const currentTime = audioElement.currentTime;
      const duration = audioElement.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setDuration(currentTime);
      setProgress(progressPercentage);
    };

    if (audioElement.readyState >= 2) {
      setAudioData();
    } else {
      audioElement.addEventListener("loadedmetadata", setAudioData);
    }

    audioElement.addEventListener("timeupdate", updateProgress);

    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcast.url]);

  useEffect(() => {
    const hours = Math.floor(durationTotal / 3600);
    const minutes = Math.floor((durationTotal % 3600) / 60);
    const seconds = Math.floor(durationTotal % 60);
    setFormattedDurationTotal(
      `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
    );
  }, [durationTotal]);

  useEffect(() => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    setFormattedDuration(
      `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
    );
  }, [duration]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;
    if (!isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }, [isPlaying]);

  const padZero = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const togglePlay = () => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const clickX = event.pageX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const clickPercentage = (clickX / progressBarWidth) * 100;
    const newTime = (clickPercentage * durationTotal) / 100;
    if (!isNaN(newTime) && newTime >= 0 && audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleLeftCurrentPlaying = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    audioElement.currentTime = 0;
    audioElement.pause();
    setIsPlaying(false);
    setPodcast({
      title: "",
      artist: "",
      url: "",
      img: "",
    });
  };

  if (!podcast.url) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.player_title}>{podcast.title}</div>{" "}
      <div id="playerBar" className={styles.player_bar_container}>
        <audio
          ref={audioRef}
          src={podcast?.url}
          autoPlay={true}
          preload="metadata"
          id="audio"
        />
        <button className={styles.player_button} onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div
          ref={progressBarRef}
          className={styles.player_bar}
          style={{
            background: `linear-gradient(to right, rgb(253, 224, 71), rgb(253, 224, 71) ${progress}%, transparent ${progress}%)`,
          }}
          onClick={handleProgressBarClick}
        >
          <span className={styles.player_bar_timer}>
            {formattedDuration} / {formattedDurationTotal}
          </span>
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} title="afficher la page">
            <Link href={`/details/${slugify(podcast.title)}`}>
              <Eye />
            </Link>{" "}
          </button>
          <button
            className={styles.button}
            title="quitter la lecture"
            onClick={handleLeftCurrentPlaying}
          >
            <CircleX />
          </button>
        </div>
      </div>
    </div>
  );
};
