"use client";
import React, { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
	const [loading, setLoading] = useState(false);

	const sendEmail = async (name: string, email: string, message: string) => {
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, message }),
			});

			if (response.ok) {
				console.log("Message sent successfully");
			} else {
				console.log("Error sending message");
			}
		} catch (error) {
			console.error("There was an error sending the message", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const message = formData.get("message") as string;

		void sendEmail(name, email, message);

		// Reset form
		event.currentTarget.reset();
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-5xl px-10 pt-10">
			<div className="my-4 flex flex-col">
				<label className="font-bold text-gray-800" htmlFor="name">
					Imie
				</label>
				<input
					type="text"
					minLength={3}
					maxLength={150}
					required
					className="border border-gray-100 bg-gray-50 p-4"
					autoComplete="off"
					id="name"
					name="name"
				/>
			</div>
			<div className="my-4 flex w-full flex-col">
				<label className="font-bold text-gray-800" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					minLength={5}
					maxLength={150}
					required
					className="border border-gray-100 bg-gray-50 p-4"
					autoComplete="off"
					id="email"
					name="email"
				/>
			</div>
			<div>
				<label className="font-bold text-gray-800" htmlFor="message">
					Wiadomość
				</label>
				<textarea
					rows={4}
					required
					minLength={10}
					maxLength={500}
					name="message"
					className="w-full border border-gray-100 bg-gray-50 p-4"
				/>
			</div>
			<Button
				variant={"default"}
				type="submit"
				disabled={loading}
				className="mt-4 w-40 bg-gray-700 px-4 py-2 font-medium text-white disabled:bg-gray-400 disabled:text-gray-100"
			>
				{loading ? "Wysyłam..." : "Wyślij wiadomość"}
			</Button>
		</form>
	);
}
