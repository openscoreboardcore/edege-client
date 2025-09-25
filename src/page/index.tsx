import Match from "@/components/match";
import useWebSocket from "react-use-websocket";

import SponsorCarousell from "@/components/SponsorCarousell";
import pubsub from "@/lib/pubsub";
import topicRouter from "@/lib/ws/handelSocketMessages";
import { useEffect, useState } from "react";
import logo from "../assets/mhcLogoWhite.svg";

export type Status = "off" | "logo" | "match" | "sponsor" | "schema";
export type wsMessage = {
	topic: string;
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	message: any;
};

export default function Index() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [status, setStatus] = useState<Status>("off");
	const [currentMatchId, setCurrentMatchId] = useState<string>("");

	const WS_URL =
		"ws://" +
		import.meta.env.VITE_SERVER_HOST +
		":" +
		import.meta.env.VITE_SERVER_PORT +
		"/ws";
	const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
		share: false,
		shouldReconnect: () => true,
		onMessage: (event) => {
			if (!event.data) return;
			if (event.data === "Success") return;
			try {
				const data =
					typeof event.data === "string"
						? JSON.parse(event.data)
						: (event.data as wsMessage);
				topicRouter.dispatch(
					data?.topic,
					data?.type,
					data?.message,
					sendJsonMessage
				);
			} catch (err) {
				console.error("Failed to parse WebSocket message:", err);
			}
		},
		onError: (error) => {
			console.error("WebSocket error:", error);
		},
		reconnectInterval: 3000,
		reconnectAttempts: 10,
	});

	useEffect(() => {
		if (readyState === WebSocket.OPEN) {
			sendJsonMessage({
				type: "subscribe",
				topic: "field-" + import.meta.env.VITE_FIELD_ID,
			});
			sendJsonMessage({
				type: "subscribe",
				topic: "screen-" + import.meta.env.VITE_SCREEN_ID,
			});
			if (currentMatchId && currentMatchId !== "") {
				sendJsonMessage({
					type: "subscribe",
					topic: `match-${currentMatchId}`,
				});
			}
		}
	}, [readyState, sendJsonMessage]);

	useEffect(() => {
		const unsubscribe = pubsub.subscribe("screen-update", (data) => {
			setStatus((prevStatus) => {
				if (prevStatus !== data) {
					console.log("New status", data, "previous", prevStatus);
					return data;
				}
				return prevStatus;
			});
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = pubsub.subscribe("matchID-update", (data) => {
			setCurrentMatchId((prevId) => {
				if (prevId !== data) {
					sendJsonMessage({ type: "unsubscribe", topic: "all" }); // reset socket
					return data;
				}
				return prevId;
			});
		});
		return () => unsubscribe();
	}, []);

	const sponsorLogos = [
		// "https://swinckels.com/etc/designs/swinckels/images/logo-swinkels.png",
		// "/mhc-rabo.png",
		"/MHC-Ben-JIJ-GOUD-WAARD.png",
		"/MHC-GEZOCHT-BAR.png",
		"/MHC-clubactie-1.png",
	] as string[];

	switch (status) {
		case "off":
			return <div className="bg-black w-full h-screen"></div>;

		case "logo":
			return (
				<div className="h-screen w-full flex flex-col">
					<div className="flex-grow bg-black w-full h-screen grid">
						<img src={logo} alt="Logo" className="m-auto w-[50vh] h-[50vh]" />
					</div>
					<div>
						<SponsorCarousell sponsors={sponsorLogos} />
					</div>
				</div>
			);
		case "match":
			return (
				<div className="h-screen w-full flex flex-col">
					<div className="flex-grow">
						<Match />
					</div>
					<div>
						<SponsorCarousell sponsors={sponsorLogos} />
					</div>
				</div>
			);
		case "sponsor":
			return (
				<div className="h-screen w-full flex items-center bg-black">
					<SponsorCarousell sponsors={sponsorLogos} />
				</div>
			);
		case "schema":
			return <div>Schema</div>;
		default:
			return <div className="bg-black w-full h-screen"></div>;
	}
}
