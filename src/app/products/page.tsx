import { getProductsList } from "@/api/products";
import { ProductList } from "@/components/ProductList";

export default async function ProductsPage() {
	const products = await getProductsList(0, 10);

	return <ProductList products={products} />;
}
