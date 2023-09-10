'use client'

import { User } from '@/types'
import { create } from 'zustand'

type AuthStore = {
	authUser: User | null
	showModal: boolean
	requestLoading: boolean
	setAuthUser: (user: User | null) => void
	setShowModal: (showModal: boolean) => void
	setRequestLoading: (isLoading: boolean) => void
	reset: () => void
}

export const useStore = create<AuthStore>((set) => ({
	authUser: null,
	showModal: false,
	requestLoading: false,
	setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
	setShowModal: (showModal) => set((state) => ({ ...state, showModal })),
	setRequestLoading: (isLoading) =>
		set((state) => ({ ...state, requestLoading: isLoading })),
	reset: () => set({ authUser: null, requestLoading: false })
}))
