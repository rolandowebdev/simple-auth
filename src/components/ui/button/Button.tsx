import { cn } from '@/lib'
import { Spinner } from '..'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	loading?: boolean
}

export const Button = ({
	children,
	loading = false,
	className,
	...rest
}: ButtonProps) => {
	return (
		<button
			className={cn(
				'rounded-md',
				'bg-brand-blue hover:bg-brand-sky',
				'text-lg font-semibold text-brand-light',
				'transition-[background-color] duration-300',
				'flex justify-center items-center w-full py-2 px-4',
				className
			)}
			{...rest}>
			{loading ? <Spinner /> : <span>{children}</span>}
		</button>
	)
}

Button.displayName = 'Button'
