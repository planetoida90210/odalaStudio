/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["media.graphassets.com"],
	},
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
			{
				source: "/categories/:category",
				destination: "/categories/:category/1",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
