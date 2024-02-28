"use server";
import styles from "./page.module.css";
import { Header } from "@/components/Header/header";
import { Footer } from "@/components/Footer/footer";
import { getPodcastAndMovieInfo } from "@/app/actions/general.action";
import { PodcastDetail } from "@/components/Podcast/detail";

interface DetailProps {
  params: { slug: string };
}

export default async function Detail({ params: { slug } }: DetailProps) {
  const result: any = await getPodcastAndMovieInfo(slug);

  if (!slug) {
    return <>ERROR</>;
  }

  return (
    <>
      <Header />
      <>
        <main className={styles.main}>
          <PodcastDetail result={result} />
        </main>
      </>
      <Footer />
    </>
  );
}
