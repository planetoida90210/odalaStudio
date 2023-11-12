"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { SoundSlider } from "@/components/SoundSlider";
import { Button } from "@/components/ui/button";

export const Player = ({ url, name, image }: { url: string; name: string; image: string }) => {
	const audioRef = useRef<HTMLAudioElement>(new Audio(url));
	const pathname = usePathname();

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
		const audioInstance = audioRef.current;

		const setAudioData = () => {
			setDuration(audioInstance.duration);
		};

		const setAudioTime = () => {
			setCurrentTime(audioInstance.currentTime);
		};

		audioInstance.addEventListener("loadedmetadata", setAudioData);
		audioInstance.addEventListener("timeupdate", setAudioTime);

		if (isPlaying) {
			audioInstance.play().catch(console.error);
		}

		audioInstance.addEventListener("ended", () => setIsPlaying(false));

		return () => {
			audioInstance.pause();
			audioInstance.removeEventListener("loadedmetadata", setAudioData);
			audioInstance.removeEventListener("timeupdate", setAudioTime);
			audioInstance.removeEventListener("ended", () => setIsPlaying(false));
		};
	}, [url, isPlaying]);

	useEffect(() => {
		const audioInstance = audioRef.current;
		audioInstance.volume = volume;
	}, [volume]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		const stopAudio = () => {
			const audioInstance = audioRef.current;
			if (isPlaying) {
				audioInstance.pause();
				setIsPlaying(false);
			}
		};

		stopAudio();
	}, [pathname]);

	return (
		<div className="flex items-center justify-between rounded bg-gray-100 p-4 text-black sm:flex-row">
			<Image
				src={image}
				alt={name}
				width={48}
				height={48}
				className="mr-4 hidden rounded-full md:block"
			/>

			<Button
				variant="outline"
				onClick={togglePlayPause}
				className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow"
			>
				{isPlaying ? (
					<PauseIcon className="h-8 w-8 text-black" />
				) : (
					<PlayIcon className="mx-auto h-8 w-8 text-black" />
				)}
			</Button>

			<span className="flex-1 truncate">{name}</span>
			<div className="mr-4 flex w-full items-center justify-end gap-4">
				<div className="w-full">
					<SoundSlider
						min={0}
						max={duration}
						value={currentTime}
						step={1}
						onChange={(value) => {
							setCurrentTime(value);
							if (audioRef.current) {
								audioRef.current.currentTime = value;
							}
						}}
						formatTime={formatTime}
					/>
				</div>
				<div className="hidden md:block">
					<SoundSlider
						min={0}
						max={1}
						value={volume}
						step={0.01}
						onChange={(value) => setVolume(value)}
						formatTime={undefined}
					/>
				</div>
			</div>
		</div>
	);
};
