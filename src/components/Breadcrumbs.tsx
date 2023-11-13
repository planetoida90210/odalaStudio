"use client";

import { type UrlObject } from "url";
import { Home, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ActiveLink } from "@/components/ActiveLink";

export const Breadcrumbs = () => {
	const router = useRouter();
	const pathname = usePathname();
	const breadcrumbPaths = pathname.split("/").filter((x) => x);

	const breadcrumbLinks = breadcrumbPaths.map((path, index, arr) => {
		// Generate URL for each breadcrumb by joining the path parts
		const href = "/" + arr.slice(0, index + 1).join("/");
		// Last breadcrumb should not be a link
		const isLast = index === breadcrumbPaths.length - 1;

		return (
			<>
				<span key={href} className="flex items-center text-sm">
					{!isLast ? (
						<ActiveLink href={href as unknown as UrlObject} className="hover:text-yellow-600">
							{path}
						</ActiveLink>
					) : (
						<span className="font-semibold">{path}</span>
					)}
				</span>
				{index < breadcrumbPaths.length - 1 && <span className="mx-1">/</span>}
			</>
		);
	});

	return (
		<nav aria-label="breadcrumbs" className="flex items-center text-sm">
			<button onClick={() => router.back()} className="mr-1 flex items-center font-bold">
				<ArrowLeft width={18} height={18} className="mr-1" /> Powrót
			</button>
			<span className="mx-1">/</span>
			<ActiveLink href="/" className="items-cente mr-1 flex">
				<Home width={18} height={18} className="mr-1  hover:text-yellow-600" />
				<span>/</span>
			</ActiveLink>
			{breadcrumbLinks}
		</nav>
	);
};
