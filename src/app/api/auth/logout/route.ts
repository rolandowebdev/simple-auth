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
		response.cookies.set({
			name: 'token',
			value: '',
			maxAge: -1
		}),
		response.cookies.set({
			name: 'logged-in',
			value: '',
			maxAge: -1
		})
	])

	return response
}
