"use client";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "../Buttons/AuthButton";
import styles from "./footer.module.css";

import Image from "next/image";

export function Footer() {
  const { data: session, status } = useSession();
  const loggedIn = status === "authenticated" && session.user?.name;
  return (
    <footer className={styles.footer}>
      Données fournies par{" "}
      <div>
        <a
          href="https://twitter.com/2hdp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image alt="2HDP" src="/2hdp-logo.svg" height={30} width={100} />
        </a>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image alt="TMDB" src="/tmdb_icon.svg" height={30} width={100} />
        </a>
        <a
          href="https://www.allocine.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            alt="Allociné"
            src="/allocine_icon.svg"
            height={30}
            width={100}
          />
        </a>
        <p>
          {!loggedIn && <LoginButton />}

          {loggedIn && (
            <>
              <span>
                <LogoutButton />
              </span>
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
