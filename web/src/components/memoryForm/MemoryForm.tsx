'use client'
import { Camera } from 'lucide-react'
import MediaPicker from '../mediaPicker/MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function MemoryForm() {
  const router = useRouter()
  async function submitMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const dataForm = new FormData(event.currentTarget)
    const fileUpload = dataForm.get('coverURL')
    let imageUrl = ''

    if (fileUpload) {
      const uploadForm = new FormData()
      uploadForm.set('file', fileUpload)
      const uploadRes = await api.post('/upload', uploadForm)
      imageUrl = uploadRes.data.fileURL
    }
    const token = Cookie.get('token')
    await api.post(
      '/memories',
      {
        content: dataForm.get('content'),
        isPublic: dataForm.get('isPublic'),
        coverUrl: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    router.push('/')
  }

  return (
    <form onSubmit={submitMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-center text-gray-200 hover:text-gray-50"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-50"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-200 bg-gray-700 text-purple-500"
          />
          Tornar a memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        className="w-full flex-1 resize-none rounded border-none bg-transparent p-0 text-lg leading-relaxed text-gray-100 ring-0 placeholder:text-gray-400 focus:ring-0"
        spellCheck="false"
        name="content"
        placeholder="Do que você gostaria de lembrar?"
      />
      <button
        type="submit"
        className="inline-block rounded-full bg-green-500 px-5 py-5 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-700"
      >
        Salvar lembrança
      </button>
    </form>
  )
}
