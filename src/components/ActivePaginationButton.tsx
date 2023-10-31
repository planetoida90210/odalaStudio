"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ActivePaginationButton = ({ page }: { page: number }) => {
	const pathname = usePathname();
	const pageNumberSegment = pathname.split("/").pop();
	const currentPageFromPathname = pageNumberSegment ? parseInt(pageNumberSegment, 10) : 1;

	return (
		<Button variant="link" className={cn(page === currentPageFromPathname && "underline")}>
			{page}
		</Button>
	);
};
