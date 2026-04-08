import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homeclaz — Profissionais Domésticos Premium",
  description:
    "Encontre babás, empregadas domésticas, motoristas e mais — selecionados com segurança e sem sair de casa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-AO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sora antialiased">{children}</body>
    </html>
  );
}
