/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				hostname: 'images.unsplash.com'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://simple-auth-beta-rolandowebdev.vercel.app/:path*'
			}
		]
	}
}

module.exports = nextConfig
