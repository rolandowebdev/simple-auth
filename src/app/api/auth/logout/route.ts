import { NextResponse } from 'next/server'

export async function GET() {
	const response = new NextResponse(
		JSON.stringify({ status: 'success', message: 'successfully logout' }),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		}
	)

	const deleteTokenCookie = {
		name: 'token',
		value: '',
		maxAge: 0,
		path: '/',
		secure: process.env.NODE_ENV !== 'development'
	}

	const deleteLoggedInCookie = {
		name: 'logged-in',
		value: '',
		maxAge: 0,
		path: '/',
		secure: process.env.NODE_ENV !== 'development'
	}

	await Promise.all([
		response.cookies.set(deleteTokenCookie),
		response.cookies.set(deleteLoggedInCookie)
	])

	return response
}
