import { type UrlObject } from "url";
import Link from "next/link";
import { ActivePaginationButton } from "@/components/ActivePaginationButton";

export const Pagination = ({ numOfPages, baseUrl }: { numOfPages: number; baseUrl: string }) => {
	return (
		<nav>
			<ul aria-label="pagination" className="mt-4 flex items-center justify-center gap-4">
				{numOfPages === 0 ? (
					<li>
						<Link href={`/${baseUrl}/${1}` as unknown as UrlObject}>
							<ActivePaginationButton page={1} />
						</Link>
					</li>
				) : (
					Array.from({ length: numOfPages }, (_, i) => i + 1).map((page) => {
						return (
							<li key={page}>
								<Link href={`/${baseUrl}/${page}` as unknown as UrlObject}>
									<ActivePaginationButton page={page} />
								</Link>
							</li>
						);
					})
				)}
			</ul>
		</nav>
	);
};
