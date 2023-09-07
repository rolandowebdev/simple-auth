import { getErrorResponse, prisma } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const userId = req.headers.get('X-USER-ID')

	if (!userId) {
		return getErrorResponse(
			401,
			'You are not logged in, please provide token to gain access'
		)
	}

	const user = await prisma.user.findUnique({ where: { id: userId } })

	return NextResponse.json({
		status: 'success',
		message: 'successfully get user',
		data: { user: { ...user, password: undefined } }
	})
}
