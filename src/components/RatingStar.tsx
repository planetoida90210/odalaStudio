import clsx from "clsx";
import { StarsIcon } from "lucide-react";

export const RatingStar = ({ isActive, onClick }: { isActive: boolean; onClick: () => void }) => {
	return (
		<div onClick={onClick}>
			<StarsIcon
				className={clsx(
					"h-4 w-4",
					`${!isActive && "text-neutral-200"}`,
					`${isActive && "text-amber-600"}`,
				)}
				aria-hidden="true"
			/>
		</div>
	);
};
