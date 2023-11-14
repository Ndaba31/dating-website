/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.unsplash.com'], // Add your desired image host domain here
	},
	experimental: {
		serverActions: true,
	},
	assetPrefix: process.env.NODE_ENV === 'production' ? '/fonts' : '',
};

module.exports = nextConfig;
