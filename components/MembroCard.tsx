import { Membros as MembroType } from '@/shared/types/Membros'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export default function MembroCard({ membro }: { membro: MembroType }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={membro.fotoPerfil?.url || '/default-profile.jpg'}
            alt={membro.nome}
            fill
            className="object-cover object-top"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{membro.nome}</CardTitle>
        <p className="text-sm text-gray-600 mb-2">{membro.cargo}</p>
        <Badge
          variant={membro.ativo ? 'default' : 'secondary'}
          className="mb-3"
        >
          {membro.ativo ? 'Atualmente no cargo' : 'Egresso'}
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
  )
}
