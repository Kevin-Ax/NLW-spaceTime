import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as Bai } from 'next/font/google'
import { ReactNode } from 'react'
import { cookies } from 'next/headers'

import CopyRigths from '@/components/Copyrigths/Copyrigth'
import HeroColum from '@/components/HeroColum/HeroColum'
import SignIng from '@/components/SignIn/SignIn'
import Profile from '@/components/profile/profile'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const bai = Bai({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai_Jamjuree',
})

export const metadata = {
  title: 'NLW spaceTime',
  description:
    'Uma capsula do tempo construida no eveno "NLW rocketseat" de 2023',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isLogin = cookies().has('token')
  return (
    <html lang="pt">
      <body
        className={`${roboto.variable} ${bai.variable} bg-gray-900 font-sans text-green-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* coluna 1 - dados do usuário, estático */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover  px-28 py-16">
            {/* Nosso bluer da página */}
            <div className="absolute right-0 top-1/2 h-[280px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-60 blur-full" />
            {/* Stripe da divisão de colunas */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>
            {/* login */}
            {isLogin ? <Profile /> : <SignIng />}
            {/* Hero slide */}
            <HeroColum />
            {/* Hero slide */}
            <CopyRigths />
          </div>
          {/* Coluna dois, da linha do tempo */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
