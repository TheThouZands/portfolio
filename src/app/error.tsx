"use client"; // Error components must be Client Components

import { useEffect } from "react";
import styles from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Something went wrong!</h2>
      <p className={styles.message}>{error.message}</p>
      <button onClick={() => reset()} className={styles.action}>
        Try again
      </button>
    </main>
  );
}
