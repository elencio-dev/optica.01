import { Membros as MembroType } from "@/shared/types/Membros";
import { unstable_cache } from "next/cache";
import { graphcms, MEMBROS_QUERY } from "@/services/graphcms";

// Função que busca e cacheia os membros no lado do servidor
const getCachedMembros = unstable_cache(
  async () => {
    try {
      const data = await graphcms.request(MEMBROS_QUERY);
      //@ts-ignore
      const membersList = data.membersConnection.edges.map((edge: any) => edge.node);
      return membersList;
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
      return [];
    }
  },
  ['members'], // Chave de cache
  { revalidate: 3600 } // Revalida a cada 1 hora
);

// Este componente é um Server Component que busca os dados no servidor
export default async function Membros() {
  const membros = await getCachedMembros(); // Busca e cacheia os dados

  // Filtrando membros ativos e inativos
  const membrosAtivos = membros.filter((membro: MembroType) => membro.ativo);
  const membrosInativos = membros.filter((membro: MembroType) => !membro.ativo);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Título da página */}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Nossa Equipe
      </h1>

      {/* Verifica se há membros antes de renderizar */}
      {membros.length > 0 ? (
        <>
          {/* Seção de membros ativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {membrosAtivos.map((membro: MembroType, index: number) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                {/* Exibindo a foto do perfil */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={membro.fotoPerfil?.url || "/default-profile.jpg"} // Caminho da imagem ou imagem padrão
                    alt={membro.nome}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>

                {/* Exibindo os dados do membro */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{membro.nome}</h2>
                  <p className="text-sm text-gray-700 mb-2">{membro.cargo}</p>

                  {/* Indicando se o membro está ativo */}
                  {membro.ativo ? (
                    <p className="text-green-500 text-sm font-semibold">Atualmente no cargo</p>
                  ) : (
                    <p className="text-red-500 text-sm font-semibold">Egresso</p>
                  )}

                  {/* Link para o CV Lattes */}
                  {membro.cvLattes && (
                    <a
                      href={membro.cvLattes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
                    >
                      Ver CV Lattes
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Seção de membros inativos */}
          {membrosInativos.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Membros Egressos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {membrosInativos.map((membro: MembroType, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  >
                    {/* Exibindo a foto do perfil */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={membro.fotoPerfil?.url || "/default-profile.jpg"} // Caminho da imagem ou imagem padrão
                        alt={membro.nome}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    </div>

                    {/* Exibindo os dados do membro */}
                    <div className="p-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-1">{membro.nome}</h2>
                      <p className="text-sm text-gray-700 mb-2">{membro.cargo}</p>

                      {/* Indicando se o membro está ativo */}
                      {membro.ativo ? (
                        <p className="text-green-500 text-sm font-semibold">Atualmente no cargo</p>
                      ) : (
                        <p className="text-red-500 text-sm font-semibold">Egresso</p>
                      )}

                      {/* Link para o CV Lattes */}
                      {membro.cvLattes && (
                        <a
                          href={membro.cvLattes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
                        >
                          Ver CV Lattes
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-700">Nenhum membro encontrado.</p>
      )}
    </div>
  );
}
