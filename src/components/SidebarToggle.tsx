"use client";

import { useState } from "react";
import { LucideX, LucideMenu } from "lucide-react";

export const SidebarToggle = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const handleToggle = () => {
		setSidebarOpen((prevState) => {
			const newState = !prevState;
			if (newState) {
				document.body.classList.add("sidebar-open");
			} else {
				document.body.classList.remove("sidebar-open");
			}
			return newState;
		});
	};

	return <button onClick={handleToggle}>{isSidebarOpen ? <LucideX /> : <LucideMenu />}</button>;
};
