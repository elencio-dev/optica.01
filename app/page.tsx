import CardPostagem from "@/components/CardPostagem";
import Herosection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex mx-auto justify-items-center min-h-screen ">
      <div className="w-full">
        <Herosection />
        <CardPostagem />
      </div>
    </div>
  );
}
