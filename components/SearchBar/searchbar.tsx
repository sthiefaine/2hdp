import styles from "./searchbar.module.css";

export function SearchBar() {
  return (
    <search title="movie" className={styles.searchbar}>
      <label htmlFor="movie" className={styles.searchbar__label}>
        Find a Movie
      </label>
      <input
        type="search"
        id="movie"
        name="movie"
        className={styles.searchbar__input}
      />
      <button type="submit" className={styles.searchbar__button}>
        Search
      </button>
    </search>
  );
}
