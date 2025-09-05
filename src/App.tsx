import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./index.css";

import Index from "./page";

export default function App() {
	const handle = useFullScreenHandle();

	// Attempt to enter fullscreen on first click
	useEffect(() => {
		const enter = () => {
			if (!handle.active) handle.enter();
			window.removeEventListener("click", enter);
		};
		window.addEventListener("click", enter);
		return () => window.removeEventListener("click", enter);
	}, [handle]);

	return (
		<FullScreen handle={handle}>
			<Index />
			<Toaster />
		</FullScreen>
	);
}
