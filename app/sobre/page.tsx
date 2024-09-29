'use client'

import Image from 'next/image'
import { Outlet } from 'react-router-dom'
import BackGroundImagem from '../../assets/background-CuoDkzZF.jpg'
import { NextSeo } from 'next-seo'

export default function Sobre() {
  return (
    <> 
    <NextSeo
        title="Sobre"
        description="Saiba mais sobre o Unilab Student Chapter e a Optica. Oportunidades para estudantes de óptica e fotônica."
        openGraph={{
          type: 'website',
          url: 'https://www.unilabstudentchapter.org/sobre',
          title: 'Sobre - Unilab Student Chapter',
          description: 'Saiba mais sobre o Unilab Student Chapter e a Optica. Oportunidades para estudantes de óptica e fotônica.',
        }}
      />
    
    <main>
      <section
        className="h-[60vh] bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        aria-label="Background Image of Unilab Student Chapter"
      >
        <Image
          src={BackGroundImagem}
          alt="Unilab Student Chapter Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </section>

      <section className="p-4 sm:p-8 max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10 space-y-8">

              <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Sobre o Unilab Student Chapter</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                O <span className="font-semibold text-blue-600">Unilab Student Chapter</span> é um capítulo estudantil vinculado à <span className="font-semibold text-blue-600">Optica</span>, antiga Optical Society (OSA). 
                Nosso objetivo é promover a excelência acadêmica na área de óptica e fotônica, incentivando os estudantes a se envolverem em projetos 
                de ensino, pesquisa e extensão.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Recentemente, fomos responsáveis por iniciativas como a criação de câmaras de descontaminação de EPIs e 
                a organização de eventos como a <span className="font-semibold text-blue-600">Semana Universitária</span> e o <span className="font-semibold text-blue-600">Space Week</span>.
              </p>

              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Oportunidades Internacionais</h3>
              <p className="text-gray-700">
                O capitulo oferece oportunidades únicas para seus membros, como a participação no 
                <span className="font-semibold text-blue-700"> Amplify Optics Immersion Program</span>, uma iniciativa da Optica Foundation 
                em parceria com a Edmund Optics, que aconteceu em Tacoma, Washington, em 2023.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Sobre a Optica</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A <span className="font-semibold text-blue-600">Optica</span> (anteriormente conhecida como The Optical Society) é uma organização internacional 
                voltada ao avanço da óptica e fotônica. Ela promove eventos globais, oferece programas de desenvolvimento de carreira, 
                e fornece oportunidades de financiamento para estudantes e jovens profissionais da área.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A Unilab Student Chapter também organiza competições e concede prêmios, como o <span className="font-semibold text-blue-600">Prêmio Optica</span>, 
                que busca reconhecer estudantes que se destacam na pesquisa e extensão acadêmica.
              </p>
          </div>
        </div>
        <Outlet />
      </section>
    </main>
    </>
  )
}