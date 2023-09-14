'use client'

import { Button, FormContainer, Input, InputPassword } from '@/components'
import {
	LoginUserInput,
	LoginUserSchema,
	handleApiError,
	apiLoginUser
} from '@/lib'
import { useStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export function LoginForm() {
	const store = useStore()
	const router = useRouter()

	const methods = useForm<LoginUserInput>({
		resolver: zodResolver(LoginUserSchema)
	})

	const {
		reset,
		handleSubmit,
		formState: { isSubmitSuccessful }
	} = methods

	const LoginUserFunction = async (credentials: LoginUserInput) => {
		store.setRequestLoading(true)
		try {
			await apiLoginUser(JSON.stringify(credentials))
			router.push('/dashboard')
			router.refresh()
			toast.success('Successfully logged in')
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

	const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
		LoginUserFunction(values)
	}

	useEffect(() => {
		if (isSubmitSuccessful) reset()
	}, [isSubmitSuccessful])

	useEffect(() => {
		store.reset()
	}, [])

	return (
		<FormProvider {...methods}>
			<FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
				<Input type='email' name='email' label='Email' />
				<InputPassword name='password' label='Password' />
				<Button type='submit' loading={store.requestLoading} className='mt-2'>
					Login
				</Button>
			</FormContainer>
		</FormProvider>
	)
}
