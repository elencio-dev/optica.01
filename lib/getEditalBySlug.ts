import { EDITAL_BY_SLUG_QUERY, graphcms } from '@/services/graphcms'
import { EditalResponse } from '@/shared/types/Edital'

export async function getEditalBySlug(slug: string) {
  try {
    const data: EditalResponse = await graphcms.request(EDITAL_BY_SLUG_QUERY, {
      slug,
    })

    const edital = data.editalConnection.edges.map((edge) => edge.node)[0]
    return edital ?? null
  } catch (error) {
    console.error('Erro ao buscar edital:', error)
    return null
  }
}
