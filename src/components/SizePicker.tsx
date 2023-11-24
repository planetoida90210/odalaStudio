"use client";

import { useState } from "react";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type SizeVariantType } from "@/types/singleProductTypes";

export const SizePicker = ({
	currentSize,
	variants,
}: {
	currentSize?: string;
	variants: SizeVariantType[];
}) => {
	const [activeSize, setActiveSize] = useState<string | null>(null);

	const handleSizeClick = (size: string) => {
		setActiveSize(size);
	};
	return (
		<div className="mt-8">
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-medium text-zinc-900">Rozmiar</h2>
			</div>

			<RadioGroup value={currentSize || ""} className="mt-2" name="size">
				<Label className="sr-only">Wybierz rozmiar</Label>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
					{variants.map((variant) => (
						<div key={variant.id} onClick={() => handleSizeClick(variant.size)}>
							<RadioGroupItem
								value={variant.name}
								id={variant.id}
								className="peer sr-only"
								disabled={!variant.stock}
							/>
							<Label
								htmlFor={variant.id}
								className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover ${
									activeSize === variant.size
										? "bg-black text-white"
										: "hover:bg-black/80 hover:text-white"
								} ${!variant.stock ? "cursor-not-allowed opacity-50" : ""}`}
							>
								<Link
									href={`?size=${variant.size}`}
									scroll={false}
									className="w-full p-4 text-center"
								>
									{variant.size}
								</Link>
							</Label>
						</div>
					))}
				</div>
			</RadioGroup>
		</div>
	);
};
