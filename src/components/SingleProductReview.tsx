import { getProductReview } from "@/api/review";
import { SingleProductReviewForm } from "@/components/SingleProductReviewForm";

export const SingleProductReview = async ({ productId }: { productId: string }) => {
	const reviews = await getProductReview(productId);

	return (
		<section>
			<SingleProductReviewForm productId={productId} reviews={reviews} />
		</section>
	);
};
