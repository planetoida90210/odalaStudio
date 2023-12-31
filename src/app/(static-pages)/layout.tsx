import React from "react";

export default function StaticLayout({ children }: { children: React.ReactNode }) {
	return <section className="mx-auto my-10 max-w-4xl text-start">{children}</section>;
}
