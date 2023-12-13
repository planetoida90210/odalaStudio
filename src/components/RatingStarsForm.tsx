import { RatingStar } from "@/components/RatingStar";

export const RatingStarsForm = ({
	value,
	onClick,
}: {
	value: number;
	onClick: (d: number) => void;
}) => {
	return (
		<fieldset name="rating" className="flex items-center space-x-2">
			<input type="hidden" name="rating" value={value} />
			Ocena:
			{Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
				<RatingStar key={i} isActive={i <= value} onClick={() => onClick(i)} />
			))}
		</fieldset>
	);
};
