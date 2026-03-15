import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            lmao
          </h1>
          <p className={styles.subtitle}>
            lol
          </p>
          <p>psa</p>
        </div>
        <div className={styles.actions}>
          <a
            className={`${styles.actionBase} ${styles.actionPrimary}`}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            xd
          </a>
          <a
            className={`${styles.actionBase} ${styles.actionSecondary}`}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            asd
          </a>
        </div>
      </main>
    </div>
  );
}
