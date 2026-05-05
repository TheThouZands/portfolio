import { HeaderClient, type HeaderNavItem } from "./HeaderClient";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/test", label: "Test" },
] satisfies HeaderNavItem[];

export function Header() {
  return <HeaderClient navItems={navItems} />;
}
