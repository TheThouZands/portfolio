"use client";

import Link from "next/link";
import styles from "./Header.module.scss";

export type HeaderNavItem = {
  href: string;
  label: string;
};

type HeaderClientProps = {
  navItems: HeaderNavItem[];
};

export function HeaderClient({ navItems }: HeaderClientProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/public">
        Portfolio
      </Link>
      <nav className={styles.nav} aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link className={styles.link} href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
