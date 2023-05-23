import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import Multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(Multipart)

app.register(cors, {
  origin: true, // todos os urls podem acessar o back
})

app.register(jwt, {
  secret: 'spacetime', // todos os urls podem acessar o back
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3001,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server listening on port ${3001}`)
  })
