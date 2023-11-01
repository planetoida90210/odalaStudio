import { type Category } from "@/types/categoriesType";
import { type ReviewType } from "@/types/reviewType";
import { type VariantType } from "@/types/variantType";

export type ImageType = {
	id: string;
	url: string;
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
	variants?: VariantType[];
};
