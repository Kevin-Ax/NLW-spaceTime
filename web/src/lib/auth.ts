import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: String
  name: String
  avatar: String
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Erro com os cookies da aplicação')
  }

  const user: User = decode(token)

  return user
}
