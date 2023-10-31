import React from "react";
import { getProductsByCategoryId } from "@/api/products";
import { ProductList } from "@/components/ProductList";

export default async function CategoryPage({ params }: { params: { category: string } }) {
	const productsInThisCategory = await getProductsByCategoryId(params.category);
	if (!productsInThisCategory) {
		return (
			<main className="mx-auto min-h-screen max-w-7xl">
				<p>Nie znaleziono produktów w tej kategorii.</p>
			</main>
		);
	}
	return (
		<main className="mx-auto min-h-screen max-w-7xl">
			<ProductList products={productsInThisCategory} />
		</main>
	);
}
