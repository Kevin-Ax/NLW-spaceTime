import { getUser } from '@/lib/auth'
import Image from 'next/image'

export default function Profile() {
  const { name, avatar } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatar}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <p className="w-[680px] text-sm leading-snug">
        Bem vindo de volta, {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-200"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}
