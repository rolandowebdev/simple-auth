import {
	LoginUserInput,
	LoginUserSchema,
	getEnvVariable,
	getErrorResponse,
	prisma,
	signJWT
} from '@/lib'
import { compare } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as LoginUserInput
		const data = LoginUserSchema.parse(body)

		const user = await prisma.user.findUnique({
			where: { email: data.email }
		})

		if (!user || !(await compare(data.password, user.password))) {
			return getErrorResponse(401, 'Invalid email or password')
		}

		const token = await signJWT({ sub: user.id }, { exp: '1d' })

		const response = new NextResponse(
			JSON.stringify({
				status: 'success',
				message: 'successfully login',
				token
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)

		response.cookies.set('token', token, {
			httpOnly: true,
			domain: 'localhost'
		})

		return response
	} catch (error: any) {
		if (error instanceof ZodError) {
			return getErrorResponse(400, 'failed validations', error)
		}

		return getErrorResponse(500, error.message)
	}
}
