import type { Metadata } from "next";
import "../styles/reset.css";
import "../styles/globals.css";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "2HDP+",
  description: "HAVE FUN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
