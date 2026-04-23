import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DALIA",
  description: "Services de design graphique à prix accessibles",
  icons: {
    icon: "/4.ico",
    shortcut: "/4.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Modak&family=Quicksand:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        <link rel="icon" type="image/ico" href="/4.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}