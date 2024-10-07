import GaleriaPage from './GaleriaPage'

export const metadata = {
  title: 'Galeria de Fotos',
  description:
    'Explore a galeria de fotos com diversas imagens capturadas em eventos e momentos especiais.',
  openGraph: {
    title: 'Galeria de Fotos',
    description:
      'Explore a galeria de fotos com diversas imagens capturadas em eventos e momentos especiais.',
    url: 'https://www.unilabstudentchapter.org/galeria',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function Page() {
  return <GaleriaPage />
}
