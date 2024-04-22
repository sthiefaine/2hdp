import "dotenv/config";
import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/reset.css";

export const metadata: Metadata = {
  title: "2HDP+",
  description: "2 heures de perdues, le podcast cinéma",
};

import { Footer } from "@/components/Footer/footer";
import { Header } from "@/components/Header/header";
import { PlayerBar } from "@/components/PlayerBar/PlayerBar";
import { PlayerProvider } from "@/context/player.context";
import { SearchProvider } from "@/context/search.context";

import NextAuthProvider from "@/context/nextAuth.context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <PlayerProvider>
        <SearchProvider>
          <html lang="fr">
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/favicon/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon/favicon-16x16.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <body>
              <Header />
              {children}
              <Footer />
              <PlayerBar />
            </body>
          </html>
        </SearchProvider>
      </PlayerProvider>
    </NextAuthProvider>
  );
}
