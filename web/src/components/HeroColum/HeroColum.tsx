import Image from 'next/image'
import Logo from '../../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'

export default function HeroColum() {
  return (
    <div className="space-y-5">
      <Image src={Logo} alt="Logo-nlw" />
      <div className="max-w-[420px] space-y-1 ">
        <h1 className="mt-5 text-[2.5rem] font-bold leading-tight text-gray-50">
          Sua capsula do tempo
        </h1>
        <p className="mt-1 text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo
        </p>
      </div>
      <Link
        href="/memory/new"
        className="inline-block rounded-full bg-green-500 px-5 py-5 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-700"
      >
        cadastrar lembrança
      </Link>
    </div>
  )
}
