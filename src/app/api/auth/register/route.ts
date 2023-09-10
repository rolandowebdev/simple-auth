import {
	RegisterUserInput,
	RegisterUserSchema,
	getErrorResponse,
	prisma
} from '@/lib'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
	const origin = req.headers.get('origin')

	try {
		const body = (await req.json()) as RegisterUserInput
		const data = RegisterUserSchema.parse(body)
		const hashedPassword = await hash(data.password, 12)

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				photo: data.photo
			}
		})

		return new NextResponse(
			JSON.stringify({
				status: 'success',
				message: 'successfully register user',
				data: { user: { ...user, password: undefined } }
			}),
			{
				status: 201,
				headers: {
					'Access-Control-Allow-Origin': origin || '*',
					'Content-Type': 'application/json'
				}
			}
		)
	} catch (error: any) {
		if (error instanceof ZodError) {
			return getErrorResponse(400, 'failed validations', error)
		}

		if (error.code === 'P2002') {
			return getErrorResponse(409, 'user with that email already exists')
		}

		return getErrorResponse(500, error.message)
	}
}
