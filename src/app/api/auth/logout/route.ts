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
		response.cookies.delete('token'),
		response.cookies.delete('logged-in')
	])

	return response
}
