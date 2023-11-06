import { HomeTrendingProducts } from "@/components/HomeTrendingProducts";
import { MainBanner } from "@/components/MainBanner";

export default function HomePage() {
	return (
		<section>
			<MainBanner />
			<HomeTrendingProducts />
		</section>
	);
}
