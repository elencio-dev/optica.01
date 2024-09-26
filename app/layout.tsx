import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import "../styles/globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Unilab Student Chapter",
  description: "Unilab Optic Chapter, associado à entidade norte-americana The Optical Society (OSA). Promovemos a geração, aplicação, e disseminação de conhecimento na área de óptica e fotônica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased ${roboto.className}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
