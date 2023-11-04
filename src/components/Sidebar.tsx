import { type UrlObject } from "url";

import { getCategoriesList } from "@/api/categories";
import { ActiveLink } from "@/components/ActiveLink";

export const Sidebar = async () => {
	const categories = await getCategoriesList();
	return (
		<div className="sidebar-container inset-y-0 left-0 top-[120px] flex w-full  transform items-start justify-center bg-white pt-20 transition-transform md:hidden">
			<nav className="sidebar-nav text-center text-xl leading-relaxed">
				<ul className="flex h-full w-full flex-col items-center justify-center gap-16">
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
			</nav>
		</div>
	);
};
