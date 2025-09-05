import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export default function SponsorCarousell({ sponsors }: { sponsors: string[] }) {
	if (sponsors.length === 0) return null;

	return (
		<Carousel
			className="w-full h-fit pb-4 bg-black"
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 6000,
				}),
			]}
		>
			<CarouselContent className="bg-black">
				{Array.from(sponsors).map((src, index) => (
					<CarouselItem key={index}>
						<div className="flex items-center justify-center h-fit bg-black">
							<img
								src={src}
								alt={`Sponsor ${index + 1}`}
								className="object-fit h-32"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
