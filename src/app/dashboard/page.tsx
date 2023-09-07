import { AuthPageInvisible, PageContainer } from '@/components'
import { getAllUsers } from '@/lib'
import { cookies } from 'next/headers'
import Image from 'next/image'

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
							<Image
								className='rounded-full aspect-square object-cover'
								width={68}
								height={68}
								src={user.photo ? user.photo : ''}
								alt={user.name}
							/>
						</div>
					))}
				</div>
			</PageContainer>
			<AuthPageInvisible />
		</>
	)
}
