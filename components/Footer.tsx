import Logo from '../assets/Logo.png'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[200px]">
        <div className="">
          <Image
            src={Logo}
            width={100}
            height={100}
            quality={100}
            alt="Logo do Chapter"
          />
          <p className="mt-4 text-sm">
            O Unilab Student Chapter é o capítulo estudantil da Unilab vinculado
            à instituição americana The Optical Society (OSA) e reconhecida pelo
            Instituto de Engenharias e Desenvolvimento Sustentável (IEDS).
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Nos Contate</h2>
          <address className="not-italic w-80 text-sm ">
            CAMPUS DA LIBERDADE
            <br />
            (Sede Administrativa)
            <br />
            Avenida da Abolição, 3 – Centro
            <br />
            CEP: 62.790-000
            <br />
            Redenção – Ceará – Brasil
            <br />
            Sala Ripes
          </address>
        </div>
      </div>

      <div className="py-4">
        <div>
          <p className="text-center text-sm">
            &copy; 2024 Unilab Student Chapter. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
