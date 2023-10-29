export type ProductItemType = {
	id: string;
	name: string;
	category: string;
	description?: string;
	price: number;
	coverImage?: {
		src: string;
		alt: string;
	};
};
