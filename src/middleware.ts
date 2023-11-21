import { authMiddleware } from "@clerk/nextjs";
/* eslint-disable import/no-default-export */
export default authMiddleware({
	publicRoutes: [
		"/",
		"/cart",
		"/products",
		"/products(.*)",
		"/search",
		"/search(.*)",
		"/categories",
		"/categories(.*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
