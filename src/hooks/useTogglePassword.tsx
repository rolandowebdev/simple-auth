'use client'

import { useState } from 'react'

export const useTogglePassword = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev)
	}

	return { isPasswordVisible, togglePasswordVisibility }
}
