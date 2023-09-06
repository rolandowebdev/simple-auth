import { cn } from '@/lib/utils'

type IconButtonProps = {
	children: React.ReactNode
	className?: string
	label: string
	onClick: () => void
}

export function IconButton({
	children,
	className,
	label,
	...rest
}: IconButtonProps) {
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
