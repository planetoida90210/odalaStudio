export const StockIndicator = ({ stock }: { stock: number | null | undefined }) => {
	const renderStockNumber = () => {
		if (stock === null || stock === undefined) {
			return (
				<span className="font-base text-sm text-zinc-600">
					Informacja o stanie magazynowym niedostępna
				</span>
			);
		}

		if (stock <= 0) {
			return <span className="font-base text-sm text-zinc-600">Brak w magazynie</span>;
		}

		const isLowStock = stock < 3;
		const stockClass = isLowStock ? "text-red-600" : "text-zinc-600";
		const lowStockMessage = stock === 1 ? " - ostatnia sztuka!" : " - ostatnie sztuki!";

		return (
			<div className="flex gap-2">
				<span className="font-base text-sm text-zinc-600">Na stanie: </span>
				<span className={`font-base text-sm ${stockClass}`}>
					{stock}
					{isLowStock ? lowStockMessage : ""}
				</span>
			</div>
		);
	};

	return <div className="flex items-center justify-center">{renderStockNumber()}</div>;
};
