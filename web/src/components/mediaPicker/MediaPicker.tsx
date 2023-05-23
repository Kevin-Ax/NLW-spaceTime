'use client'
import { Camera } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>()

  function filePickedHandler(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }
    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        name="coverURL"
        onChange={filePickedHandler}
        type="file"
        accept="image/*"
        id="media"
        className="invisible h-0 w-0"
      />
      {preview && (
        <img
          src={preview}
          alt=""
          className=" aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
