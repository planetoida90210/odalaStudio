"use client";

import { useState } from "react";
import { LucideX, LucideMenu } from "lucide-react";

export const SidebarToggle = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const handleToggle = () => {
		setSidebarOpen(!isSidebarOpen); // Zmienia stan
		const sidebar = document.querySelector(".sidebar-container");
		const body = document.querySelector("body");
		if (sidebar && body) {
			sidebar.classList.toggle("open", !isSidebarOpen);
			body.classList.toggle("body-no-scroll", !isSidebarOpen);
		}
	};

	return <button onClick={handleToggle}>{isSidebarOpen ? <LucideX /> : <LucideMenu />}</button>;
};
