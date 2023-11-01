export type VariantType =
	| {
			type: "ColorVariant";
			id: string;
			name: string;
			color: string;
	  }
	| {
			type: "SizeColorVariant";
			id: string;
			name: string;
			size: string;
			color: string;
	  }
	| {
			type: "SizeVariant";
			id: string;
			name: string;
			size: string;
	  };
