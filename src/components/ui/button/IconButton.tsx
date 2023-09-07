import { cn } from '@/lib'

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	children: React.ReactNode
}

export const IconButton = ({
	label,
	children,
	className,
	...rest
}: IconButtonProps) => {
	return (
		<button
			className={cn(
				'rounded-md py-3 px-4',
				'transition-[background-color] duration-300',
				'hover:bg-gray-200 dark:hover:bg-gray-700',
				className
			)}
			aria-label={label}
			{...rest}>
			{children}
		</button>
	)
}

IconButton.displayName = 'IconButton'
