"use client";

import { type UrlObject } from "url";
import React, { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ActiveLink } from "@/components/ActiveLink";
import { getSingleProductById } from "@/api/products";
import { type SingleProductType } from "@/types/singleProductTypes";

export const Breadcrumbs = ({ productId }: { productId: SingleProductType }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [breadcrumbsData, setBreadcrumbsData] = useState([]);

	useEffect(() => {
		const loadProductData = async () => {
			// Tylko dla ścieżki pojedynczego produktu
			if (pathname.includes("/product/") && productId) {
				const productData = await getSingleProductById(productId);
				if (productData) {
					// Ustaw breadcrumb dla kategorii
					const categoryBreadcrumb = productData.categories.map((category) => ({
						name: category.name,
						slug: category.slug,
						href: `/categories/${category.slug}`,
					}));

					// Ustaw breadcrumb dla produktu
					const productBreadcrumb = {
						name:
							productData.name.length > 20
								? `${productData.name.substring(0, 17)}...`
								: productData.name,
						href: pathname,
					};

					setBreadcrumbsData([...categoryBreadcrumb, productBreadcrumb]);
				}
			}
		};

		void loadProductData();
	}, [productId, pathname]);

	return (
		<nav aria-label="breadcrumbs" className="flex items-center text-sm">
			<button onClick={() => router.back()} className="mr-1 flex items-center font-bold">
				<ArrowLeft size={18} className="mr-1" /> Powrót
			</button>
			<ActiveLink href="/" className="mr-1 flex items-center hover:text-yellow-600">
				<Home size={18} className="mr-1" />
			</ActiveLink>
			{breadcrumbsData.map((crumb, index) => (
				<React.Fragment key={index}>
					<ActiveLink href={crumb.href as unknown as UrlObject} className="hover:text-yellow-600">
						{crumb.name}
					</ActiveLink>
					{index < breadcrumbsData.length - 1 && <span className="mx-1">/</span>}
				</React.Fragment>
			))}
		</nav>
	);
};
