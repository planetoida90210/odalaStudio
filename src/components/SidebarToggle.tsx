"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LucideX, LucideMenu } from "lucide-react";
import { Button } from "./ui/button";

export const SidebarToggle = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const closeSidebar = () => {
			setSidebarOpen(false);
			document.body.classList.remove("sidebar-open", "no-scroll");
		};

		if (isSidebarOpen) {
			closeSidebar();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);
	const handleToggle = () => {
		setSidebarOpen((prevState) => {
			const newState = !prevState;
			if (newState) {
				document.body.classList.add("sidebar-open", "no-scroll");
			} else {
				document.body.classList.remove("sidebar-open", "no-scroll");
			}
			return newState;
		});
	};

	return (
		<Button variant={"ghost"} onClick={handleToggle}>
			{isSidebarOpen ? <LucideX height={24} width={24} /> : <LucideMenu height={24} width={24} />}
		</Button>
	);
};
