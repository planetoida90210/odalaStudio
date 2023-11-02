export interface RawVariantData {
	id: string;
	name: string;
	size?: string;
	color?: string;
	stock?: number | null;
}

export type VariantType =
	| {
			type: "ColorVariant";
			id: string;
			name: string;
			color: string;
	  }
	| {
			type: "SizeVariant";
			id: string;
			name: string;
			size: string;
			stock?: number | null;
	  };
