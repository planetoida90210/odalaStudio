import { type UrlObject } from "url";
import { LucideShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ActiveLink } from "@/components/ActiveLink";
import { SearchInput } from "@/components/SearchInput";
import { SidebarToggle } from "@/components/SidebarToggle";
import { getCategoriesList } from "@/api/categories";

const numOfItemsInBag = 0;

export const Navbar = async () => {
	const categories = await getCategoriesList();

	return (
		<nav
			id="navbar"
			className="navbar mx-auto flex h-[120px] max-w-7xl items-center justify-center gap-4 p-6 py-10 md:h-[180px] md:items-center"
		>
			<Link href={"/"}>
				<span className="mt-2 block -rotate-6 bg-zinc-950 p-2 font-semibold text-zinc-50 md:text-3xl">
					Odala Studio
				</span>
			</Link>
			<SearchInput />
			<ul className="hidden items-center gap-4 space-x-2 md:flex" role="navigation">
				<ActiveLink
					href={"/"}
					className="text-md border-b-2 border-b-transparent md:text-lg"
					activeClassName="border-b-2 border-zinc-900 text-md md:text-lg font-semibold"
				>
					Nowości
				</ActiveLink>
				<ActiveLink
					href={"/products"}
					className="text-md border-b-2 border-b-transparent md:text-lg"
					activeClassName="border-b-2 border-zinc-900 text-md md:text-lg font-semibold"
					exact={false}
				>
					Wszystko
				</ActiveLink>
				{categories.map((category) => (
					<ActiveLink
						key={category.id}
						href={`/categories/${category.name}` as unknown as UrlObject}
						className="text-md border-b-2 border-b-transparent md:text-lg"
						activeClassName="border-b-2 border-zinc-900 text-md md:text-lg font-semibold"
						exact={false}
					>
						{category.name}
					</ActiveLink>
				))}
				<ActiveLink
					href={"/studio"}
					className="text-md border-b-2 border-b-transparent md:text-lg"
					activeClassName="border-b-2 border-zinc-900 text-md md:text-lg font-semibold"
				>
					Studio
				</ActiveLink>
			</ul>
			<div className="md:hidden">
				<SidebarToggle />
			</div>
			<Link href={"/cart"} role="button">
				<Button variant={"ghost"} className="flex gap-1 px-2">
					<LucideShoppingBag className={"h-6 w-6 "} />
					<span>{numOfItemsInBag}</span>
				</Button>
			</Link>
		</nav>
	);
};
