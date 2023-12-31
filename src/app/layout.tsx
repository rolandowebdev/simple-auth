import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@/styles/global.css'

import { Footer, Navbar, RootContainer, ThemeProvider } from '@/components'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
	title: 'Simple Auth',
	description: 'Simple auth system in Next.js 13'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body suppressHydrationWarning={true}>
				<ThemeProvider attribute='class'>
					<RootContainer>
						<Navbar />
						{children}
						<Footer />
						<Toaster />
					</RootContainer>
				</ThemeProvider>
			</body>
		</html>
	)
}
