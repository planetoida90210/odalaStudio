// page.tsx
import React, { Suspense } from "react";
import { type Metadata } from "next";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { getSingleProductById } from "@/api/products";
import { formatMoney } from "@/lib/utils";
import { SizePicker } from "@/components/SizePicker";
import { ColorPicker } from "@/components/ColorPicker";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Player } from "@/components/Player";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StockIndicator } from "@/components/StockIndicator";
import { type SimplifiedProductSizeVariant } from "@/types/simplifiedProductSizeVariant";
import { type ProductColorVariant, type ProductSizeVariant } from "@/gql/graphql";
// import { ProductReviews } from "@/components/ProductReviews";
import { SingleProductReview } from "@/components/SingleProductReview";

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

export default async function SingleProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { size: string; color: string };
}) {
	const product = await getSingleProductById(params.productId);
	const productData = await getSingleProductById(params.productId);

	if (!product) {
		return <div>Nie znaleziono produktu.</div>;
	}

	const sound = product.sound?.length ? product.sound[0] : null;

	const selectedVariant = product.productSizeVariants.find(
		(variant) => variant.size === searchParams.size,
	);
	const sizeVariantsForPicker: SimplifiedProductSizeVariant[] = product.productSizeVariants.map(
		(variant) => ({
			id: variant.id,
			name: variant.name,
			size: variant.size,
			stock: variant.stock,
		}),
	);

	return (
		<main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
			{productData && (
				<div className="pb-6">
					<Breadcrumbs
						category={productData.categories[0]?.name}
						productName={productData.name}
						productSlug={productData.slug}
					/>
				</div>
			)}
			<div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
				{/* Image gallery */}
				<div className="lg:col-span-5 lg:row-span-3 lg:mt-0">
					<h2 className="sr-only">Images</h2>
					{product.images.length > 1 ? (
						<ImageCarousel images={product.images} />
					) : (
						<div className="lg:flex lg:justify-center">
							<Image
								width={696}
								height={696}
								src={product.images[0].url}
								alt={product.name}
								className="rounded-lg"
							/>
						</div>
					)}
				</div>
				<div className="lg:col-span-7">
					<div className="flex justify-between">
						<h1 className="text-xl font-medium text-zinc-900">{product.name}</h1>
						<p className="text-xl font-medium text-zinc-900">{formatMoney(product.price / 100)}</p>
					</div>
					{/* Variants Selector */}
					<div className="mt-4">
						{product.productColorVariant && (
							<div className="mb-4">
								<ColorPicker
									variants={[product.productColorVariant] as unknown as ProductColorVariant[]}
									currentColor={product.productColorVariant.name}
								/>
							</div>
						)}
						{product.productSizeVariants.length > 0 && (
							<div className="mb-4">
								<SizePicker
									variants={sizeVariantsForPicker as unknown as ProductSizeVariant[]}
									currentSize={selectedVariant?.size}
								/>
							</div>
						)}
					</div>
					{/* Stock indicator */}
					<div className="flex justify-start">
						{selectedVariant && <StockIndicator stock={selectedVariant.stock} />}
					</div>

					{/* Player above description on desktop */}
					{sound && <Player url={sound.url} name={product.name} image={product.images[0].url} />}
					{/* Product details */}
					<div className="mt-10">
						<h2 className="text-sm font-medium text-zinc-900">Opis</h2>

						<div className="prose prose-sm mt-4 text-zinc-500">{product.description}</div>
					</div>
					{/* Reviews placeholder */}
					<div className="mt-4 w-full">
						<h2 className="text-lg font-medium text-zinc-900">Oceny produktu</h2>
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
			<Suspense>
				<SingleProductReview productId={params.productId} />
			</Suspense>
		</main>
	);
}
