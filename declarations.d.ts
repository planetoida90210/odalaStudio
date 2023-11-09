import "react";

declare module "react" {
	interface CSSProperties {
		"--slider-fill-percentage"?: string;
	}
}
