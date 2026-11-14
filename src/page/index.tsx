import Match from "@/components/match";
import useWebSocket from "react-use-websocket";

import Logo from "@/components/logo";
import SponsorCarousell from "@/components/SponsorCarousell";
import pubsub from "@/lib/pubsub";
import topicRouter from "@/lib/ws/handelSocketMessages";
import { useEffect, useState } from "react";

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

	const url = new URL(window.location.href);
	const fieldParam = url.searchParams.get("field");
	console.log("", fieldParam);

	const filedID = fieldParam ? fieldParam : import.meta.env.VITE_FIELD_ID;

	const wsSSL = import.meta.env.VITE_USE_WS_SSL === "true";
	const wsProtocol = wsSSL ? "wss://" : "ws://";

	const WS_URL =
		wsProtocol +
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
					sendJsonMessage,
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
		if (readyState !== WebSocket.OPEN) return;

		sendJsonMessage({
			type: "subscribe",
			topic: `field-${filedID}`,
		});

		sendJsonMessage({
			type: "subscribe",
			topic: "clock",
		});
	}, [readyState, sendJsonMessage, filedID]);

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
		if (readyState !== WebSocket.OPEN) return;

		// Remove all previous match subscriptions.
		sendJsonMessage({
			type: "unsubscribe",
			topic: "match-*",
		});

		// Subscribe to the currently assigned match, if any.
		if (currentMatchId) {
			sendJsonMessage({
				type: "subscribe",
				topic: `match-${currentMatchId}`,
			});
		}
	}, [currentMatchId, readyState, sendJsonMessage]);

	useEffect(() => {
		const unsubscribe = pubsub.subscribe("matchID-update", (data) => {
			const nextMatchId = data == null ? "" : String(data);

			setCurrentMatchId((prevId) =>
				prevId === nextMatchId ? prevId : nextMatchId,
			);
		});

		return () => unsubscribe();
	}, []);

	switch (status) {
		case "off":
			return <div className="bg-black w-full h-screen"></div>;

		case "logo":
			return <Logo />;
		case "match":
			if (!currentMatchId) return <Logo />;
			return (
				<div className="h-screen w-full flex flex-col">
					<div className="flex-grow">
						<Match key={currentMatchId} />
					</div>
					<div>
						<SponsorCarousell />
					</div>
				</div>
			);
		case "sponsor":
			return (
				<div className="h-screen w-full flex items-center bg-black">
					<SponsorCarousell />
				</div>
			);
		case "schema":
			return <div>Schema</div>;
		default:
			return <div className="bg-black w-full h-screen"></div>;
	}
}
