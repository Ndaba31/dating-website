/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.unsplash.com'], // Add your desired image host domain here
	},
	assetPrefix: process.env.NODE_ENV === 'production' ? '/fonts' : '',
};

module.exports = nextConfig;
