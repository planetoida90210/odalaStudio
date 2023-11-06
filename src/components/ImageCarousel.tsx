"use client";
import Image from "next/image";
import { useState } from "react";

export const ImageCarousel = ({ images }) => {
	const [selectedImage, setSelectedImage] = useState(images[0]);

	const handleThumbnailClick = (image) => {
		setSelectedImage(image);
	};

	return (
		<div className="relative">
			{/* Main image display */}
			<div className="lg:flex lg:justify-center">
				<Image
					width={696}
					height={696}
					src={selectedImage.url}
					alt="Main Image"
					className="rounded-lg"
				/>
				{/* TODO: Add left and right navigation buttons here */}
			</div>
			{/* Thumbnails or Bullets */}
			<div className="hidden lg:flex lg:justify-center lg:gap-2">
				{images.map((image, index) => (
					<button
						key={index}
						className={`rounded-full p-1 ${
							selectedImage === image ? "ring-2 ring-indigo-500 ring-offset-2" : ""
						}`}
						onClick={() => handleThumbnailClick(image)}
					>
						<Image
							width={100}
							height={100}
							src={image.url}
							alt="Thumbnail"
							className="rounded-lg"
						/>
					</button>
				))}
			</div>
			{/* Bullets for smaller screens */}
			<div className="flex items-center justify-center lg:hidden">
				{images.map((image, index) => (
					<span
						key={index}
						className={`mx-1 inline-block h-2 w-2 rounded-full ${
							selectedImage === image ? "bg-indigo-500" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
};
