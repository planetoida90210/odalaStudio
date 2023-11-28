import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductGetByIdDocument,
	ProductGetSingleByIdDocument,
	ProductsByCategoryIdDocument,
	ProductsByNameDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import { getIdByName } from "@/lib/utils";
import { type ProductItemType } from "@/types/productItemType";
import { type SingleProductType } from "@/types/singleProductTypes";

export const getProductsList = async (
	first?: number,
	skip?: number,
): Promise<ProductItemType[]> => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { first, skip },
	});
	return graphqlResponse.products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			category: product.categories[0]?.name || "",
			price: product.price,
			coverImage: product.images[0] && {
				src: product.images[0].url,
				alt: product.name,
			},
		};
	});
};

export const getProductById = async (id: string): Promise<ProductItemType | null> => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id },
	});

	if (!graphqlResponse.product) {
		return null;
	}

	const product = graphqlResponse.product;
	return {
		id: product.id,
		name: product.name,
		description: product.description,
		price: product.price,
		coverImage: product.images[0] && {
			src: product.images[0].url,
			alt: product.name,
		},
		category: product.categories[0]?.name || "",
	};
};

export const getProductsByCategoryId = async (
	categoryName: string,
	first?: number,
	skip?: number,
): Promise<ProductItemType[] | null> => {
	const categoryId = await getIdByName(categoryName);
	if (!categoryId) return null;
	const graphqlResponse = await executeGraphql({
		query: ProductsByCategoryIdDocument,
		variables: { id: categoryId, first, skip },
	});

	if (!graphqlResponse.category || !graphqlResponse.category.products) {
		return null;
	}

	return graphqlResponse.category.products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			coverImage: product.images[0] && {
				src: product.images[0].url,
				alt: product.name,
			},
			category: graphqlResponse.category?.name || "",
		};
	});
};

export const getSingleProductById = async (id: string): Promise<SingleProductType | null> => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetSingleByIdDocument,
		variables: { id },
	});

	if (!graphqlResponse.product) {
		return null;
	}

	const product = graphqlResponse.product as SingleProductType;

	return {
		id: product.id,
		name: product.name,
		description: product.description,
		createdAt: String(product.createdAt),
		images: product.images.map((image) => ({
			id: image.id,
			url: image.url,
		})),
		price: product.price,
		slug: product.slug,
		reviews: product.reviews.map((review) => ({
			...review,
			createdAt: String(review.createdAt),
			rating: review.rating || 0,
		})),
		categories: product.categories.map((category) => ({
			id: category.id,
			name: category.name,
			slug: category.slug,
		})),
		productSizeVariants: product.productSizeVariants.map((variant) => ({
			id: variant.id,
			name: variant.name,
			size: variant.size,
			stock: variant.stock || 0,
		})),
		productColorVariant: product.productColorVariant
			? {
					id: product.productColorVariant.id,
					name: product.productColorVariant.name,
					color: product.productColorVariant.color,
			  }
			: null,
		sound: product.sound?.map((s) => ({
			id: s.id,
			mimeType: s.mimeType,
			url: s.url,
			fileName: s.fileName,
		})),
	};
};

export const getProductsByName = async (name: string): Promise<ProductItemType[]> => {
	const graphqlResponse = await executeGraphql({
		query: ProductsByNameDocument,
		variables: { name },
	});

	if (!graphqlResponse.products) {
		redirect("/");
	}

	return graphqlResponse.products.map((product) => ({
		id: product.id,
		name: product.name,
		description: product.description,
		price: product.price,
		coverImage: product.images[0]
			? {
					src: product.images[0].url,
					alt: product.name,
			  }
			: undefined,
		category: product.categories?.[0]?.name || "",
	}));
};
