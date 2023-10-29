import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";
import { type Category } from "@/types/categoriesType";

export const getCategoriesList = async (skip?: number, first?: number): Promise<Category[]> => {
	const graphqlResponse = await executeGraphql(CategoriesGetListDocument, { skip, first });

	return graphqlResponse.categories.map(
		(category: { id: string; name: string }): Category => ({
			id: category.id,
			name: category.name,
		}),
	);
};
