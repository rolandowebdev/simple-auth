import { PageContainer, Spinner } from '@/components'

export default function loading() {
	return (
		<PageContainer>
			<Spinner height='2rem' width='2rem' />
		</PageContainer>
	)
}
