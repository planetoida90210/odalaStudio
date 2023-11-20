import Link from "next/link";

const navigation = {
	sklep: [
		{ name: "Ubrania", href: "/categories/Ubrania/1" },
		{ name: "Płyty", href: "/categories/Muzyka/1" },
		{ name: "Beaty", href: "/categories/Beaty/1" },
		{ name: "Nowości", href: "/" },
	],
	pomoc: [
		{ name: "Polityka prywatności", href: "/polityka-prywatnosci" },
		{ name: "Regulamin", href: "/regulamin" },
		{ name: "Zwroty i reklamacje", href: "/" },
		{ name: "Kontakt", href: "/contact" },
	],
	informacje: [
		{ name: "O nas", href: "/" },
		{ name: "Blog", href: "/" },
		{ name: "Praca", href: "/" },
		{ name: "Współpraca", href: "/" },
	],
	ustalenia: [
		{ name: "Prawa autorskie", href: "/" },
		{ name: "Warunki korzystania", href: "/" },
		{ name: "Ochrona danych", href: "/" },
	],
};

export const Footer = () => {
	return (
		<footer className="bg-zinc-950" aria-labelledby="footer-heading">
			<h3 id="footer-heading" className="sr-only">
				Footer
			</h3>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<Link href={"/"} className="block w-fit">
						<span className="block -rotate-6 bg-zinc-50 p-2 text-3xl font-semibold text-zinc-950">
							OdalaStudios
						</span>
					</Link>
					<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
						{Object.entries(navigation).map(([category, links]) => (
							<div key={category}>
								<h3 className="text-sm font-semibold capitalize leading-6 text-zinc-100">
									{category}
								</h3>
								<ul role="list" className="mt-6 space-y-4">
									{links.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="text-sm leading-6 text-zinc-300 hover:text-[#ce9f2c]"
											>
												<p className="capitalize">{item.name}</p>
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
				<p className="mt-20 text-center text-sm text-zinc-200">
					&copy; {new Date().getFullYear()} OdalaStudios. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
