import { extendTheme } from '@chakra-ui/react'
import { Josefin_Sans } from 'next/font/google'

const nextFont = Josefin_Sans({ weight: ['400'], subsets: ['latin'] })

const fonts = {
	heading: nextFont.style.fontFamily,
	body: nextFont.style.fontFamily
}

const colors = {
	brand: {
		primary: '#2f81f7'
	}
}

export const theme = extendTheme({ fonts, colors })
