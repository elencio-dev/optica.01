import CardPostagem from '@/components/CardPostagem'
import Herosection from '@/components/HeroSection'
import { cachedPosts } from './Posts/actions/getPosts'

export const metadata = {
  title: 'Unilab Student Chapter - Página Inicial',
  description:
    'Bem-vindo ao Unilab Student Chapter. Confira nossas últimas postagens, eventos e projetos nas áreas de óptica e fotônica.',
  openGraph: {
    title: 'Unilab Student Chapter - Página Inicial',
    description:
      'Bem-vindo ao Unilab Student Chapter. Confira nossas últimas postagens, eventos e projetos nas áreas de óptica e fotônica.',
    url: 'https://www.unilabstudentchapter.org/',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

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
