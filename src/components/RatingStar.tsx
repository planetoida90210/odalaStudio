import clsx from "clsx";
import { StarIcon } from "lucide-react";

export const RatingStar = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => {
	return (
		<div onClick={onClick}>
			<StarIcon
				fill={isActive ? "#f9bc00" : "#D1D5DB"}
				className={clsx(
					"h-4 w-4 cursor-pointer",
					`${!isActive && "text-zinc-300"}`,
					`${isActive && "text-[#f9bc00]"}`,
				)}
				aria-hidden="true"
			/>
		</div>
	);
};
