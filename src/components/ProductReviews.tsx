import clsx from "clsx";
import sanitizeHtml from "sanitize-html";
import { StarIcon } from "lucide-react";
import { type ReviewType } from "@/types/reviewType";
import { AddReviewForm } from "@/components/AddReviewForm";

type ProductReviewsProps = {
	reviews: ReviewType[];
};

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
	const averageRating = reviews.length
		? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
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
											key={rating}
											className={clsx(
												averageRating > rating ? "text-orange-400" : "text-zinc-300",
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
							<AddReviewForm />
						</div>
					</div>

					<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
						<h3 className="sr-only">Najnowsze opinie</h3>
						<div className="flow-root">
							<div className="-my-12 divide-y divide-zinc-200">
								{reviews.map((review) => {
									/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
									const cleanHTML = sanitizeHtml(review.content as unknown as string) as string;
									return (
										<div key={review.id} className="py-12">
											<div className="flex items-center">
												<div className="ml-4">
													<h4 className="text-sm font-bold text-zinc-900">{review.name}</h4>
													<div className="flex items-center text-sm text-gray-500">
														<p>{review.headline}</p>
														<span aria-hidden="true" className="mx-1">
															&middot;
														</span>
														<p>{new Date(review.createdAt).toLocaleDateString("pl-PL")}</p>
													</div>
													<div className="mt-1 flex items-center">
														{[0, 1, 2, 3, 4].map((rating) => (
															<StarIcon
																key={rating}
																className={clsx(
																	review.rating > rating ? "text-orange-400" : "text-zinc-300",
																	"h-5 w-5 flex-shrink-0",
																)}
																aria-hidden="true"
															/>
														))}
													</div>
													<p className="sr-only">{review.rating} na 5 gwiazdek</p>
												</div>
											</div>

											<div
												className="mt-4 space-y-6 text-base italic text-zinc-600"
												dangerouslySetInnerHTML={{ __html: cleanHTML as unknown as string }}
											/>
										</div>
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
