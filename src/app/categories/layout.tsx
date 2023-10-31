import React from "react";
import { type Metadata } from "next"; // Upewnij się, że typ Metadata jest prawidłowo zaimportowany
import { getCategoryById } from "@/api/categories";
import { Pagination } from "@/components/Pagination";
import { type CategoryWithProducts } from "@/types/categoriesType"; // Upewnij się, że ten import jest prawidłowy

export async function generateMetadata({
	params,
}: {
	params: { category: string };
}): Promise<Metadata> {
	const category: CategoryWithProducts = await getCategoryById(params.category);

	return {
		title: category?.name,
		openGraph: {
			title: category?.name,
		},
	};
}

export default async function CategoryLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { category: string };
}) {
	const categoryWithProducts: CategoryWithProducts = await getCategoryById(params.category);
	const numOfPages = Math.ceil(categoryWithProducts.products.length / 5);

	return (
		<>
			<h1 className="mx-auto max-w-7xl pb-20 text-4xl font-extrabold first-letter:uppercase">
				{categoryWithProducts.name}
			</h1>
			<main className="mx-auto max-w-7xl">{children}</main>
			<Pagination numOfPages={numOfPages} baseUrl={`categories/${params.category}`} />
		</>
	);
}
