import { type ProductItemType } from "@/types/productItemType";

export type Category = {
	id: string;
	name: string;
	slug: string;
};

export type CategoryWithProducts = {
	id: string;
	name: string;
	products: ProductItemType[];
};
