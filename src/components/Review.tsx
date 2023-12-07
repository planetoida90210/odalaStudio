import clsx from "clsx";
import { StarIcon } from "lucide-react";

import { type ReviewItemFragment } from "@/gql/graphql";

export const Review = ({
	review,
	cleanHTML,
	reviewRating,
}: {
	review: ReviewItemFragment;
	cleanHTML: string;
	reviewRating: number;
}) => {
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
								fill={reviewRating > rating ? "#f9bc00" : "#D1D5DB"}
								key={rating}
								className={clsx(
									reviewRating > rating ? "text-[#f9bc00]" : "text-zinc-300",
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
};
