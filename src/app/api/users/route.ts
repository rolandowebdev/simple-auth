import { prisma } from '@/lib'
import { NextResponse } from 'next/server'

export async function GET() {
	const users = await prisma.user.findMany()

	const usersWithoutPasswords = users.map((user) => {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	})

	return NextResponse.json({
		status: 'success',
		message: 'successfully get all users',
		data: { users: usersWithoutPasswords }
	})
}
