import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCategoriesList } from "@/api/categories";
import { type Category } from "@/types/categoriesType";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatMoney(amount: number, currency = "PLN") {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency,
	}).format(amount);
}

//mapping category id to name

let categoryMapping: Record<string, string> = {};

async function fetchCategories(): Promise<void> {
	try {
		const categories: Category[] = await getCategoriesList();
		categoryMapping = categories.reduce((map: Record<string, string>, category: Category) => {
			map[category.name] = category.id;
			return map;
		}, {});
	} catch (error) {
		console.error("Error fetching categories:", error);
	}
}

function getIdByName(categoryName: string): string | undefined {
	return categoryMapping[categoryName];
}

export { fetchCategories, getIdByName };
