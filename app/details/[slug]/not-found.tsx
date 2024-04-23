import Link from "next/link";

import styles from "./page.module.css";
export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2>Not Found </h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </main>
  );
}
