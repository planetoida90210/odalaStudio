"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { type Route } from "next";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		if (debouncedSearchTerm) {
			router.push(`/search?query=${debouncedSearchTerm}` as Route);
			setSearchTerm("");
		}
	}, [debouncedSearchTerm, router]);

	return (
		<Input
			placeholder="Szukaj..."
			value={searchTerm}
			type="search"
			onChange={handleChange}
			className="w-1/2 md:w-full"
		/>
	);
};
