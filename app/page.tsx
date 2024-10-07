import Home from './Home'

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

export default async function Page() {
  return <Home />
}
