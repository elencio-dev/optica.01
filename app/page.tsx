
import CardPostagem from "@/components/CardPostagem";
import Herosection from "@/components/HeroSection";
import { getPosts } from "./Posts/actions/getPosts";
import { NextSeo } from "next-seo";


export default async function Home() {
  const cachedPosts = await getPosts("unilabstudentchapter");

  return (
    <>
      <NextSeo
        title="Unilab Student Chapter - Início"
        description="Página inicial do Unilab Student Chapter. Conheça nossas atividades, eventos e projetos na área de óptica e fotônica."
        openGraph={{
          type: 'website',
          url: 'https://www.unilabstudentchapter.org/',
          title: 'Unilab Student Chapter',
          description:
            'Página inicial do Unilab Student Chapter. Conheça nossas atividades, eventos e projetos na área de óptica e fotônica.',
        }}
      />

      <div className="flex mx-auto justify-items-center">
        <div className="w-full">
          <Herosection cachedPosts={cachedPosts} />
          <CardPostagem cachedPosts={cachedPosts} />
        </div>
      </div>
    </>

  );
}
