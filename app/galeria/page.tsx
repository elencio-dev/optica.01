"use client";

import { graphcms, GALERIA_QUERY } from "@/services/graphcms";
import { useEffect, useState } from "react";
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface GaleriaItem {
    url: string;
    identificador: string;
}

export default function Galeria() {
    const [items, setItems] = useState<GaleriaItem[]>([]);
    const [selectedIdentificador, setSelectedIdentificador] = useState<string | null>(null);

    useEffect(() => {
        const fetchGaleria = async () => {
            try {
                const data = await graphcms.request(GALERIA_QUERY);
                //@ts-ignore
                const fetchedItems = data.galeriasConnection.edges.flatMap((edge: any) => {
                    const fotoschapter = edge.node.fotoschapter;
                    const identificador = edge.node.identificador;
                    console.log(identificador);
                    return Array.isArray(fotoschapter)
                        ? fotoschapter.map((foto: { url: string }) => ({
                              url: foto.url,
                              identificador: identificador,
                          }))
                        : [{ url: fotoschapter.url, identificador: identificador }];
                });
                setItems(fetchedItems);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            }
        };

        fetchGaleria();

        // Inicializa o Fancybox
        Fancybox.bind("[data-fancybox='gallery']", {
            infinite: true,  // Para permitir navegação infinita na galeria
            arrows: true,    // Adiciona setas de navegação
        });

        return () => {
            Fancybox.destroy();  // Destrói a instância do Fancybox ao desmontar o componente
        };
    }, []);

    // Função para filtrar os itens com base no identificador selecionado
    const filteredItems = selectedIdentificador
        ? items.filter((item) => item.identificador === selectedIdentificador)
        : items;

    // Coletar identificadores únicos para os badges
    const uniqueIdentificadores = Array.from(new Set(items.map((item) => item.identificador)));

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Badges de identificadores */}
            <div className="mb-6 flex flex-wrap justify-center gap-4">
                {/* Badge para resetar o filtro e mostrar todas as fotos */}
                <button
                    onClick={() => setSelectedIdentificador(null)}
                    className={`py-2 px-5 rounded-full text-white font-medium bg-gray-700 hover:bg-gray-900 transition-all duration-300 ${
                        !selectedIdentificador ? "bg-gray-900" : ""
                    }`}
                >
                    Todas as Fotos
                </button>
                {uniqueIdentificadores.map((identificador, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIdentificador(identificador)}
                        className={`py-2 px-5 rounded-full text-white font-medium transition-all duration-300 ${
                            identificador === "Dia da Luz"
                                ? "bg-purple-600 hover:bg-purple-800"
                                : "bg-violet-600 hover:bg-violet-800"
                        } ${
                            selectedIdentificador === identificador
                                ? "opacity-100"
                                : "opacity-80"
                        }`}
                    >
                        {identificador}
                    </button>
                ))}
            </div>

            {/* Galeria de imagens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item, index) => (
                    <div key={index} className="relative group">
                        <a
                            data-fancybox="gallery"  // Para agrupar as imagens no Fancybox
                            href={item.url}
                            data-caption={`Imagem ${index + 1}: Identificador - ${item.identificador}`}
                            className="block overflow-hidden rounded-lg shadow-lg"
                        >
                            <img
                                src={item.url}
                                alt={`Imagem ${index + 1}`}
                                className="w-full h-60 object-cover transform transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <p className="absolute bottom-4 left-4 text-white text-lg font-semibold z-10">
                            {item.identificador}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
