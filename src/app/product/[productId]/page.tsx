import { type Metadata } from "next";

import { getProductById } from "@/api/products";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = await getProductById(params.productId);

	return {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: product?.name,
			description: product?.description,
			images: [
				{
					url: product?.coverImage.src || "",
					width: 800,
					height: 600,
					alt: product?.coverImage.alt,
				},
			],
		},
	};
}

export default async function SingleProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { color: string; size: string };
}) {
	const product = await getProductById(params.productId);

	if (!product) {
		return <div>Nie ma takiego produktu.</div>;
	}

	return (
		<main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8"></main>
	);
}
