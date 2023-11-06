"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Button } from "./ui/button";

export const ImageCarousel = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const goToPrevious = () => {
		setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
	};

	const goToNext = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const goToSlide = (index) => {
		setActiveIndex(index);
	};

	// Function to get the next image index for md screens
	const getNextIndexForMd = (currentIndex, imagesArray) => {
		const nextIndex = currentIndex + 1 >= imagesArray.length ? 0 : currentIndex + 1;
		return imagesArray[nextIndex];
	};

	return (
		<div className="relative flex items-center lg:items-start">
			{/* Thumbnails for lg and larger screens */}
			<div className="hidden lg:mr-4 lg:flex lg:flex-col lg:space-y-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						aria-label={`Go to image ${index + 1}`}
						className={`h-12 w-12 ${
							index === activeIndex ? "ring-2 ring-indigo-500 ring-offset-2" : ""
						}`}
					>
						<Image
							width={48}
							height={48}
							src={image.url}
							alt={`Thumbnail ${index}`}
							className="rounded-lg"
						/>
					</button>
				))}
			</div>

			{/* Main image container */}
			<div className="flex-grow">
				{/* Image for lg and larger */}
				{images.length > 0 && (
					<div className="hidden lg:block">
						<Image
							width={696}
							height={696}
							src={images[activeIndex].url}
							alt={`Image ${activeIndex}`}
							className="rounded-lg"
						/>
					</div>
				)}

				{/* Images for md only */}
				<div className="hidden md:flex lg:hidden">
					<div className="w-1/2">
						<Image
							width={348}
							height={348}
							src={images[activeIndex].url}
							alt={`Image ${activeIndex}`}
							className="rounded-lg"
						/>
					</div>
					<div className="w-1/2">
						<Image
							width={348}
							height={348}
							src={getNextIndexForMd(activeIndex, images).url}
							alt={`Image ${getNextIndexForMd(activeIndex, images).alt}`}
							className="rounded-lg"
						/>
					</div>
				</div>

				{/* Single image for sm and smaller */}
				<div className="block md:hidden">
					<Image
						width={348}
						height={348}
						src={images[activeIndex].url}
						alt={`Image ${activeIndex}`}
						className="mx-auto rounded-lg"
					/>
				</div>

				{/* Navigation buttons centered */}
				{images.length > 1 && (
					<>
						<Button
							variant={"outline"}
							onClick={goToPrevious}
							aria-label="Previous image"
							className="absolute left-0 z-10 rounded-full lg:-left-12 lg:top-1/2 lg:-translate-y-1/2 lg:transform"
						>
							<ChevronLeft className="h-6 w-6" />
						</Button>
						<Button
							variant={"outline"}
							onClick={goToNext}
							aria-label="Next image"
							className="absolute right-0 z-10 rounded-full lg:-right-12 lg:top-1/2 lg:-translate-y-1/2 lg:transform"
						>
							<ChevronRight className="h-6 w-6" />
						</Button>
					</>
				)}
			</div>

			{/* Bullets for md and smaller screens */}
			<div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4 md:hidden">
				{images.map((_, index) => (
					<button
						key={index}
						className={`h-3 w-3 rounded-full ${index === activeIndex ? "bg-black" : "bg-gray-300"}`}
						onClick={() => goToSlide(index)}
						aria-label={`Go to image ${index + 1}`}
					>
						<Circle className="h-3 w-3" />
					</button>
				))}
			</div>
		</div>
	);
};
