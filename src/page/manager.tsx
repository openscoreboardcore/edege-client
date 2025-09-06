import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useLocalStorage } from "usehooks-ts";

export default function ManagerPage() {
	const WS_URL =
		"ws://" +
		import.meta.env.VITE_SERVER_HOST +
		":" +
		import.meta.env.VITE_SERVER_PORT +
		"/ws";
	const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
		share: false,
		shouldReconnect: () => true,
		reconnectInterval: 3000,
		reconnectAttempts: 10,
	});
	const [scoreTeamA, setScoreTeamA] = useLocalStorage("scoreTeamA", 0);
	const [teamAName, setTeamAName] = useLocalStorage("teamAName", "Thuis");
	const [scoreTeamB, setScoreTeamB] = useLocalStorage("scoreTeamB", 0);
	const [teamBName, setTeamBName] = useLocalStorage("teamBName", "Uit");

	useEffect(() => {
		if (readyState === WebSocket.OPEN) {
			sendJsonMessage({
				type: "publish",
				topic: "match-N2213",
				message: {
					homeTeam: { name: teamAName, score: scoreTeamA },
					awayTeam: { name: scoreTeamB, score: scoreTeamB },
					status: "in_progress",
					time: "",
					part: "",
				},
			});
		}
		console.log({ teamAName, scoreTeamA, teamBName, scoreTeamB });
	}, [
		teamAName,
		scoreTeamA,
		teamBName,
		scoreTeamB,
		readyState,
		sendJsonMessage,
	]);

	return (
		<div>
			<h1 className="text-3xl font-bold underline">ScoreBoard Admin Page</h1>
			<div className="p-4">
				<div className="mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Thuis Team Naam
						</label>
						<input
							type="text"
							value={teamAName}
							onChange={(e) => setTeamAName(e.target.value)}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Thuis Team Score
						</label>
						<input
							type="number"
							value={scoreTeamA}
							onChange={(e) => setScoreTeamA(parseInt(e.target.value, 10))}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>
				</div>
				<div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Uit Team Naam
						</label>
						<input
							type="text"
							value={teamBName}
							onChange={(e) => setTeamBName(e.target.value)}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Uit Team Score
						</label>
						<input
							type="number"
							value={scoreTeamB}
							onChange={(e) => setScoreTeamB(parseInt(e.target.value, 10))}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
