/** @type {import('next').NextConfig} */

const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	images: {
		domains: ["media.graphassets.com"],
	},
	experimental: {
		typedRoutes: true,
		serverActions: true,
		mdxRs: true,
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/:category",
				destination: "/categories/:category/1",
				permanent: true,
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
