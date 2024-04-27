import Link from "next/link";

import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <button>
          <Link href="/">Return Home</Link>
        </button>
      </div>
    </main>
  );
}
