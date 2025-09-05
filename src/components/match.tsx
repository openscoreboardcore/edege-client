import { Card, CardContent } from "@/components/ui/card";
import pubsub from "@/lib/pubsub";
import { useEffect, useState } from "react";
import Score from "./score";
import TeamCard, { type Team } from "./teamcard";

interface ScoreboardProps {
	homeTeam: Team;
	awayTeam: Team;
	status: string;
	time: string;
	part: string;
}

export default function Scoreboard() {
	const [matchData, setMatchData] = useState<ScoreboardProps | null>(null);

	useEffect(() => {
		const unsubscribe = pubsub.subscribe("match-update", (data) => {
			setMatchData(data);
		});

		return () => unsubscribe();
	}, []);

	if (!matchData) return <div>Loading...</div>;

	return (
		<div className="w-screen h-full bg-black flex items-center justify-center p-2">
			<Card className="w-full h-fit bg-black text-white rounded-2xl shadow-xl border border-gray-700">
				<CardContent className="grid grid-cols-4 md:flex-row items-center justify-between gap-4">
					<TeamCard team={matchData.homeTeam} />

					<Score
						scoreTeamA={matchData.homeTeam.score}
						scoreTeamB={matchData.awayTeam.score}
						matchTime={matchData.time}
						matchPart={matchData.part}
					/>

					<TeamCard team={matchData.awayTeam} />
				</CardContent>
			</Card>
		</div>
	);
}
