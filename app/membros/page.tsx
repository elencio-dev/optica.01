import MembrosPage from './MembrosPage'

export const metadata = {
  title: 'Nossa Equipe',
  description: 'Conheça os membros ativos e egressos da nossa equipe.',
  openGraph: {
    title: 'Nossa Equipe',
    description: 'Conheça os membros ativos e egressos da nossa equipe.',
    url: 'https://www.unilabstudentchapter.org/membros',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function Page() {
  return <MembrosPage />
}
