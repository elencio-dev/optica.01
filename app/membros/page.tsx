import { Membros as MembroType } from '@/shared/types/Membros'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User } from 'lucide-react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import MembroCard from '@/components/MembroCard'
import { Card } from '@/components/ui/card'
import { membros } from './actions/getMembros'

export default function Membros() {
  const membrosAtivos = membros.filter((membro: MembroType) => membro.ativo)
  const membrosInativos = membros.filter((membro: MembroType) => !membro.ativo)

  return (
    <>

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
                    <MembroCard key={index} membro={membro} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="inativos">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {membrosInativos.map((membro: MembroType, index: number) => (
                    <MembroCard key={index} membro={membro} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <User className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                Nenhum membro encontrado
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Não há membros cadastrados no momento.
              </p>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
