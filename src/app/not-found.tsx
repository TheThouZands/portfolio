import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>404 - Page Not Found</h2>
      <p className={styles.message}>
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link href="/" className={styles.link}>
        Return Home
      </Link>
    </main>
  );
}
