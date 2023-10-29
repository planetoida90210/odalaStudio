/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["media.graphassets.com"],
	},
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
};

module.exports = nextConfig;
