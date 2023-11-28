import { type ProductSize } from "@/gql/graphql";

export type SimplifiedProductSizeVariant = {
	id: string;
	name: string;
	size: ProductSize;
	stock?: number | null;
};
