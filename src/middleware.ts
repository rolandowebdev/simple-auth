import { NextRequest, NextResponse } from 'next/server'
import { getErrorResponse, verifyJWT } from '@/lib'

interface AuthenticatedRequest extends NextRequest {
	user: {
		id: string
	}
}

export async function middleware(req: NextRequest) {
	let token: string | undefined

	const path = req.nextUrl.pathname
	const isPublicPath = path === '/' || path === '/login' || path === '/register'

	if (req.cookies.has('token')) {
		token = req.cookies.get('token')?.value
	} else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
		token = req.headers.get('Authorization')?.substring(7)
	}

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
		if (req.nextUrl.pathname.startsWith('/api')) {
			return getErrorResponse(401, "Token is invalid or user doesn't exists")
		}

		return NextResponse.redirect(
			new URL(`/login?${new URLSearchParams({ error: 'bad-auth' })}`, req.url)
		)
	}

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL('/', req.nextUrl))
	}

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
	}

	return response
}

export const config = {
	matcher: [
		'/',
		'/dashboard',
		'/login',
		'/register',
		'/api/users/:path*',
		'/api/auth/logout'
	]
}
