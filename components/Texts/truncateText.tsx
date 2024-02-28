"use client";
import { useState, useEffect, useRef } from "react";
import styles from "../Card/card.module.css";
interface TruncatedTitleProps {
  text: string;
}

const TruncatedTitle = ({ text }: TruncatedTitleProps) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      setIsTruncated(
        titleRef.current.scrollWidth > titleRef.current.clientWidth
      );
    }
  }, [text]);

  return (
    <h2
      ref={titleRef}
      className={`${styles.title}`}
      style={{
        transform: isTruncated ? "translateX(-100%)" : "translateX(0)",
        overflow: isTruncated ? "initial" : "hidden",
      }}
    >
      {text}
    </h2>
  );
};

export default TruncatedTitle;
