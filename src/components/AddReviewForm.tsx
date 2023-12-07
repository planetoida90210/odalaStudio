"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export const AddReviewForm = ({}: {}) => {
	return (
		<form data-testid="add-review-form" className="space-y-4 pt-5">
			<Input
				type="text"
				name="headline"
				placeholder="Tytuł"
				className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
			/>
			<Textarea
				name="content"
				placeholder="Wiadomość"
				className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
			/>
			<Input
				type="text"
				name="rating"
				placeholder="Ocena 1-5"
				className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
			/>
			<Input
				type="text"
				name="name"
				placeholder="Imię"
				className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
			/>
			<Input
				type="email"
				name="email"
				placeholder="Email"
				className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
			/>
			<Button
				type="submit"
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
			>
				Wyślij opinie
			</Button>
		</form>
	);
};
