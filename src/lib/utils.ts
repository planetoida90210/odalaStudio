import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCategoriesList } from "@/api/categories";
import { type Category } from "@/types/categoriesType";
import { type VariantType } from "@/types/variantType";

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

//mapping variant from product to variant for cart

export function mapVariant(variant: {
	id: string;
	name: string;
	size?: string;
	color?: string;
}): VariantType {
	if (variant.size && variant.color) {
		return {
			type: "SizeColorVariant",
			id: variant.id,
			name: variant.name,
			size: variant.size,
			color: variant.color,
		};
	} else if (variant.size) {
		return {
			type: "SizeVariant",
			id: variant.id,
			name: variant.name,
			size: variant.size,
		};
	} else {
		return {
			type: "ColorVariant",
			id: variant.id,
			name: variant.name,
			color: variant.color || "",
		};
	}
}
