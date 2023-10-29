import Link from "next/link";
import { type ProductItemType } from "@/types/productItemType";

import { ProductCoverImage } from "@/components/ProductCoverImage";
import { ProductListItemDescription } from "@/components/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li key={product.id} className="group">
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage src={product.coverImage.src} alt={product.coverImage.alt} />
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
