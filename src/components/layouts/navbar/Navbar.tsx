'use client'

import { IconButton, Link } from '@/components'
import { useSession, useTheme } from '@/hooks'
import { cn, logoutUser } from '@/lib'
import { useStore } from '@/store'
import { useRouter } from 'next/navigation'
import {
	FiLogIn,
	FiLogOut,
	FiMoon,
	FiSun,
	FiUser,
	FiUserCheck
} from 'react-icons/fi'

export function Navbar() {
	const { isLight, setTheme } = useTheme()

	const store = useStore()
	const user = useSession()
	const router = useRouter()

	const handleToggelTheme = () => {
		setTheme(isLight ? 'dark' : 'light')
	}

	const handleLogout = async () => {
		store.setRequestLoading(true)
		try {
			await logoutUser()
		} catch (error) {
		} finally {
			store.reset()
			router.push('/login')
		}
	}

	return (
		<>
			<header>
				<nav
					className={cn(
						'mx-auto flex w-full max-w-5xl justify-between items-center p-4',
						'transition-[background-color] duration-300'
					)}>
					<Link url='/' className='flex items-center gap-2'>
						<FiUserCheck /> SimpleAuth
					</Link>
					<ul className='flex items-center gap-4'>
						{user && (
							<li className='cursor-pointer' onClick={handleLogout}>
								<IconButton
									label='Logout'
									className='flex items-center gap-1 p-0 hover:bg-transparent dark:hover:bg-transparent hover:text-brand-blue hover:underline dark:hover:text-brand-sky'>
									<FiLogOut /> Logout
								</IconButton>
							</li>
						)}
						{!user && (
							<>
								<li>
									<Link url='/login' className='flex items-center gap-1'>
										<FiLogIn /> Login
									</Link>
								</li>
								<li>
									<Link url='/register' className='flex items-center gap-1'>
										<FiUser /> Register
									</Link>
								</li>
							</>
						)}

						<li>
							<IconButton label='Toggle theme' onClick={handleToggelTheme}>
								{isLight ? <FiMoon /> : <FiSun />}
							</IconButton>
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}
