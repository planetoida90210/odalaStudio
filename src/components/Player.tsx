"use client";
import React, { useState, useEffect, useRef } from "react";
import { AudioControls } from "@/components/AudioControls";

interface PlayerProps {
	url: string;
}

export const Player: React.FC<PlayerProps> = ({ url }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [duration, setDuration] = useState<number>(0);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [volume, setVolume] = useState<number>(1);
	const [isMuted, setIsMuted] = useState<boolean>(false);

	useEffect(() => {
		audioRef.current = new Audio(url);
		audioRef.current.addEventListener("loadedmetadata", () => {
			setDuration(audioRef.current!.duration);
		});

		audioRef.current.addEventListener("timeupdate", () => {
			setCurrentTime(audioRef.current!.currentTime);
		});

		return () => {
			audioRef.current?.pause();
			audioRef.current = null;
		};
	}, [url]);

	useEffect(() => {
		const play = async () => {
			if (audioRef.current) {
				try {
					await audioRef.current.play();
				} catch (e) {
					console.error("Error during playback:", e);
				}
			}
		};

		if (isPlaying) {
			void play();
		} else {
			audioRef.current?.pause();
		}
	}, [isPlaying]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (newVolume: number) => {
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
		if (audioRef.current) {
			audioRef.current.muted = !isMuted;
		}
	};

	return (
		<div className="fixed bottom-0 left-0 right-0">
			<AudioControls
				isPlaying={isPlaying}
				onPlayPauseClick={togglePlayPause}
				duration={duration}
				currentTime={currentTime}
				onTimeChange={(time: number) => {
					setCurrentTime(time);
					if (audioRef.current) {
						audioRef.current.currentTime = time;
					}
				}}
				onVolumeChange={handleVolumeChange}
				volume={volume}
				onMute={toggleMute}
			/>
		</div>
	);
};
