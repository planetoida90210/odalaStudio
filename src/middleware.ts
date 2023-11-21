import { authMiddleware } from "@clerk/nextjs";
/* eslint-disable import/no-default-export */
export default authMiddleware({
	publicRoutes: [
		"/",
		"/cart",
		"/cart(.*)",
		"/products/(.*)",
		"/product/(.*)",
		"/search",
		"/search(.*)",
		"/categories",
		"/categories(.*)",
		"/studio",
		"/studio(.*)",
		"/contact",
		"/contact(.*)",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
