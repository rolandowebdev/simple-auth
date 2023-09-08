import { Link, Navbar, PageContainer } from '@/components'

export default function Home() {
	return (
		<>
			<Navbar />
			<PageContainer>
				<div className='flex flex-col justify-between items-center h-[68px]'>
					<h1 className='text-3xl font-bold'>Welcome to SimpleAuth</h1>
					<p className='text-lg'>
						You can try to{' '}
						<Link
							url='/login'
							className='text-brand-blue hover:underline lowercase'>
							Login
						</Link>{' '}
						or{' '}
						<Link
							url='/register'
							className='text-brand-blue hover:underline lowercase'>
							Register
						</Link>{' '}
						here
					</p>
				</div>
			</PageContainer>
		</>
	)
}
