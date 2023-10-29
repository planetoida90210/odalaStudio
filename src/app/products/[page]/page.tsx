import { getProductsList } from "@/api/products";
import { ProductList } from "@/components/ProductList";

export async function generateStaticParams() {
	const products = await getProductsList(0, 5);
	const numOfPages = Math.ceil(products.length / 5);
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

export default async function ProductsPage({ params }: { params: { page: string } }) {
	const skip = Number(params.page) === 1 ? 0 : (Number(params.page) - 1) * 5;
	const products = await getProductsList(5, skip);

	return <ProductList products={products} />;
}
