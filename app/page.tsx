import styles from "./page.module.css";
import { Header } from "@/components/Header/header";
import { Footer } from "@/components/Footer/footer";
import { SearchBar } from "@/components/SearchBar/searchbar";
import { Intro } from "@/components/Intro/Intro";
import { List } from "@/components/Lists/List";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Intro />
        <SearchBar />
        <List />
      </main>
      <Footer />
    </>
  );
}
