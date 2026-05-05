import styles from "./page.module.scss";

export default function Home() {
  return (
      <div className={styles.container}>
        <h1 className={styles.main}>Building...</h1>
        <span className={styles.brand}>TZ</span>
      </div>
  );
}
