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

		const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN')
		const token = await signJWT({ sub: user.id }, { exp: `${JWT_EXPIRES_IN}m` })
		const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60

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

		await Promise.all([
			response.cookies.set({
				name: 'token',
				value: token,
				httpOnly: true,
				path: '/',
				secure: process.env.NODE_ENV !== 'development',
				maxAge: tokenMaxAge
			}),
			response.cookies.set({
				name: 'logged-in',
				value: 'true',
				maxAge: tokenMaxAge
			})
		])

		return response
	} catch (error: any) {
		if (error instanceof ZodError) {
			return getErrorResponse(400, 'failed validations', error)
		}

		return getErrorResponse(500, error.message)
	}
}
