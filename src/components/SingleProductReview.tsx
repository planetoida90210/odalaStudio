import { getProductReview } from "@/api/review";
import { SingleProductReviewForm } from "@/components/SingleProductReviewForm";

export const SingleProductReview = async ({ productId }: { productId: string }) => {
	const reviews = await getProductReview(productId);

	return (
		<section aria-labelledby="reviews-heading" className="mt-8 sm:mt-16">
			<SingleProductReviewForm productId={productId} reviews={reviews} />
		</section>
	);
};
