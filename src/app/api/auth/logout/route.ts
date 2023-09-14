import { NextResponse } from 'next/server'

export async function GET() {
	const response = new NextResponse(
		JSON.stringify({ status: 'success', message: 'successfully logout' }),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		}
	)

	response.cookies.set('token', '', {
		httpOnly: true,
		domain: 'localhost',
		expires: new Date(0)
	})

	return response
}
