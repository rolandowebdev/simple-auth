import { NextRequest, NextResponse } from 'next/server'
import { getErrorResponse, verifyJWT } from '@/lib'

interface AuthenticatedRequest extends NextRequest {
	user: {
		id: string
	}
}

let redirectToLogin = false
export async function middleware(req: NextRequest) {
	let token: string | undefined

	if (req.cookies.has('token')) {
		token = req.cookies.get('token')?.value
	} else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
		token = req.headers.get('Authorization')?.substring(7)
	}

	if (req.nextUrl.pathname.startsWith('/login') && (!token || redirectToLogin))
		return

	if (
		!token &&
		(req.nextUrl.pathname.startsWith('/api/users') ||
			req.nextUrl.pathname.startsWith('/api/auth/logout'))
	) {
		return getErrorResponse(
			401,
			'You are not logged in. Please provide a token to gain access.'
		)
	}

	const response = NextResponse.next()

	try {
		if (token) {
			const { sub } = await verifyJWT<{ sub: string }>(token)
			response.headers.set('X-USER-ID', sub)
			;(req as AuthenticatedRequest).user = { id: sub }
		}
	} catch (error) {
		redirectToLogin = true
		if (req.nextUrl.pathname.startsWith('/api')) {
			return getErrorResponse(401, "Token is invalid or user doesn't exists")
		}

		return NextResponse.redirect(
			new URL(`/login?${new URLSearchParams({ error: 'bad-auth' })}`, req.url)
		)
	}

	const authUser = (req as AuthenticatedRequest).user

	if (!authUser || !token) {
		return NextResponse.redirect(
			new URL(
				`/login?${new URLSearchParams({
					error: 'bad-auth',
					forceLogin: 'true'
				})}`,
				req.url
			)
		)
	}

	if (req.url.includes('/login') && authUser) {
		return NextResponse.redirect(new URL('/dashboard', req.url))
	}

	return response
}

export const config = {
	matcher: ['/dashboard', '/login', '/api/users/:path*']
}
