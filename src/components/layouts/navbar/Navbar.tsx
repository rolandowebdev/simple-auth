'use client'

import { IconButton, Link, Modal } from '@/components'
import { useTheme } from '@/hooks'
import { cn, apiLogoutUser } from '@/lib'
import { useStore } from '@/store'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import {
	FiLogIn,
	FiLogOut,
	FiMoon,
	FiSun,
	FiUser,
	FiUserCheck
} from 'react-icons/fi'

type NavbarProps = {
	isLogin?: boolean
}

export function Navbar({ isLogin = false }: NavbarProps) {
	const { isLight, setTheme } = useTheme()

	const store = useStore()
	const router = useRouter()

	const handleToggelTheme = () => {
		setTheme(isLight ? 'dark' : 'light')
	}

	const handleLogout = async () => {
		store.setRequestLoading(true)
		try {
			await apiLogoutUser()
			toast.success('Successfully logged out')
			return router.push('/login')
		} catch (error) {
		} finally {
			store.setRequestLoading(false)
			store.reset()
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
					<Link
						url={isLogin ? '/dashboard' : '/'}
						className='flex items-center gap-2'>
						<FiUserCheck /> SimpleAuth
					</Link>
					<ul className='flex items-center gap-4'>
						{!isLogin && (
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
						{isLogin && (
							<li className='cursor-pointer'>
								<Modal
									title='Logout'
									text='Are you sure you want to logout?'
									loading={store.requestLoading}
									handleLogout={handleLogout}
								/>
							</li>
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
