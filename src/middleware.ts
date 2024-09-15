import {
  AUTH_SIGNED,
  AUTH_ROUTES,
  AUTH_API_PREFIX,
  AUTH_SIGNIN_URL,
  AUTH_PUBLIC_ROUTES,
} from '@/server/next-auth'
import { NEXT_AUTH_CONFIG } from '@/server/next-auth/config'

import { A, B, pipe, S } from '@mobily/ts-belt'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

const { auth: middleware } = NextAuth(NEXT_AUTH_CONFIG)

export default middleware(async (req) => {
  let session = req.auth?.user
  let url = req.nextUrl
  let redirectStatus = { status: 307 }

  let isApiAuthRoute = pipe(url.pathname, S.includes(AUTH_API_PREFIX))
  let isAuthRoutes = pipe(AUTH_ROUTES, A.includes(url.pathname))
  let isPublicRoutes = pipe(AUTH_PUBLIC_ROUTES, A.includes(url.pathname), B.inverse)

  if (isApiAuthRoute) {
    if (!session) return NextResponse.redirect(new URL(AUTH_SIGNIN_URL, url), redirectStatus)
    return NextResponse.redirect(new URL(AUTH_SIGNED, url), redirectStatus)
  }

  if (isAuthRoutes) {
    if (session) return NextResponse.redirect(new URL(AUTH_SIGNED, url), redirectStatus)
    return NextResponse.next()
  }

  if (!session && isPublicRoutes) {
    return NextResponse.redirect(new URL(AUTH_SIGNIN_URL, url), redirectStatus)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
