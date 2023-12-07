"use client";

import { useRef } from "react";
import { type ReviewItemFragment } from "@/gql/graphql";

export const SingleProductReviewForm = ({
	productId,
	reviews,
}: {
	productId: string;
	reviews: ReviewItemFragment[];
}) => {
	const ref = useRef<HTMLFormElement>(null);
};
