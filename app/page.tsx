
import CardPostagem from "@/components/CardPostagem";
import Herosection from "@/components/HeroSection";
import { getPosts } from "./Posts/actions/getPosts";


export default async function Home() {
  const cachedPosts = await getPosts("unilabstudentchapter"); 

  return (
    <div className="flex mx-auto justify-items-center">
      <div className="w-full">
        <Herosection cachedPosts={cachedPosts} />
        <CardPostagem cachedPosts={cachedPosts}/> 
      </div>
    </div>
  );
}
