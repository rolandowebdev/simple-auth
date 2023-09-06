import { cn } from '@/lib'
import React from 'react'

export type PageContainerProps = {
	children: React.ReactNode
	className?: string
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
	return (
		<main
			className={cn(
				'mx-auto flex w-full max-w-5xl flex-col justify-center items-center h-[calc(100vh-116px)] py-6 px-4',
				className
			)}>
			{children}
		</main>
	)
}
