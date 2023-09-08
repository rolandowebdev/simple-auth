'use client'

import { cn } from '@/lib'
import { useFormContext } from 'react-hook-form'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label: string
}

export const Input = ({
	name,
	type,
	label,
	className,
	...rest
}: InputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				type={type}
				aria-label={label}
				className={cn(
					'flex h-9 w-full px-3 py-1',
					'bg-transparent text-sm shadow-sm transition-colors',
					'rounded-md border border-brand-dark dark:border-brand-light',
					'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
					'disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground',
					className
				)}
				{...register(name)}
				{...rest}
			/>
			{errors[name] && (
				<span className='text-red-400 text-xs pt-1 block transition-all duration-300'>
					{errors[name]?.message as string}
				</span>
			)}
		</div>
	)
}

Input.displayName = 'Input'
