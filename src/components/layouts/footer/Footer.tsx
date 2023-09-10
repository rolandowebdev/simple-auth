export const Footer = () => {
	const date = new Date()
	return (
		<footer className='w-full shadow-md bg-brand-light dark:bg-brand-dark text-center mx-auto flex max-w-5xl justify-center items-center p-4 transition-[background-color] duration-300'>
			<p>{`©${date.getFullYear()} SimpleAuth. All rights reserved.`}</p>
		</footer>
	)
}
