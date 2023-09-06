import type { Metadata } from 'next'
import { Providers } from '@/app/providers'

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
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
