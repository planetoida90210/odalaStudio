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
		<div
			style={{ minHeight: "calc(100vh - var(--navbar-height))" }}
			className="mx-auto flex max-w-7xl flex-col"
		>
			<h1 className="mx-10 max-w-7xl pb-8 text-4xl font-extrabold first-letter:uppercase md:mx-16 lg:mx-24 xl:mx-32">
				{params.category}
			</h1>
			<div className="w-full flex-1 px-10 pb-2">
				<main className="mx-auto max-w-7xl">{children}</main>
			</div>
			<div className="w-full pb-4 md:pb-6">
				<Pagination numOfPages={numOfPages} baseUrl={`categories/${params.category}`} />
			</div>
		</div>
	);
}
