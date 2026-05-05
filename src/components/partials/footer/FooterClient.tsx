"use client";

import styles from "./Footer.module.scss";

type FooterClientProps = {
  copy: string;
};

export function FooterClient({ copy }: FooterClientProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>{copy}</p>
    </footer>
  );
}
