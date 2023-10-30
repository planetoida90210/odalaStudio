import { type ProductItemType } from "@/types/productItemType";

export type Category = {
	id: string;
	name: string;
};

export type CategoryWithProducts = {
	id: string;
	name: string;
	products: ProductItemType[];
};
