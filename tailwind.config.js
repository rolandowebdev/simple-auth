/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Plus Jakarta Sans', 'sans-serif']
			},
			colors: {
				brand: {
					blue: '#2a61cc',
					sky: '#4f86f6',
					dark: '#1d1f28',
					light: '#eff4f6'
				}
			}
		}
	},
	plugins: []
}
