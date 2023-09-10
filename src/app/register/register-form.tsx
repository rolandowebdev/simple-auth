'use client'

import { Button, FormContainer, Input, InputPassword } from '@/components'
import {
	RegisterUserInput,
	RegisterUserSchema,
	handleApiError,
	apiRegisterUser
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

	const RegisterUserFunction = async (credentials: RegisterUserInput) => {
		store.setRequestLoading(true)
		try {
			const user = await apiRegisterUser(JSON.stringify(credentials))
			store.setAuthUser(user)
			router.push('/login')
			toast.success('Successfully registered')
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
		RegisterUserFunction(values)
	}

	useEffect(() => {
		if (isSubmitSuccessful) reset()
	}, [isSubmitSuccessful])

	return (
		<FormProvider {...methods}>
			<FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
				<Input type='text' name='name' label='Full Name' />
				<Input type='email' name='email' label='Email' />
				<InputPassword name='password' label='Password' />
				<InputPassword name='passwordConfirm' label='Confirm Password' />
				<Button type='submit' loading={store.requestLoading} className='mt-2'>
					Register
				</Button>
			</FormContainer>
		</FormProvider>
	)
}
