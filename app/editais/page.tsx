'use client'

import { useEditaisStore } from '@/store/useEditaisStore'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarIcon, FileTextIcon, TagIcon } from 'lucide-react'
import { NextSeo } from 'next-seo'

export default function Editais() {
  const { editaisContent, fetchEditais: fetchEditaisFromStore } = useEditaisStore()

  const fetchEditais = useCallback(() => {
    fetchEditaisFromStore();
  }, [fetchEditaisFromStore]);

  useEffect(() => {
    fetchEditais()
  }, [fetchEditais])

  if (!editaisContent) {
    return (
      <div className="py-8 max-w-7xl mx-auto px-4">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
  
      <div className="py-8 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Editais Recentes
        </h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {editaisContent.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-violet-800">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {item.excerpt.split(' ').slice(0, 30).join(' ') + '...'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <TagIcon className="w-3 h-3" />
                      {item.slug}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <CalendarIcon className="w-3 h-3" />
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/editais/${item.slug}`}>
                      <FileTextIcon className="mr-2 h-4 w-4" /> Ler Edital
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
