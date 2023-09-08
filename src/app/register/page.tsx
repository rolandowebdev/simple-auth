import { Link, Navbar, PageContainer } from '@/components'
import { RegisterForm } from './register-form'

export default async function RegisterPage() {
	return (
		<>
			<Navbar />
			<PageContainer>
				<h1 className='text-3xl font-bold'>Register Page</h1>
				<RegisterForm />
				<p>
					Already have an account?{' '}
					<Link url='/login' className='text-brand-blue'>
						Login
					</Link>
				</p>
			</PageContainer>
		</>
	)
}
