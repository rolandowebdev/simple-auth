import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const origin = req.headers.get('origin')

	const response = new NextResponse(
		JSON.stringify({ status: 'success', message: 'successfully logout' }),
		{
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': origin || '*',
				'Content-Type': 'application/json'
			}
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
