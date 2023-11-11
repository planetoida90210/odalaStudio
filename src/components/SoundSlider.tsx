export const SoundSlider = ({
	min,
	max,
	value,
	step,
	onChange,
	formatTime,
}: {
	min: number;
	max: number;
	value: number;
	step: number;
	onChange: (value: number) => void;
	formatTime?: (time: number) => string;
}) => {
	const sliderFillStyle: React.CSSProperties = {
		"--slider-fill-percentage": `${(value / max) * 100}%`,
	};

	return (
		<div className="flex items-center">
			<div className="relative w-full">
				{formatTime && (
					<div className="absolute -top-5 left-0 right-0 mx-2 flex justify-between">
						<span className="text-xs text-gray-700">{formatTime(value)}</span>
						<span className="text-xs text-gray-700">{formatTime(max - value)}</span>
					</div>
				)}
				<div className="slider relative">
					<div className="slider-track"></div>
					<div
						className="slider-fill"
						style={{ width: sliderFillStyle["--slider-fill-percentage"] }}
					></div>
					<input
						className="slider-thumb"
						type="range"
						min={min}
						max={max}
						value={value}
						step={step}
						onChange={(e) => onChange(Number(e.target.value))}
						style={sliderFillStyle}
					/>
				</div>
			</div>
		</div>
	);
};
