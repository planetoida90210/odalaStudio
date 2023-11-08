import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
	isPlaying: boolean;
	onPlayPauseClick: () => void;
	duration: number;
	currentTime: number;
	onTimeChange: (time: number) => void;
	onVolumeChange: (volume: number) => void;
	volume: number;
	onMute: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
	isPlaying,
	onPlayPauseClick,
	duration,
	currentTime,
	onTimeChange,
	onVolumeChange,
	volume,
	onMute,
}) => {
	const formattedTime = (time: number): string => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white">
			<SkipBack size={24} className="cursor-pointer" />
			<button onClick={onPlayPauseClick}>
				{isPlaying ? (
					<Pause size={24} className="cursor-pointer" />
				) : (
					<Play size={24} className="cursor-pointer" />
				)}
			</button>
			<SkipForward size={24} className="cursor-pointer" />
			<div>Czas: {formattedTime(duration)}</div>
			<input
				type="range"
				value={currentTime}
				step="1"
				min="0"
				max={duration}
				onChange={(e) => onTimeChange(Number(e.target.value))}
				className="w-full cursor-pointer bg-gray-700"
			/>
			<div>Current Time: {formattedTime(currentTime)}</div>
			<button onClick={onMute}>
				{volume > 0 ? (
					<Volume2 size={24} className="cursor-pointer" />
				) : (
					<VolumeX size={24} className="cursor-pointer" />
				)}
			</button>
			<input
				type="range"
				value={volume}
				step="0.01"
				min="0"
				max="1"
				onChange={(e) => onVolumeChange(Number(e.target.value))}
				className="w-full cursor-pointer bg-gray-700"
			/>
		</div>
	);
};
