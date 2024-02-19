import { Podcast } from "@/models/podcast.model";
import styles from "../Lists/list.module.css";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
const Card = async ({ title, description }: Partial<Podcast>) => {
  const prisma = new PrismaClient();

  const podcastsList = await prisma.podcasts.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {podcastsList?.map((item, index) => (
        <article key={item.title + index} className={styles.article}>
          <Image
            src="/cover.jpg"
            alt="Picture of the author"
            width={200}
            height={100}
            className={styles.image}
          />
          <span className={styles.duration}>{item.duration}</span>
          <div className={styles.informations}>
            <div className={styles.top}>
              <h2 className={styles.title}>{item.title}</h2>
              <span className={styles.options}>
                <span className={styles.date}>
                  {item.createdAt.toDateString()}
                </span>
                <span className={styles.saison}>{item.saison}</span>
              </span>
            </div>
            <p className={styles.description}>Description</p>
          </div>
        </article>
      ))}
    </>
  );
};

export default Card;
