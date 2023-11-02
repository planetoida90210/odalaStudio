import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";
import { type Category } from "@/types/categoriesType";

export const getCategoriesList = async (skip?: number, first?: number): Promise<Category[]> => {
	const { categories } = await executeGraphql(CategoriesGetListDocument, { skip, first });

	return categories.map(
		(category: { id: string; name: string }): Category => ({
			id: category.id,
			name: category.name,
			slug: category.name.toLowerCase().replace(" ", "-"),
		}),
	);
};
