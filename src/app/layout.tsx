import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { plPL } from "@clerk/localizations";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Odala Studios",
	description: "Odala Studios sklep z płytami CD, Vinylami i ubraniami od Waco.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider localization={plPL}>
			<html lang="pl" className="h-full">
				<body className={`${inter.className} flex min-h-screen flex-col`}>
					<Navbar />
					<Sidebar />
					<div style={{ minHeight: "calc(100vh - var(--navbar-height))" }}>{children}</div>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
