export const StockIndicator = ({ stock }: { stock: number }) => {
	const stockMessage = stock > 0 ? `Na stanie: ${stock}` : "Brak w magazynie";

	return (
		<div className="flex items-center justify-center">
			<span className="text-sm font-semibold text-zinc-800">{stockMessage}</span>
		</div>
	);
};
