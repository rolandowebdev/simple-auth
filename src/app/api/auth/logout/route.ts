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
		maxAge: -1,
		path: '/',
		secure: true
	}

	const deleteLoggedInCookie = {
		name: 'logged-in',
		value: '',
		maxAge: -1,
		path: '/',
		secure: true
	}

	await Promise.all([
		response.cookies.set(deleteTokenCookie),
		response.cookies.set(deleteLoggedInCookie)
	])

	return response
}
