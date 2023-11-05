export default async function SearchLoading() {
	return (
		<main className="mx-auto min-h-screen max-w-7xl" aria-busy="true">
			<h1 className="pb-20 text-4xl font-extrabold first-letter:uppercase" role="heading">
				Wyniki wyszukiwania
			</h1>
			<p className="pb-20 text-2xl font-extrabold first-letter:uppercase" role="heading">
				Szukam....
			</p>
		</main>
	);
}
