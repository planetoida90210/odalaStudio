"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ActivePaginationButton = ({ page }: { page: number }) => {
	const pathname = usePathname();
	const pageNumberSegment = pathname.split("/").pop();
	const currentPageFromPathname = pageNumberSegment ? parseInt(pageNumberSegment, 10) : 1;

	const isActive = page === currentPageFromPathname;

	const buttonClasses = cn("border-black border hover:text-white hover:bg-black", "text-black", {
		"bg-white": !isActive,
		"bg-black": isActive,
		"text-white": isActive,
	});

	return <Button className={buttonClasses}>{page}</Button>;
};
