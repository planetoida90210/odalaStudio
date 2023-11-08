"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export const Player = ({ url, name, image }: { url: string; name: string; image: string }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(1);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	useEffect(() => {
		if (typeof Audio !== "undefined") {
			const audioInstance = new Audio(url);
			audioRef.current = audioInstance;

			const setAudioData = () => {
				setDuration(audioInstance.duration);
			};

			const setAudioTime = () => {
				setCurrentTime(audioInstance.currentTime);
			};

			audioInstance.addEventListener("loadedmetadata", setAudioData);
			audioInstance.addEventListener("timeupdate", setAudioTime);

			return () => {
				audioInstance.removeEventListener("loadedmetadata", setAudioData);
				audioInstance.removeEventListener("timeupdate", setAudioTime);
			};
		}
	}, [url]);

	useEffect(() => {
		const playAudio = async () => {
			if (isPlaying && audioRef.current) {
				try {
					await audioRef.current.play();
				} catch (error) {
					console.error("Playback failed", error);
					setIsPlaying(false);
				}
			} else {
				audioRef.current?.pause();
			}
		};

		void playAudio();

		if (audioRef.current) {
			audioRef.current.volume = volume;
		}

		const handleEnded = () => {
			setIsPlaying(false);
		};

		audioRef.current?.addEventListener("ended", handleEnded);

		return () => {
			audioRef.current?.removeEventListener("ended", handleEnded);
		};
	}, [isPlaying, volume]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="flex flex-col items-center justify-between bg-gray-800 p-4 text-white sm:flex-row">
			{/* Miniaturka produktu */}
			<Image src={image} alt={name} width={48} height={48} className="mr-4 rounded-full" />

			<button
				onClick={togglePlayPause}
				className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700"
			>
				{isPlaying ? "Pause" : "Play"}
			</button>

			<span className="flex-1 truncate">{name}</span>

			<input
				type="range"
				value={currentTime}
				step="1"
				min="0"
				max={duration}
				onChange={(e) => setCurrentTime(Number(e.target.value))}
				className="h-2 flex-1 cursor-pointer rounded-full bg-gray-700"
			/>

			<div className="flex flex-col items-center sm:ml-4 sm:flex-row">
				<span className="mr-2">{formatTime(currentTime)}</span>
				<span>{formatTime(duration - currentTime)}</span>
			</div>

			<div className="ml-4 flex items-center">
				<input
					type="range"
					value={volume}
					step="0.01"
					min="0"
					max="1"
					onChange={(e) => setVolume(Number(e.target.value))}
					className="h-2 w-24 cursor-pointer rounded-full bg-gray-700"
				/>
			</div>
		</div>
	);
};
