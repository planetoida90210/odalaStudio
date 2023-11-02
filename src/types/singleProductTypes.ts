import { type Category } from "@/types/categoriesType";
import { type ReviewType } from "@/types/reviewType";

export type ImageType = {
	id: string;
	url: string;
};

export type SizeVariantType = {
	id: string;
	name: string;
	stock?: number | null;
};

export type ColorVariantType = {
	id: string;
	name: string;
	color: string;
};

export type SingleProductType = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	images: ImageType[];
	price: number;
	slug: string;
	reviews: ReviewType[];
	categories: Category[];
	productSizeVariants: SizeVariantType[];
	productColorVariant?: ColorVariantType | null;
};
