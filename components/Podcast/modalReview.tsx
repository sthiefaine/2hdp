import styles from "./modalReview.module.css";

type PodcastReviewProps = {
  reviewInfo: string;
};

export const ModalReview = ({ reviewInfo }: PodcastReviewProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        L&apos;avis de <strong>FanDeCoach</strong>
      </span>
      <div
        className={`${styles.card}
        }`}
      >
        <p className={styles.text}>{reviewInfo}</p>
      </div>
    </div>
  );
};
