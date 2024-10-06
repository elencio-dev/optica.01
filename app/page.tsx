import CardPostagem from '@/components/CardPostagem'
import Herosection from '@/components/HeroSection'
import { cachedPosts } from './Posts/actions/getPosts'
import { NextSeo } from 'next-seo'

export default function Home() {
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
