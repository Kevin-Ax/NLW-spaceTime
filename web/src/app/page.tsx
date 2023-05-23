import EmptyMemories from '@/components/Memory-Section/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'
import ptbr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

dayjs.locale(ptbr)

interface Memory {
  id: string
  coverURL: string
  except: string
  creationDate: string
}

export default async function Home() {
  const isLogged = cookies().has('token')

  if (!isLogged) return <EmptyMemories />

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data
  if (memories.lenght === 0) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-2">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="text -ml-8 flex items-center gap-2 text-sm text-gray-50 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.creationDate).format('D[ de ] MMMM[, ] YYYY')}
            </time>
            <Image
              className="cover aspect-video w-full rounded-lg"
              src={memory.coverURL}
              width={592}
              height={288}
              alt="imagem da memória"
            />
            <p className="text-lg leading-relaxed text-gray-100 ">
              {memory.except}
            </p>
            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
