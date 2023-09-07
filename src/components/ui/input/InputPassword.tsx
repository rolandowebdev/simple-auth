'use client'

import { useTogglePassword } from '@/hooks'
import { cn } from '@/lib'
import { useFormContext } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { IconButton } from '..'

export interface InputPasswordProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label: string
}

export const InputPassword = ({
	name,
	label,
	className,
	...rest
}: InputPasswordProps) => {
	const { isPasswordVisible, togglePasswordVisibility } = useTogglePassword()
	const {
		register,
		formState: { errors }
	} = useFormContext()

	return (
		<div className={cn('flex flex-col gap-1')}>
			<label htmlFor={name}>{label}</label>
			<div className='relative'>
				<input
					id={name}
					type={isPasswordVisible ? 'text' : 'password'}
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
				{isPasswordVisible ? (
					<IconButton
						type='button'
						label='Hide password'
						className='absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer'
						onClick={togglePasswordVisibility}>
						<FiEye />
					</IconButton>
				) : (
					<IconButton
						type='button'
						label='Show password'
						className='absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer'
						onClick={togglePasswordVisibility}>
						<FiEyeOff />
					</IconButton>
				)}
			</div>
			{errors[name] && (
				<span className='text-red-500 text-xs pt-1 block'>
					{errors[name]?.message as string}
				</span>
			)}
		</div>
	)
}

InputPassword.displayName = 'InputPassword'
