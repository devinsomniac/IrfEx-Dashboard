import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/Bookings(.*)',
  '/Dashboard(.*)',
  '/Generatepnr(.*)',
  '/RegCust(.*)',
  '/Ticket(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Handle protected routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  const { userId } = await auth()
  const isRootRoute = req.nextUrl.pathname === '/'
  
  if (userId && isRootRoute) {
    return Response.redirect(new URL('/Bookings', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}