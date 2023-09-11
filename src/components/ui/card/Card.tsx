import { User } from '@/types'
import Image from 'next/image'

type CardType = {
	user: User
}

export const Card = ({ user }: CardType) => {
	return (
		<div className='flex items-center gap-4 rounded-md dark:bg-gray-800 bg-gray-300 shadow-sm p-4 w-full transition-all duration-200'>
			{user.photo !== 'default.png' && (
				<Image
					className='rounded-full aspect-square object-cover'
					width={66}
					height={66}
					src={user.photo ? user.photo : ''}
					alt={user.name}
				/>
			)}
			<div className='flex flex-col gap-1'>
				<h3 className='font-bold text-lg'>{user.name}</h3>
				<h4 className='text-sm'>{user.email}</h4>
			</div>
		</div>
	)
}
