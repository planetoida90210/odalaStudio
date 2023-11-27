import { executeGraphql } from "@/api/graphqlApi";

import {
	ReviewCreateDocument,
	ReviewPublishDocument,
	ReviewGetByProductIdDocument,
} from "@/gql/graphql";
import { type ReviewType } from "@/types/reviewType";

export const createReview = async (reviewData: ReviewType) => {
	const response = await executeGraphql(
		ReviewCreateDocument,
		{
			headline: reviewData.headline,
			name: reviewData.name,
			email: reviewData.email,
			content: reviewData.content,
			rating: reviewData.rating,
			id: reviewData.id,
		},
		{
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	);

	return response?.createReview?.id;
};

export const publishReview = async (reviewId: string) => {
	await executeGraphql(
		ReviewPublishDocument,
		{ id: reviewId },
		{
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
	);
};

export const getProductReviews = async (productId: string) => {
	const response = await executeGraphql(ReviewGetByProductIdDocument, { id: productId });

	return response.reviewsConnection.edges.map((edge) => edge.node);
};
