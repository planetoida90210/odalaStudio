import { getProductsList } from "@/api/products";
import { Pagination } from "@/components/Pagination";

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
	const products = await getProductsList();
	const numOfPages = Math.ceil(products.length / 5);
	return (
		<>
			<section>{children}</section>
			<Pagination numOfPages={numOfPages} baseUrl="products" />
		</>
	);
}
