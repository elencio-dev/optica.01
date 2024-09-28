"use client";

import Image from 'next/image';
import { Outlet } from 'react-router-dom';
import BackGroundImagem from '../../assets/background-CuoDkzZF.jpg';

export default function Sobre() {
    return (
        <main>
            {/* Seção de Imagem de Fundo */}
            <section
                className="h-[500px] bg-cover bg-center flex items-center justify-center relative"
                aria-label="Background Image of Unilab Student Chapter"
            >
                <Image
                    src={BackGroundImagem}
                    alt="Unilab Student Chapter Background"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    className="z-0"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="text-white z-10 text-3xl font-bold text-center px-4 sm:px-0">
                    Unilab Student Chapter
                </h1>
            </section>

            {/* Seção de Conteúdo */}
            <section className="p-4 sm:p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-col items-center space-y-6 lg:space-y-8">

                        {/* Texto sobre o Unilab Student Chapter e Optica */}
                        <div className="lg:w-full text-base leading-relaxed text-center">
                            <h2 className="text-3xl font-semibold mb-6 text-center">Sobre o Unilab Student Chapter</h2>
                            <p className="mb-6">
                                O <strong>Unilab Student Chapter</strong> é um capítulo estudantil vinculado à <strong>Optica</strong>, antiga Optical Society (OSA). 
                                O objetivo do capítulo é promover a excelência acadêmica na área de óptica e fotônica, incentivando os estudantes a se envolverem em projetos 
                                de ensino, pesquisa e extensão. Recentemente, o capítulo foi responsável por iniciativas como a criação de câmaras de descontaminação de EPIs e 
                                a organização de eventos como a <strong>Semana Universitária</strong> e o <strong>Space Week</strong>.
                            </p>
                            <p className="mb-6">
                                Além disso, o capítulo oferece oportunidades internacionais para seus membros, como a participação no 
                                <strong>Amplify Optics Immersion Program</strong>, uma iniciativa da Optica Foundation em parceria com a Edmund Optics, que aconteceu em Tacoma, Washington, em 2023.
                            </p>
                            <h2 className="text-3xl font-semibold mb-6 text-center">Sobre a Optica</h2>
                            <p className="mb-6">
                                A <strong>Optica</strong> (anteriormente conhecida como The Optical Society) é uma organização internacional voltada ao avanço da óptica e fotônica.
                                Ela promove eventos globais, oferece programas de desenvolvimento de carreira, e fornece oportunidades de financiamento para estudantes e jovens profissionais 
                                da área. A Optica também organiza competições e concede prêmios, como o <strong>Prêmio Optica</strong>, que busca reconhecer estudantes que se destacam na pesquisa e extensão acadêmica.
                            </p>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
