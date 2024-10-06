import { useEditaisStore } from '@/store/useEditaisStore'
import EditalPage from './EditalPage'



export const metadata = ({ params }: { params: { slug: string } }) => {
  const edital = useEditaisStore.getState().editaisContent.find((post) => post.slug === params.slug)

  if (!edital) {
    return {
      title: 'Edital não encontrado',
      description: 'Este edital não foi encontrado.',
    }
  }

  return {
    title: edital.title,
    description: edital.content.markdown?.slice(0, 150) ?? 'Edital detalhado',
    openGraph: {
      title: edital.title,
      description: edital.content.markdown?.slice(0, 150) ?? 'Edital detalhado',
      url: `https://www.unilabstudentchapter.org/editais/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <EditalPage params={params} />
}