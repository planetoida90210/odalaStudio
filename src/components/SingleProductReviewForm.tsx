"use client";

import React, { useRef, useState } from "react";
import { addReviewAction } from "@/app/product/[productId]/actions";
import { type SingleProductType } from "@/types/singleProductTypes";

type SingleProductReviewFormProps = {
	productId: string;
	reviews: ReviewType[]; // Użyj odpowiedniego typu dla recenzji
};

export const SingleProductReviewForm = ({ productId, reviews }: SingleProductType) => {
	const ref = useRef<HTMLFormElement>(null);
	const [stars, setStars] = useState<number>(1);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(ref.current);
		await addReviewAction(productId, formData);
		ref.current?.reset();
		setStars(1);
		// Możesz dodać logikę do aktualizacji listy recenzji
	}

	return (
		<section aria-labelledby="reviews-heading" className="mt-8 bg-zinc-100 sm:mt-16">
			<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 lg:py-32">
				<h2 className="text-2xl font-bold tracking-tight text-zinc-900">Dodaj swoją opinię</h2>
				<form ref={ref} onSubmit={void handleSubmit} className="space-y-4 pt-5">
					<button
						type="submit"
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
					>
						Wyślij opinię
					</button>
				</form>
			</div>
			<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 lg:py-32">
				<h2 className="text-2xl font-bold tracking-tight text-zinc-900">Opinie klientów</h2>

				{reviews.map((review) => (
					<div key={review.id}> {/* Wyświetlanie treści recenzji */}</div>
				))}
			</div>
		</section>
	);
};
