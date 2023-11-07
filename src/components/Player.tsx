"use client";

import React, { useState, useEffect, useRef } from "react";

interface PlayerProps {
	url: string;
}

export const Player: React.FC<PlayerProps> = ({ url }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [duration, setDuration] = useState<number>(0);
	const [currentTime, setCurrentTime] = useState<number>(0);

	useEffect(() => {
		audioRef.current = new Audio(url);

		const setAudioData = () => {
			setDuration(audioRef.current!.duration);
			setCurrentTime(audioRef.current!.currentTime);
		};

		const setAudioTime = () => setCurrentTime(audioRef.current!.currentTime);

		audioRef.current.addEventListener("loadeddata", setAudioData);
		audioRef.current.addEventListener("timeupdate", setAudioTime);

		return () => {
			if (audioRef.current) {
				audioRef.current.removeEventListener("loadeddata", setAudioData);
				audioRef.current.removeEventListener("timeupdate", setAudioTime);
			}
		};
	}, [url]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
		if (!isPlaying) {
			void audioRef.current?.play().catch((e) => {
				console.error("Error trying to play the audio:", e);
			});
		} else {
			audioRef.current?.pause();
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60) || 0;
		const seconds = Math.round(time - minutes * 60) || 0;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-white p-4">
			<button
				onClick={togglePlayPause}
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				{isPlaying ? "Pause" : "Play"}
			</button>
			<div>Duration: {formatTime(duration)}</div>
			<div>Current Time: {formatTime(currentTime)}</div>
			<input
				type="range"
				value={currentTime}
				step="1"
				min="0"
				max={duration}
				onChange={(e) => {
					const time = Number(e.target.value);
					setCurrentTime(time);
					if (audioRef.current) {
						audioRef.current.currentTime = time;
					}
				}}
				className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
			/>
		</div>
	);
};
