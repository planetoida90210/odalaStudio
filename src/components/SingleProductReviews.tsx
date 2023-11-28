import { SingleProductReviewForm } from "@/components/SingleProductReviewForm";
import { getProductReview } from "@/api/review";

export const SingleProductReviews = async ({ productId }: { productId: string }) => {
	const reviews = await getProductReview(productId);
	return (
		<section aria-labelledby="reviews-heading" className="bg-white">
			<SingleProductReviewForm productId={productId} reviews={reviews} />
		</section>
	);
};
