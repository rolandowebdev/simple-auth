import { Button, FormContainer, Input, PageContainer } from '@/components'
import { InputPassword } from '@/components'

export default function Register() {
	return (
		<PageContainer>
			<h1 className='text-3xl font-bold'>Register Page</h1>
			<FormContainer>
				<Input type='text' name='username' label='Username' />
				<InputPassword name='password' label='Password' />
				<InputPassword name='confirmPassword' label='Confirm Password' />
				<Button>Register</Button>
			</FormContainer>
		</PageContainer>
	)
}
