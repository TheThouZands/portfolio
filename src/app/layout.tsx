import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThouZands - Fullstack engineer - Portfolio Site",
  description: "Personal portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
