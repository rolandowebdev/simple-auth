import { Button, FormContainer, Input, PageContainer } from '@/components'

export default function Register() {
	return (
		<PageContainer>
			<h1 className='text-3xl font-bold'>Register Page</h1>
			<FormContainer>
				<Input type='text' name='username' label='Username' />
				<Input type='password' name='password' label='Password' />
				<Input
					type='password'
					name='confirmPassword'
					label='Confirm Password'
				/>
				<Button>Register</Button>
			</FormContainer>
		</PageContainer>
	)
}
