import { authUser } from '@/lib'
import { useStore } from '@/store'
import { useEffect } from 'react'

export function useSession() {
	const store = useStore()

	async function fetchUser() {
		try {
			const user = await authUser()
			store.setAuthUser(user)
		} catch (error: any) {
			store.reset()
		}
	}

	useEffect(() => {
		if (!store.authUser) fetchUser()
	}, [])

	return store.authUser
}
