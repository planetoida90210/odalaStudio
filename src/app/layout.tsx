import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Odala Studios",
	description: "Odala Studios sklep z płytami CD, Vinylami i ubraniami od Waco.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pl">
			<body className={inter.className}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
