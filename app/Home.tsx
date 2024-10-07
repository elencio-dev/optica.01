import CardPostagem from '@/components/CardPostagem'
import Herosection from '@/components/HeroSection'
import { getCachedPosts } from './Posts/actions/getPosts'

export default async function Home() {
  const cachedPosts = await getCachedPosts('unilabstudentchapter')
  return (
    <>
      <div className="flex mx-auto justify-items-center">
        <div className="w-full">
          <Herosection cachedPosts={cachedPosts} />
          <CardPostagem cachedPosts={cachedPosts} />
        </div>
      </div>
    </>
  )
}
