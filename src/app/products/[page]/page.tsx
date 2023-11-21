import { getProductsList } from "@/api/products";
import { ProductList } from "@/components/ProductList";

export async function getStaticPaths() {
	const products = await getProductsList(0, 10);
	const numOfPages = Math.ceil(products.length / 10);
	const paths = Array.from({ length: numOfPages }, (_, i) => ({
		params: { page: (i + 1).toString() },
	}));

	return {
		paths,
		fallback: "blocking",
	};
}
export default async function ProductsPage({ params }: { params: { page: string } }) {
	const skip = Number(params.page) === 1 ? 0 : (Number(params.page) - 1) * 10;
	const products = await getProductsList(10, skip);

	return <ProductList products={products} />;
}
