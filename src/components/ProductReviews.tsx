import clsx from "clsx";
import sanitizeHtml from "sanitize-html";
import { StarIcon } from "lucide-react";

import { Review } from "@/components/Review";
import { AddReviewForm } from "@/components/AddReviewForm";

import { getProductReview } from "@/api/review";

export const ProductReviews = async ({ productId }: { productId: string }) => {
	const reviews = await getProductReview(productId);

	const averageRating = reviews.length
		? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length
		: 0;

	return (
		<section aria-labelledby="reviews-heading" className="mt-8 sm:mt-16">
			<div className="bg-zinc-100">
				<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
					<div className="lg:col-span-4">
						<h2 className="text-2xl font-bold tracking-tight text-zinc-900">Opinie klientów</h2>

						<div className="mt-3 flex items-center">
							<div>
								<div className="flex items-center">
									{[0, 1, 2, 3, 4].map((rating) => (
										<StarIcon
											fill={averageRating > rating ? "#f9bc00" : "#D1D5DB"}
											key={rating}
											className={clsx(
												averageRating > rating ? "text-[#f9bc00]" : "text-zinc-300",
												"h-5 w-5 flex-shrink-0",
											)}
											aria-hidden="true"
										/>
									))}
								</div>
								<p className="sr-only">{averageRating.toFixed(1)} na 5 gwiazdek</p>
							</div>
							<p className="ml-2 text-sm text-zinc-900">Bazując na {reviews.length} opiniach</p>
						</div>

						<div className="mt-10">
							<h3 className="text-lg font-medium text-zinc-900">
								Podziel się swoimi przemyśleniami
							</h3>
							<p className="mt-1 text-sm text-zinc-600">
								Jeśli korzystałeś z tego produktu, podziel się swoimi przemyśleniami z innymi
								klientami
							</p>
							<AddReviewForm productId={productId} reviews={reviews} />
						</div>
					</div>

					<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
						<h3 className="sr-only">Najnowsze opinie</h3>
						<div className="flow-root">
							<div className="-my-12 divide-y divide-zinc-200">
								{reviews.map((review) => {
									const reviewRating = review.rating || 0;
									/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
									const cleanHTML = sanitizeHtml(review.content);
									return (
										<Review
											key={review.id}
											review={review}
											cleanHTML={cleanHTML}
											reviewRating={reviewRating}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
