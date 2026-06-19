import pubsub from "@/lib/pubsub";
import { useEffect, useState } from "react";
import logo from "../assets/mhcLogoWhite.svg";
import SponsorCarousell from "./SponsorCarousell";

export default function Logo() {
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = pubsub.subscribe("clock-update", (data) => {
			console.log("Received clock update:", data);
			setTime(data);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className="h-screen w-full flex flex-col">
			<div className="flex-grow flex-1 bg-black w-full h-screen grid">
				<img src={logo} alt="Logo" className="m-auto w-[40vh] h-[40vh]" />
				<div className="text-white text-8xl text-center font-mono">{time}</div>
			</div>
			<div className="bg-black w-full">
				<SponsorCarousell />
			</div>
		</div>
	);
}
