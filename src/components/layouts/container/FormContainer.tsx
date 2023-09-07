export interface FormContainer
	extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode
}

export const FormContainer = ({ children, ...rest }: FormContainer) => {
	return (
		<form className='w-80 flex flex-col gap-4 mt-8 mb-4' {...rest}>
			{children}
		</form>
	)
}
