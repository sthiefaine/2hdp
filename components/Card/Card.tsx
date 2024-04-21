import { slugify } from "@/helpers";
import { shortDate } from "@/helpers/dates";
import { formatDuration } from "@/helpers/times";
import { Movie, Podcast } from "@/models/podcast.model";
import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

const Card = ({
  item,
}: {
  item: Podcast & Pick<Movie, "poster"> & { movieTitle: string };
}) => {
  return (
    <>
      <article className={styles.article}>
        <Link
          className={styles.link}
          href={{
            pathname: `/details/${slugify(item.title)}`,
          }}
        >
          <span className={styles.imageContainer}>
            {item.poster && (
              <Image
                src={item.poster}
                alt="Picture of the author"
                width={750}
                height={400}
                className={styles.image}
              />
            )}
            {!item.poster && (
              <Image
                src="/cover.jpg"
                alt="Picture of default cover"
                width={200}
                height={100}
                className={styles.image}
              />
            )}
            <span className={styles.duration}>
              {formatDuration(item.duration)}
            </span>
          </span>
          <div className={styles.informations}>
            <div className={styles.top}>
              <h2 className={styles.title}>{item.title}</h2>
              <span className={styles.options}>
                <span className={styles.saison}>
                  S{item.saison}E{item.episode}
                </span>
                <span className={styles.date}>{shortDate(item.createdAt)}</span>
              </span>
            </div>
          </div>
        </Link>
      </article>
    </>
  );
};

export default Card;
