"use client";

import { graphcms, GALERIA_QUERY } from "@/services/graphcms";
import { useEffect, useState } from "react";
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageIcon, FilterIcon } from "lucide-react";

interface GaleriaItem {
    url: string;
    identificador: string;
}

export default function Galeria() {
    const [items, setItems] = useState<GaleriaItem[]>([]);
    const [selectedIdentificador, setSelectedIdentificador] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGaleria = async () => {
            try {
                const data = await graphcms.request(GALERIA_QUERY);
                //@ts-ignore
                const fetchedItems = data.galeriasConnection.edges.flatMap((edge: any) => {
                    const fotoschapter = edge.node.fotoschapter;
                    const identificador = edge.node.identificador;
                    return Array.isArray(fotoschapter)
                        ? fotoschapter.map((foto: { url: string }) => ({
                              url: foto.url,
                              identificador: identificador,
                          }))
                        : [{ url: fotoschapter.url, identificador: identificador }];
                });
                setItems(fetchedItems);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
                setIsLoading(false);
            }
        };

        fetchGaleria();

        Fancybox.bind("[data-fancybox='gallery']", {
            infinite: true,
            arrows: true,
            Toolbar: {
                display: [
                    { id: "prev", position: "center" },
                    { id: "counter", position: "center" },
                    { id: "next", position: "center" },
                    "zoom",
                    "slideshow",
                    "fullscreen",
                    "download",
                    "thumbs",
                    "close",
                ],
            },
        });

        return () => {
            Fancybox.destroy();
        };
    }, []);

    const filteredItems = selectedIdentificador
        ? items.filter((item) => item.identificador === selectedIdentificador)
        : items;

    const uniqueIdentificadores = Array.from(new Set(items.map((item) => item.identificador)));

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Galeria de Fotos</h1>
            
            <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-6">
                <div className="flex space-x-4 p-4">
                    <Button
                        variant={selectedIdentificador === null ? "default" : "outline"}
                        onClick={() => setSelectedIdentificador(null)}
                    >
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Todas as Fotos
                    </Button>
                    {uniqueIdentificadores.map((identificador, index) => (
                        <Button
                            key={index}
                            variant={selectedIdentificador === identificador ? "default" : "outline"}
                            onClick={() => setSelectedIdentificador(identificador)}
                        >
                            {identificador}
                        </Button>
                    ))}
                </div>
            </ScrollArea>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, index) => (
                        <Card key={index}>
                            <CardContent className="p-0">
                                <Skeleton className="h-60 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item, index) => (
                        <Card key={index} className="overflow-hidden group">
                            <CardContent className="p-0 relative">
                                <a
                                    data-fancybox="gallery"
                                    href={item.url}
                                    data-caption={`Imagem ${index + 1}: ${item.identificador}`}
                                    className="block"
                                >
                                    <img
                                        src={item.url}
                                        alt={`Imagem ${index + 1}`}
                                        className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <Badge variant="secondary" className="text-sm">
                                            <ImageIcon className="w-4 h-4 mr-2" />
                                            {item.identificador}
                                        </Badge>
                                    </div>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}