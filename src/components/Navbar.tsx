import { type UrlObject } from "url";
import { LucideShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ActiveLink } from "@/components/ActiveLink";
import { SearchInput } from "@/components/SearchInput";
import { getCategoriesList } from "@/api/categories";

const numOfItemsInBag = 0;

export const Navbar = async () => {
	const categories = await getCategoriesList();
	return (
		<nav
			id="navbar"
			className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-6 py-10"
		>
			<Link href={"/"}>
				<span className="block -rotate-6 bg-zinc-950 p-2 text-3xl font-semibold text-zinc-50">
					Odala Studio
				</span>
			</Link>
			<SearchInput />
			<ul className="flex items-center gap-4" role="navigation">
				<ActiveLink
					href={"/"}
					className="border-b-2 border-b-transparent text-lg"
					activeClassName="border-b-2 border-zinc-900 text-lg font-semibold"
				>
					Nowości
				</ActiveLink>
				<ActiveLink
					href={"/products"}
					className="border-b-2 border-b-transparent text-lg"
					activeClassName="border-b-2 border-zinc-900 text-lg font-semibold"
					exact={false}
				>
					Wszystko
				</ActiveLink>
				{categories.map((category) => (
					<ActiveLink
						key={category.id}
						href={`/categories/${category.name}` as unknown as UrlObject}
						className="border-b-2 border-b-transparent text-lg"
						activeClassName="border-b-2 border-zinc-900 text-lg font-semibold"
						exact={false}
					>
						{category.name}
					</ActiveLink>
				))}
				<ActiveLink
					href={"/studio"}
					className="border-b-2 border-b-transparent text-lg"
					activeClassName="border-b-2 border-zinc-900 text-lg font-semibold"
				>
					Studio
				</ActiveLink>
			</ul>
			<Link href={"/cart"} role="button">
				<Button variant={"ghost"} className="flex gap-1 px-2">
					<LucideShoppingBag className={"h-6 w-6 "} />
					<span>{numOfItemsInBag}</span>
				</Button>
			</Link>
		</nav>
	);
};
