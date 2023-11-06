import Image from "next/image";
import Link from "next/link";
import { getProductsList } from "@/api/products";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { type ProductItemType } from "@/types/productItemType";

export const revalidate = 15;

export const HomeTrendingProducts = async () => {
	const products = await getProductsList();
	const randomTrendingProducts = (): ProductItemType[] => {
		const randomProducts = new Set();
		const attemptsLimit = products.length * 4;
		let attempts = 0;

		while (randomProducts.size < 4 && attempts < attemptsLimit) {
			const randomIndex = Math.floor(Math.random() * products.length);
			randomProducts.add(products[randomIndex]);
			attempts++;
		}

		return Array.from(randomProducts) as ProductItemType[];
	};

	return (
		<section aria-labelledby="trending-heading" className="bg-white">
			<div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
				<div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
					<h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-zinc-900">
						Popularne teraz
					</h2>
					<Link
						href={"/products/1"}
						className="hidden text-sm font-semibold text-zinc-600 hover:text-zinc-500 sm:block"
					>
						Zobacz wszystkie
						<span aria-hidden="true"> &rarr;</span>
					</Link>
				</div>

				<div className="relative mt-8">
					<div className="relative w-full overflow-x-auto">
						<ul
							data-testid="products-list"
							role="list"
							className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-2 md:gap-y-0 lg:grid-cols-4 lg:gap-x-8"
						>
							{randomTrendingProducts().map((product) => (
								<li
									key={product.id}
									className="mx-auto inline-flex w-64 flex-col text-center lg:w-auto"
								>
									<Link href={`/product/${product.id}`}>
										<div className="group relative">
											<div className="aspect-h-1 aspect-w-1 sm:aspect-h-3 sm:aspect-w-2 h-96 w-full overflow-hidden rounded-md">
												{product.coverImage && (
													<Image
														src={product.coverImage.src}
														alt={product.name}
														width={600}
														height={600}
														className="h-full w-full object-contain object-center transition-all duration-300 group-hover:scale-105 group-hover:opacity-75"
													/>
												)}
											</div>
											<div className="mt-6">
												<p className="text-sm text-zinc-500">{product.category}</p>
												<h3 className="mt-1 font-semibold text-zinc-900">
													<span className="absolute inset-0" />
													{product.name}
												</h3>
												<p className="mt-1 text-zinc-900">{formatMoney(product.price / 100)}</p>
											</div>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 px-4 sm:hidden">
					<Link href={"/products"}>
						<Button>
							Zobacz wszystkie<span aria-hidden="true"> &rarr;</span>
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
