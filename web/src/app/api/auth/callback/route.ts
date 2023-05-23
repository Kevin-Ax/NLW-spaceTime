import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  console.log(code)

  const registerRepsonse = await api.post('/register', {
    code,
  })
  const { token } = registerRepsonse.data

  const redirectUrl = new URL('/', request.url)

  const cookieAge = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'set-Cookie': `token=${token}; Path=/; max-age=${cookieAge}`,
    },
  })
}
