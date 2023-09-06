import { cn } from '@/lib'
import React from 'react'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
	return (
		<button
			className={cn(
				'rounded-md',
				'w-full py-2 px-4',
				'bg-brand-blue hover:bg-brand-sky',
				'text-lg font-semibold text-brand-light',
				'transition-[background-color] duration-300',
				className
			)}
			{...rest}>
			{children}
		</button>
	)
}

Button.displayName = 'Button'
