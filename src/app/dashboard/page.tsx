import { AuthPageInvisible, PageContainer } from '@/components'
import { getAllUsers } from '@/lib'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const users = await getAllUsers(token?.value)

	return (
		<>
			<PageContainer>
				<h1>Dashboard Page</h1>
				<div className='grid grid-cols-4 gap-4'>
					{users.map((user) => (
						<div key={user.id} className='mt-8'>
							<p className='mb-3'>Name: {user.name}</p>
							<p className='mb-3'>Email: {user.email}</p>
							<p className='mb-3'>Image: {user.photo}</p>
						</div>
					))}
				</div>
			</PageContainer>
			<AuthPageInvisible />
		</>
	)
}
