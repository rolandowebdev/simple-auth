import { AuthPageInvisible, Card, PageContainer } from '@/components'
import { getAllUsers } from '@/lib'
import { User } from '@/types'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const users = await getAllUsers(token?.value)

	return (
		<>
			<PageContainer>
				<h1 className='text-4xl font-bold'>Dashboard User</h1>
				<div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
					{users.map((user: User) => (
						<Card key={user.id} user={user} />
					))}
				</div>
			</PageContainer>
			<AuthPageInvisible />
		</>
	)
}
