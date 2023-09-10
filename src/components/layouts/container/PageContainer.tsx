import { cn } from '@/lib'

export type PageContainerProps = {
	children: React.ReactNode
	className?: string
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
	return (
		<main
			className={cn(
				'm-auto flex w-full max-w-5xl flex-col justify-center items-center py-6 px-4',
				className
			)}>
			{children}
		</main>
	)
}
