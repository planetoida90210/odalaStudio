import { StarIcon } from "lucide-react";
import Image from "next/image";
import { type Metadata } from "next";
import { getSingleProductById } from "@/api/products";
import { formatMoney } from "@/lib/utils";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = await getSingleProductById(params.productId);

	return {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: product?.name,
			description: product?.description,
			images: product?.images.map((image) => ({
				url: image.url,
				width: 800,
				height: 600,
				alt: product?.name,
			})),
		},
	};
}

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getSingleProductById(params.productId);

	if (!product) {
		return <div>There is no product with this id.</div>;
	}

	return (
		<main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
			<div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
				{/* Image gallery */}
				<div className="lg:col-span-5 lg:row-span-3 lg:mt-0">
					<h2 className="sr-only">Images</h2>
					{product.images.map((image, index) => (
						<Image
							width={696}
							height={696}
							key={index}
							src={image.url}
							alt={product.name}
							className="rounded-lg"
						/>
					))}
				</div>

				<div className="lg:col-span-7">
					<div className="flex justify-between">
						<h1 className="text-xl font-medium text-zinc-900">{product.name}</h1>
						<p className="text-xl font-medium text-zinc-900">{formatMoney(product.price / 100)}</p>
					</div>
					{/* Product details */}
					<div className="mt-10">
						<h2 className="text-sm font-medium text-zinc-900">Description</h2>
						<div className="prose prose-sm mt-4 text-zinc-500">{product.description}</div>
					</div>
					{/* Reviews placeholder */}
					<div className="mt-4 w-full">
						<h2 className="text-lg font-medium text-zinc-900">Rating</h2>
						<div className="flex items-center">
							<p className="text-sm text-zinc-700">
								{5.0}
								<span className="sr-only"> out of 5 stars</span>
							</p>
							<div className="ml-1 flex items-center">
								{[1, 2, 3, 4, 5].map((rating) => (
									<StarIcon
										key={rating}
										className="h-5 w-5 flex-shrink-0 text-orange-500"
										aria-hidden="true"
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
