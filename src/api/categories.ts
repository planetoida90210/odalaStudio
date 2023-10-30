import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument, ProductGetByCategoryIdDocument } from "@/gql/graphql";
import { type Category, type CategoryWithProducts } from "@/types/categoriesType";

export const getCategoriesList = async (skip?: number, first?: number): Promise<Category[]> => {
	const { categories } = await executeGraphql(CategoriesGetListDocument, { skip, first });

	return categories.map(
		(category: { id: string; name: string }): Category => ({
			id: category.id,
			name: category.name,
		}),
	);
};

export const getCategoryById = async (id: string): Promise<CategoryWithProducts> => {
	console.log(executeGraphql);
	const { category } = await executeGraphql(ProductGetByCategoryIdDocument, { id });
	if (!category) {
		throw new Error("There is no category with this id");
	}
	return {
		id: category.id,
		name: category.name,
		products: category.products.map((product) => ({
			id: product.id,
			name: product.name,
			category: category.name,
			description: product.description,
			price: product.price,
			coverImage: product.images[0]
				? {
						src: product.images[0].url,
						alt: product.name,
				  }
				: undefined,
		})),
	};
};
