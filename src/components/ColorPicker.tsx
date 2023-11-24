import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ColorVariantType } from "@/types/singleProductTypes";

export const ColorPicker = ({
	currentColor,
	variants,
}: {
	currentColor?: string;
	variants: ColorVariantType[];
}) => {
	return (
		<div className="mt-8">
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-medium text-zinc-900">Dostępne kolory</h2>
			</div>

			<RadioGroup value={currentColor || ""} className="mt-2" name="color">
				<Label className="sr-only">Wybierz kolor</Label>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
					{variants.map((variant) => {
						const isHexColor = variant.name.startsWith("#");
						const backgroundColor = isHexColor ? variant.name : variant.color.toLowerCase();
						const textColor = backgroundColor === "black" ? "white" : "rgba(0, 0, 0, 0.6)";

						return (
							<div key={variant.id}>
								<RadioGroupItem value={variant.color} id={variant.id} className="peer sr-only" />
								<Label
									htmlFor={variant.id}
									className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-checked:border-primary [&:has(.peer-checked)]:border-primary`}
								>
									<Link
										scroll={false}
										href={`?color=${encodeURIComponent(variant.color)}`}
										className="w-full p-4 text-center"
										style={{
											backgroundColor: backgroundColor,
											color: textColor,
										}}
									>
										{isHexColor ? variant.color : variant.name}
									</Link>
								</Label>
							</div>
						);
					})}
				</div>
			</RadioGroup>
		</div>
	);
};
