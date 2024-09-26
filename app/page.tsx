
import CardPostagem from "@/components/CardPostagem";
import Herosection from "@/components/HeroSection";
import { getPosts } from "./Posts/actions/getPosts";


export default async function Home() {
  const cachedPosts = await getPosts("Web Development"); 

  return (
    <div className="flex mx-auto justify-items-center min-h-screen">
      <div className="w-full">
        <Herosection cachedPosts={cachedPosts} />
        <CardPostagem cachedPosts={cachedPosts}/> {/* Componente que renderiza os posts */}
      </div>
    </div>
  );
}
