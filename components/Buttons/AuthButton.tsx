"use client";

import { signIn, signOut } from "next-auth/react";
import styles from "./authButton.module.css";

export const LoginButton = () => {
  return (
    <button className={styles.buttonAction} onClick={() => signIn()}>
      Login
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button className={styles.buttonAction} onClick={() => signOut()}>
      Logout
    </button>
  );
};
