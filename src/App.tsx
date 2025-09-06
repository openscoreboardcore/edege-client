import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./index.css";

import Index from "./page";
import ManagerPage from "./page/manager";

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

	const [queryParams, setQueryParams] = useState<
		{ mode?: string } | Record<string, string>
	>({});

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const entries = Object.fromEntries(params.entries());
		setQueryParams(entries as { mode?: string } | Record<string, string>);
	}, []);

	if (queryParams?.mode === "manager") {
		return <ManagerPage />;
	}

	return (
		<FullScreen handle={handle}>
			<Index />
			<Toaster />
		</FullScreen>
	);
}
