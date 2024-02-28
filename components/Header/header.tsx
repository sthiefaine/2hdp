import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.header__logo}
          src="/2hdp-logo.svg"
          alt="2HDP+"
          width={210}
          height={56}
        />
      </Link>
      <div className={styles.header__social}>
        <Link href="/">Twitter</Link>
        <Link href="/">Facebook</Link>
        <Link href="/">Instagram</Link>
      </div>
      <div className={styles.header__links}>
        <button className={styles.header__links__button}>Apple Podcasts</button>
        <span className={styles.header__links__options}>
          <a>Spotify</a>
          <a>Deezer</a>
          <a>RSS</a>
        </span>
      </div>
    </header>
  );
}
