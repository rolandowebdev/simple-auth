'use client'

import { IconButton, Link } from '@/components'
import { useTheme } from '@/hooks'
import { cn } from '@/lib'
import { useEffect, useState } from 'react'
import { FiLogIn, FiMoon, FiSun, FiUser, FiUserCheck } from 'react-icons/fi'

export function Navbar() {
	const [mounted, setMounted] = useState(false)
	const { isLight, setTheme } = useTheme()

	const handleToggelTheme = () => {
		setTheme(isLight ? 'dark' : 'light')
	}

	// Theme will be applied to the page on first render
	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<header>
			<nav
				className={cn(
					'mx-auto flex w-full max-w-5xl justify-between items-center p-4',
					'transition-[background-color] duration-300'
				)}>
				<Link url='/' className='flex items-center gap-2'>
					<FiUserCheck /> SimpleAuth
				</Link>
				<div className='flex items-center gap-4'>
					<Link url='/login' className='flex items-center gap-1'>
						<FiLogIn /> Login
					</Link>
					<Link url='/register' className='flex items-center gap-1'>
						<FiUser />
						Register
					</Link>
					{mounted && (
						<IconButton label='Toggle theme' onClick={handleToggelTheme}>
							{isLight ? <FiMoon /> : <FiSun />}
						</IconButton>
					)}
				</div>
			</nav>
		</header>
	)
}
