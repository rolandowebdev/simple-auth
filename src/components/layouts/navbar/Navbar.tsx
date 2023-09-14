'use client'

import { IconButton, Link, Modal } from '@/components'
import { useTheme } from '@/hooks'
import { apiLogoutUser, handleApiError } from '@/lib'
import { useStore } from '@/store'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { FiLogIn, FiMoon, FiSun, FiUser, FiUserCheck } from 'react-icons/fi'

export function Navbar() {
	const path = usePathname()
	const router = useRouter()

	const { reset, requestLoading, setRequestLoading, setShowModal } = useStore()
	const { isLight, setTheme } = useTheme()

	const handleToggelTheme = () => {
		setTheme(isLight ? 'dark' : 'light')
	}

	const handleLogout = async () => {
		setRequestLoading(true)
		try {
			await apiLogoutUser()
			router.push('/')
			setShowModal(false)
			toast.success('Successfully logged out')
		} catch (error: any) {
			if (error instanceof Error) {
				handleApiError(error)
			} else {
				toast.error(error.message)
				console.log('Error message:', error.message)
			}
		} finally {
			setRequestLoading(false)
			reset()
		}
	}

	return (
		<>
			<header className='sticky top-0 shadow-md bg-brand-light dark:bg-brand-dark'>
				<nav className='mx-auto flex w-full max-w-5xl justify-between items-center p-4 transition-[background-color] duration-300'>
					<Link url='/' className='flex items-center gap-2'>
						<FiUserCheck /> SimpleAuth
					</Link>
					<ul className='flex items-center gap-4'>
						{path !== '/dashboard' ? (
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
						) : (
							<li className='cursor-pointer'>
								<Modal
									title='Logout'
									text='Are you sure you want to logout?'
									loading={requestLoading}
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
