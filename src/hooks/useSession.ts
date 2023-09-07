import { useEffect } from 'react'
import { authUser } from '@/lib'
import { useStore } from '@/store'

export function useSession() {
	const store = useStore()

	const fetchUser = async () => {
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
