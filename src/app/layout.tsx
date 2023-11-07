import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import { Player } from "@/components/Player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Odala Studios",
	description: "Odala Studios sklep z płytami CD, Vinylami i ubraniami od Waco.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const testAudioUrl = "https://media.graphassets.com/hWp1ztnwRRWPKxxrmHg8";
	return (
		<html lang="pl" className="h-full">
			<body className={`${inter.className} flex min-h-screen flex-col`}>
				<Navbar />
				<Sidebar />
				<div className="flex-1" style={{ minHeight: "calc(100vh - var(--navbar-height))" }}>
					{children}
				</div>
				<Footer />
				<Player url={testAudioUrl} />
			</body>
		</html>
	);
}
