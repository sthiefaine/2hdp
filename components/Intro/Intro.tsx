/* eslint-disable react/no-unescaped-entities */
import styles from "./intro.module.css";

const typedMoviesData: Partial<RSS> = {};

function addDurations(durations: any[]): string {
  const totalSeconds = durations.reduce((acc, duration) => {
    const parts = duration.split(":").map(Number);

    if (parts.length === 1) {
      // Si la durée est seulement en minutes
      return acc + parts[0] * 60;
    } else if (parts.length === 2) {
      // Si la durée est en minutes et secondes
      return acc + parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      // Si la durée est au format "hh:mm:ss"
      return acc + parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    return acc;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const hoursRest = hours % 24;
    return `
    ${days} jours
    ${hoursRest} Heures
  `;
  } else {
    return `
    ${hours}h
    ${String(minutes).padStart(2, "0")} Minutes
  `;
  }
}

function durationExpended(duration: string): string {
  const parts = duration.split(":").map(Number);

  if (parts.length === 1) {
  } else if (parts.length === 2) {
  } else if (parts.length === 3) {
  }
  return "";
}

function getMoviesNumber(): number {
  return typedMoviesData?.rss?.channel.item.length || 0;
}

function getTotalsMoviesDuration(): number {
  let total = 0 as any;
  total = addDurations([
    ...(typedMoviesData?.rss?.channel.item.map((item) =>
      item?.duration.toString()
    ) ?? []),
  ]);
  return total;
}

export function Intro() {
  return (
    <section className={styles.main__section}>
      <article className={styles.main__article}>
        <p className={styles.main__text}>
          2 Heures de Perdues, c’est une bande de tocardos avec des micros qui
          s'enfilent chaque semaine des films de l'enfer juste pour te faire
          patienter dans les transports ou te faire marrer sur ton velo
          elliptique que t'assumes pas. 2HDP, c'est aussi la culture de l'à peu
          près et de l'information potentiellement fausse. Alors, fais nous
          plaisir, monte pas dans les tours et écoute !
        </p>
        <p>
          Un total de <strong>{getMoviesNumber()} films</strong> soit{" "}
          <strong>{getTotalsMoviesDuration()} de Perdues</strong>
        </p>
      </article>
    </section>
  );
}
