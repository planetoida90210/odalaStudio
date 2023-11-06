import { ImageResponse, NextResponse } from "next/server";
import Image from "next/image";
import { getSingleProductById } from "@/api/products";
import { formatMoney } from "@/lib/utils";

export const runtime = "edge";

export const alt = "OdalaStudios sklep online";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({ params }: { params: { productId: string } }) {
	const product = await getSingleProductById(params.productId);
	if (!product) return new NextResponse("ok", { status: 200 });
	return new ImageResponse(
		(
			<div tw="relative w-full overflow-hidden rounded-lg flex">
				<div tw="flex items-center justify-center">
					{product.images[0] && (
						<Image
							priority
							tw="h-full w-full object-cover object-center"
							width={400}
							height={400}
							src={product.images[0].url}
							alt={product.name}
						/>
					)}
				</div>
				<div tw="flex flex-col text-zinc-50 px-4 gap-4">
					<h1 tw="text-zinc-50 text-2xl">{product.name}</h1>
					<p>{product.description}</p>
					<span>{formatMoney(product.price / 100)}</span>
				</div>
			</div>
		),
	);
}
