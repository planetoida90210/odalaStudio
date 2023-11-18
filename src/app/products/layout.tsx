import { getProductsList } from "@/api/products";
import { Pagination } from "@/components/Pagination";

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
	const products = await getProductsList();
	const numOfPages = Math.ceil(products.length / 10);
	return (
		<div style={{ minHeight: "calc(100vh - var(--navbar-height))" }} className="flex flex-col">
			<div className="flex-1 px-10 pb-2 ">
				<section>{children}</section>
			</div>

			<div className="pb-4 md:pb-6">
				<Pagination numOfPages={numOfPages} baseUrl="products" />
			</div>
		</div>
	);
}
