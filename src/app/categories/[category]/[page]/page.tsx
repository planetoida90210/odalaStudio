import React from "react";
import { getCategoryById } from "@//api/categories";
import { ProductList } from "@/components/ProductList";
import { type CategoryWithProducts } from "@/types/categoriesType";

export default async function CategoryPage({
	params,
}: {
	params: { category: string; page: string };
}) {
	const categoryWithProducts: CategoryWithProducts = await getCategoryById(params.category);
	const productsInThisCategory = categoryWithProducts.products;

	return (
		<main className="mx-auto min-h-screen max-w-7xl">
			<ProductList products={productsInThisCategory} />
		</main>
	);
}
