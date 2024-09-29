import SEO from '../next-seo.config';
import { Roboto } from "next/font/google"
import "../styles/globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DefaultSeo } from 'next-seo';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400", "700"]
});


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
        <DefaultSeo {...SEO} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
