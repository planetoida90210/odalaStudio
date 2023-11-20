import { type SingleProductType } from "@/types/singleProductTypes";

export type ShoppingCartItem = {
	id: string;
	quantity: number;
	total: number;
	product: SingleProductType;
};

export type ShoppingCart = {
	id: string;
	items: ShoppingCartItem[];
};
