import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="z-100 flex h-screen flex-col items-center py-6">
			<SignUp />
		</div>
	);
}
