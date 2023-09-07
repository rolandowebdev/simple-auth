'use client'

import { Button, FormContainer, Input, InputPassword } from '@/components'
import {
	RegisterUserInput,
	RegisterUserSchema,
	handleApiError,
	registerUser
} from '@/lib'
import { useStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export function RegisterForm() {
	const store = useStore()
	const router = useRouter()

	const methods = useForm<RegisterUserInput>({
		resolver: zodResolver(RegisterUserSchema)
	})

	const {
		reset,
		handleSubmit,
		formState: { isSubmitSuccessful }
	} = methods

	const handleRegisterUser = async (credentials: RegisterUserInput) => {
		store.setRequestLoading(true)
		try {
			const user = await registerUser(JSON.stringify(credentials))
			store.setAuthUser(user)
			return router.push('/login')
		} catch (error: any) {
			if (error instanceof Error) {
				handleApiError(error)
			} else {
				toast.error(error.message)
				console.log('Error message:', error.message)
			}
		} finally {
			store.setRequestLoading(false)
		}
	}

	const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
		handleRegisterUser(values)
	}

	useEffect(() => {
		if (isSubmitSuccessful) reset()
	}, [isSubmitSuccessful])

	return (
		<FormProvider {...methods}>
			<FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
				<Input type='text' name='username' label='Full Name' />
				<Input type='email' name='email' label='Email' />
				<InputPassword name='password' label='Password' />
				<InputPassword name='confirmPassword' label='Confirm Password' />
				<Button type='submit' loading={store.requestLoading}>
					Register
				</Button>
			</FormContainer>
		</FormProvider>
	)
}
