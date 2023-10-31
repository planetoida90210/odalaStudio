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

async function getIdByName(categoryName: string): Promise<string | undefined> {
	try {
		const categories: Category[] = await getCategoriesList();
		const foundCategory = categories.find((category) => category.name === categoryName);
		return foundCategory ? foundCategory.id : undefined;
	} catch (error) {
		console.error("Błąd podczas pobierania kategorii:", error);
		return undefined;
	}
}

export { getIdByName };
