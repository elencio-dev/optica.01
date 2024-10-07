import HomePage from './HomePage'

export const metadata = {
  title: 'Editais Recentes',
  description:
    'Veja os editais mais recentes e fique atualizado com as novidades.',
  openGraph: {
    title: 'Editais Recentes',
    description:
      'Veja os editais mais recentes e fique atualizado com as novidades.',
    url: 'https://www.unilabstudentchapter.org/editais',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function Page() {
  return <HomePage />
}
