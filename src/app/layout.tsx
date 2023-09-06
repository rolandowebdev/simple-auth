import '@/styles/global.css'

import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter, Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({
	subsets: ['latin'],
	variable: '--font-josefin-sans',
	weight: ['400', '500', '600', '700']
})

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter'
})

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
				<main
					className={`${inter.variable} ${josefinSans.variable} font-sans flex justify-center min-h-screen`}>
					<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
						{children}
					</ThemeProvider>
				</main>
			</body>
		</html>
	)
}
