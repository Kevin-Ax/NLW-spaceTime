import { User } from 'lucide-react'

export default function SignIng() {
  return (
    <a
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="h-5 w-5 bg-gray-500"></User>
      </div>
      <p className="max-w-[140px] text-sm leading-snug">
        Crie <span className="cursor-pointer underline">sua conta</span> e salve
        suas memórias
      </p>
    </a>
  )
}
