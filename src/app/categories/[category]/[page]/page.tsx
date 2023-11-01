import React from "react";
import { getProductsByCategoryId } from "@/api/products";
import { ProductList } from "@/components/ProductList";

export default async function CategoryPage({
	params,
}: {
	params: { category: string; page: string };
}) {
	const currentPage = parseInt(params.page, 10) || 1;
	const skip = (currentPage - 1) * 5;
	const productsInThisCategory = await getProductsByCategoryId(params.category, 5, skip);
	if (!productsInThisCategory || productsInThisCategory.length === 0) {
		return (
			<main className="mx-auto h-fit max-w-7xl">
				<p>Nie znaleziono produktów w tej kategorii.</p>
			</main>
		);
	}
	return (
		<main className="mx-auto h-fit max-w-5xl">
			<ProductList products={productsInThisCategory} />
		</main>
	);
}
