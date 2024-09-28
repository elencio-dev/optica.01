import { EDITAIS_QUERY, EDITAL_BY_SLUG_QUERY, graphcms } from '@/services/graphcms';
import { EditaisState, Edital } from '@/shared/types/Edital';
import { create } from 'zustand';

export const useEditaisStore = create<EditaisState>((set) => ({
  editaisContent: [],
  fetchEditais: async () => {
    try {
      const response = await graphcms.request<{
        editalConnection: { edges: { node: Edital }[] };
      }>(EDITAIS_QUERY);

      const editais = response.editalConnection.edges.map((edge) => edge.node);
      set({ editaisContent: editais });
    } catch (error) {
      console.error('Erro ao buscar os editais:', error);
    }
  },

  fetchEditalBySlug: async (slug: string) => {
    try {
      const response = await graphcms.request<{
        edital: Edital;
      }>(EDITAL_BY_SLUG_QUERY, { slug });

      return response.edital;
     
    } catch (error) {
      console.error(`Erro ao buscar o edital com slug ${slug}:`, error);
      return null;
    }
  },
}));
