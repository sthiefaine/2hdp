import Card from "../Card/Card";
import styles from "./list.module.css";
import Image from "next/image";

export function List() {
  return (
    <section className={styles.section}>
      <Card />
    </section>
  );
}
