"use client";

import { type UrlObject } from "url";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActiveLink } from "@/components/ActiveLink";
import { type BreadcrumbsType } from "@/types/breadcrumbsType";

export const Breadcrumbs = ({ category, productName }: BreadcrumbsType) => {
	const router = useRouter();

	return (
		<nav aria-label="breadcrumbs" className="flex items-center text-sm">
			<button onClick={() => router.back()} className="mr-1 flex items-center font-bold">
				<ArrowLeft width={18} height={18} className="mr-1" /> Powrót
			</button>
			<span className="mx-1">/</span>
			<ActiveLink href="/" className="mr-1 flex items-center hover:text-yellow-600">
				<Home width={18} height={18} />
			</ActiveLink>
			{category && (
				<>
					<span className="mx-1">/</span>
					<ActiveLink
						href={`/categories/${category}` as unknown as UrlObject}
						className="hover:text-yellow-600"
					>
						{category}
					</ActiveLink>
				</>
			)}
			{productName && (
				<>
					<span className="mx-1">/</span>
					<span className="font-semibold">
						{productName.length > 20 ? `${productName.substring(0, 12)}...` : productName}
					</span>
				</>
			)}
		</nav>
	);
};
