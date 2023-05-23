import { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5Mb
      },
    })
    if (!upload) {
      return reply.status(400).send()
    }

    const MimTypes = /^(image|video)\/[a-zA-Z]+/
    const filmeFormatValid = MimTypes.test(upload.mimetype)
    if (!filmeFormatValid) {
      return reply.status(400).send()
    }

    const fileUID = randomUUID()
    const extensionFile = extname(upload.filename)
    const nameFile = fileUID.concat(extensionFile)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', nameFile),
    )

    await pump(upload.file, writeStream)

    const fullurl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${nameFile}`, fullurl).toString()
    console.log(fileUrl)
    return { fileURL: fileUrl }
  })
}
