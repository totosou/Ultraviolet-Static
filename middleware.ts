import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'ferret' && pwd === '1455') {
      return NextResponse.next()
    }
  }

  url.pathname = '/api/auth' // Or wherever you want to redirect failed logins
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: '/:path*',
}