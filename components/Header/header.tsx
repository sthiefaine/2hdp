import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" scroll={false}>
        <Image
          className={styles.header__logo}
          src="/2hdp-logo.svg"
          alt="2HDP+"
          width={210}
          height={56}
        />
      </Link>
      <div className={styles.header__links}>
        <a
          about="Lien vers le podcast 2 heures de perdues sur Apple Podcasts"
          target="_blank"
          rel="noopener noreferrer"
          href="https://podcasts.apple.com/fr/podcast/2-heures-de-perdues/id949530802?mt=2"
        >
          <button className={styles.header__links__button}>
            Apple Podcasts
          </button>
        </a>
        <span className={styles.header__links__options}>
          <a
            about="Lien vers le podcast 2 heures de perdues sur Spotify"
            target="_blank"
            rel="noopener noreferrer"
            href="https://open.spotify.com/show/7LwfkOmKG9yf5zLKWLaXgD?fbclid=IwAR2UabBr5L0YeaELUSwcEHSt9WJAy4Me4zW57rer6kUqHxDC9SJG_Y3CZEg"
          >
            Spotify
          </a>
          <a
            about="Lien vers le podcast 2 heures de perdues sur Deezer"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.deezer.com/fr/show/57413"
          >
            Deezer
          </a>
          <a
            about="Lien vers le flux RSS du podcast 2 heures de perdues"
            target="_blank"
            rel="noopener noreferrer"
            href="https://2hdp.fr/2HDP.xml"
          >
            RSS
          </a>
        </span>
      </div>
    </header>
  );
}
