import { Button, FormContainer, Input, PageContainer } from '@/components'

export default function Login() {
	return (
		<PageContainer>
			<h1 className='text-3xl font-bold'>Login Page</h1>
			<FormContainer>
				<Input type='text' name='username' label='Username' />
				<Input type='password' name='password' label='Password' />
				<Button>Login</Button>
			</FormContainer>
		</PageContainer>
	)
}
