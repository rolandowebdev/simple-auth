import { Link, PageContainer } from '@/components'
import { LoginForm } from './login-form'

export default async function LoginPage() {
	return (
		<PageContainer>
			<h1 className='text-3xl font-bold'>Login Page</h1>
			<LoginForm />
			<p>
				New to SimpleAuth?{' '}
				<Link url='/register' className='text-brand-blue'>
					Create Account
				</Link>
			</p>
		</PageContainer>
	)
}
