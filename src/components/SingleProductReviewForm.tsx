// "use client";
// import clsx from "clsx";
// import React, { useOptimistic, useRef } from "react";
// import { StarIcon } from "lucide-react";
// import sanitizeHtml from "sanitize-html";

// import { Review } from "@/components/Review";

// import { type ReviewItemFragment } from "@/gql/graphql";
// import { addReviewAction } from "@/app/product/[productId]/actions";

// export const SingleProductReviewForm = ({
// 	productId,
// 	reviews,
// }: {
// 	productId: string;
// 	reviews: ReviewItemFragment[];
// }) => {
// 	console.log(reviews);
// 	const ref = useRef<HTMLFormElement>(null);

// 	const [optimisticReview, setOptimisticReview] = useOptimistic(
// 		reviews,
// 		(state, review: ReviewItemFragment) => [...state, review],
// 	);

// 	const averageRating = optimisticReview.length
// 		? optimisticReview.reduce((acc, review) => acc + (review.rating || 0), 0) /
// 		  optimisticReview.length
// 		: 0;

// 	async function addOptimisticReviews(formData: FormData) {
// 		const newReview: ReviewItemFragment = {
// 			id: productId,
// 			headline: String(formData.get("headline")),
// 			content: String(formData.get("content")),
// 			rating: Number(formData.get("rating")),
// 			name: String(formData.get("name")),
// 			email: String(formData.get("email")),
// 			createdAt: new Date().toISOString(),
// 		};

// 		setOptimisticReview(newReview);
// 		await addReviewAction(productId, formData);

// 		ref.current?.reset();
// 	}

// 	return (
// 		<>
// 			<div className="bg-zinc-100">
// 				<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
// 					<div className="lg:col-span-4">
// 						<h2 className="text-2xl font-bold tracking-tight text-zinc-900">Opinie klientów</h2>

// 						<div className="mt-3 flex items-center">
// 							<div>
// 								<div className="flex items-center">
// 									{[0, 1, 2, 3, 4].map((rating) => (
// 										<StarIcon
// 											fill={averageRating > rating ? "#f9bc00" : "#D1D5DB"}
// 											key={rating}
// 											className={clsx(
// 												averageRating > rating ? "text-[#f9bc00]" : "text-zinc-300",
// 												"h-5 w-5 flex-shrink-0",
// 											)}
// 											aria-hidden="true"
// 										/>
// 									))}
// 								</div>
// 								<p className="sr-only">{averageRating.toFixed(1)} na 5 gwiazdek</p>
// 							</div>
// 							<p className="ml-2 text-sm text-zinc-900">Bazując na {reviews.length} opiniach</p>
// 						</div>

// 						<div className="mt-10">
// 							<h3 className="text-lg font-medium text-zinc-900">
// 								Podziel się swoimi przemyśleniami
// 							</h3>
// 							<p className="mt-1 text-sm text-zinc-600">
// 								Jeśli korzystałeś z tego produktu, podziel się swoimi przemyśleniami z innymi
// 								klientami
// 							</p>
// 							<div>
// 								<form ref={ref} action={void addOptimisticReviews} data-testid="add-review-form">
// 									<div className="flex flex-col space-y-4 pt-5">
// 										<div className="flex flex-col space-y-1">
// 											<label htmlFor="headline" className="text-sm font-medium text-gray-900">
// 												Tytuł
// 											</label>
// 											<input
// 												type="text"
// 												name="headline"
// 												id="headline"
// 												className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
// 											/>
// 										</div>
// 										<div className="flex flex-col space-y-1">
// 											<label htmlFor="content" className="text-sm font-medium text-gray-900">
// 												Wiadomość
// 											</label>
// 											<textarea
// 												name="content"
// 												id="content"
// 												rows={3}
// 												className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
// 											/>
// 										</div>
// 										<div className="flex flex-col space-y-1">
// 											<label htmlFor="rating" className="text-sm font-medium text-gray-900">
// 												Ocena 1-5
// 											</label>
// 											<input
// 												type="text"
// 												name="rating"
// 												id="rating"
// 												className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
// 											/>
// 										</div>
// 										<div className="flex flex-col space-y-1">
// 											<label htmlFor="name" className="text-sm font-medium text-gray-900">
// 												Imię
// 											</label>
// 											<input
// 												type="text"
// 												name="name"
// 												id="name"
// 												className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
// 											/>
// 										</div>
// 										<div className="flex flex-col space-y-1">
// 											<label htmlFor="email" className="text-sm font-medium text-gray-900">
// 												Email
// 											</label>
// 											<input
// 												type="email"
// 												name="email"
// 												id="email"
// 												className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
// 											/>
// 										</div>
// 									</div>
// 								</form>
// 							</div>
// 							{/* <AddReviewForm productId={productId} reviews={reviews} /> */}
// 						</div>
// 					</div>

// 					<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
// 						<h3 className="sr-only">Najnowsze opinie</h3>
// 						<div className="flow-root">
// 							<div className="-my-12 divide-y divide-zinc-200">
// 								{optimisticReview &&
// 									optimisticReview.map((review) => {
// 										const reviewRating = review.rating || 0;
// 										const cleanHTML = sanitizeHtml(review.content);
// 										return (
// 											<Review
// 												key={review.id}
// 												review={review}
// 												cleanHTML={cleanHTML}
// 												reviewRating={reviewRating}
// 											/>
// 										);
// 									})}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

"use client";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { StarIcon } from "lucide-react";
import sanitizeHtml from "sanitize-html";

import { Button } from "./ui/button";
import { RatingStarsForm } from "./RatingStarsForm";
import { Review } from "@/components/Review";
import { type ReviewItemFragment } from "@/gql/graphql";
import { addReviewAction } from "@/app/product/[productId]/actions";

export const SingleProductReviewForm = ({
	productId,
	reviews,
}: {
	productId: string;
	reviews: ReviewItemFragment[];
}) => {
	const ref = useRef<HTMLFormElement>(null);
	const [currentReviews, setCurrentReviews] = useState(reviews);
	const [stars, setStars] = useState(1);

	const averageRating = currentReviews.length
		? currentReviews.reduce((acc, review) => acc + (review.rating || 0), 0) / currentReviews.length
		: 0;

	async function addOptimisticReviews(formData: FormData) {
		const newReview: ReviewItemFragment = {
			id: productId, // Tymczasowy identyfikator; prawdziwe ID powinno pochodzić z backendu
			headline: String(formData.get("headline")),
			content: String(formData.get("content")),
			rating: Number(formData.get("rating")),
			name: String(formData.get("name")),
			email: String(formData.get("email")),
			createdAt: new Date().toISOString(),
		};

		setCurrentReviews([...currentReviews, newReview]);

		try {
			await addReviewAction(productId, formData);
		} catch (error) {
			setCurrentReviews(currentReviews.filter((review) => review.id !== newReview.id)); // Przywróć poprzedni stan
			console.error("Failed to add review:", error);
		}

		ref.current?.reset();
		setStars(1);
	}

	return (
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
										fill={averageRating > rating ? "#f9bc00" : "#D1D5DB"}
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
						<p className="ml-2 text-sm text-zinc-900">
							Bazując na {currentReviews.length} opiniach
						</p>
					</div>

					<div className="mt-10">
						<h3 className="text-lg font-medium text-zinc-900">Podziel się swoimi przemyśleniami</h3>
						<p className="mt-1 text-sm text-zinc-600">
							Jeśli korzystałeś z tego produktu, podziel się swoimi przemyśleniami z innymi
							klientami
						</p>
						<form ref={ref} action={void addOptimisticReviews} data-testid="add-review-form">
							<div className="flex flex-col space-y-4 pt-5">
								{" "}
								<div className="flex flex-col space-y-1">
									<label htmlFor="headline" className="text-sm font-medium text-gray-900">
										Tytuł
									</label>
									<input
										type="text"
										name="headline"
										id="headline"
										className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<label htmlFor="content" className="text-sm font-medium text-gray-900">
										Wiadomość
									</label>
									<textarea
										name="content"
										id="content"
										rows={3}
										className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<RatingStarsForm
										value={stars}
										onClick={(selectedStars) => setStars(selectedStars)}
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<label htmlFor="name" className="text-sm font-medium text-gray-900">
										Imię
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<label htmlFor="email" className="text-sm font-medium text-gray-900">
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
									/>
								</div>
								<Button
									type="submit"
									className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
								>
									Wyślij opinie
								</Button>
							</div>
						</form>
					</div>
				</div>

				<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
					<h3 className="sr-only">Najnowsze opinie</h3>
					<div className="flow-root">
						<div className="-my-12 divide-y divide-zinc-200">
							{currentReviews.map((review) => {
								const reviewRating = review.rating || 0;
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
	);
};
