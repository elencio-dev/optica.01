import { Membros as MembroType } from "@/shared/types/Membros";
import { unstable_cache } from "next/cache";
import { graphcms, MEMBROS_QUERY } from "@/services/graphcms";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, User } from "lucide-react";

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
  ['members'],
  { revalidate: 3600 }
);

export default async function Membros() {
  const membros = await getCachedMembros();

  const membrosAtivos = membros.filter((membro: MembroType) => membro.ativo);
  const membrosInativos = membros.filter((membro: MembroType) => !membro.ativo);

  const MemberCard = ({ membro }: { membro: MembroType }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={membro.fotoPerfil?.url || "/default-profile.jpg"}
            alt={membro.nome}
            fill
            className="object-cover object-top"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{membro.nome}</CardTitle>
        <p className="text-sm text-gray-600 mb-2">{membro.cargo}</p>
        <Badge variant={membro.ativo ? "default" : "secondary"} className="mb-3">
          {membro.ativo ? "Atualmente no cargo" : "Egresso"}
        </Badge>
        {membro.cvLattes && (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={membro.cvLattes} target="_blank" rel="noopener noreferrer">
              Ver CV Lattes
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Nossa Equipe
      </h1>

      {membros.length > 0 ? (
        <Tabs defaultValue="ativos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ativos">Membros Ativos</TabsTrigger>
            <TabsTrigger value="inativos">Membros Egressos</TabsTrigger>
          </TabsList>
          <TabsContent value="ativos">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membrosAtivos.map((membro: MembroType, index: number) => (
                  <MemberCard key={index} membro={membro} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="inativos">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membrosInativos.map((membro: MembroType, index: number) => (
                  <MemberCard key={index} membro={membro} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <User className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-700">Nenhum membro encontrado</p>
            <p className="text-sm text-gray-500 mt-2">Não há membros cadastrados no momento.</p>
          </div>
        </Card>
      )}
    </div>
  );
}