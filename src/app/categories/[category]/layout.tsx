import React from "react";
import { type Metadata } from "next";
import { getProductsByCategoryId } from "@/api/products";
import { getCategoriesList } from "@/api/categories";
import { Pagination } from "@/components/Pagination";

export async function generateMetadata({
	params,
}: {
	params: { category: string };
}): Promise<Metadata> {
	const categories = await getCategoriesList();
	const category = categories.find((cat) => cat.name === params.category);

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
	params: { category: string; page: string };
}) {
	const totalProducts = await getProductsByCategoryId(params.category);
	const numOfPages = Math.ceil((totalProducts?.length || 0) / 5);

	return (
		<>
			<h1 className="mx-auto max-w-7xl pb-8 text-4xl font-extrabold first-letter:uppercase">
				{params.category}
			</h1>
			<main className="mx-auto max-w-7xl">{children}</main>
			<Pagination numOfPages={numOfPages} baseUrl={`categories/${params.category}`} />
		</>
	);
}
