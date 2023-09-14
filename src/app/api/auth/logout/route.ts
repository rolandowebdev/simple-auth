import { NextResponse } from 'next/server'

export async function GET() {
	const response = new NextResponse(
		JSON.stringify({ status: 'success', message: 'successfully logout' }),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		}
	)

	await Promise.all([
		response.cookies.set('token', '', { httpOnly: true, maxAge: 0 }),
		response.cookies.set('logged-in', '', { maxAge: 0 })
	])

	return response
}
