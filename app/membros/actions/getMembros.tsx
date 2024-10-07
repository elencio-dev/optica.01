import { GraphCMSMembersResponse } from '@/shared/types/Membros'
import { unstable_cache as unstableCache } from 'next/cache'
import { graphcms, MEMBROS_QUERY } from '@/services/graphcms'

const getCachedMembros = unstableCache(
  async () => {
    try {
      const data: GraphCMSMembersResponse =
        await graphcms.request(MEMBROS_QUERY)
      const membersList = data.membersConnection.edges.map((edge) => edge.node)
      return membersList
    } catch (error) {
      console.error('Erro ao buscar membros:', error)
      return []
    }
  },
  ['members'],
  { revalidate: 3600 },
)

export const membros = await getCachedMembros()
