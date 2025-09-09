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

	if (!matchData)
		return <div className="text-white bg-black h-full">Loading...</div>;

	return (
		<div className="w-screen h-full bg-black flex items-center justify-center p-2">
			<Card className="w-full h-fit bg-black text-white rounded-2xl shadow-xl border border-black">
				<CardContent className="grid grid-cols-4 md:flex-row items-center justify-between gap-2">
					<TeamCard team={matchData.homeTeam} />
					<div className="col-span-2 w-full h-fit">
						<Score
							scoreTeamA={matchData.homeTeam.score}
							scoreTeamB={matchData.awayTeam.score}
							matchTime={matchData.time}
							matchPart={matchData.part}
						/>
						{matchData.status === "Upcoming" && (
							<div className="text-red-400  text-center text-xl font-bold pt-4">
								Start wedstrijd in hockey.nl app!
							</div>
						)}
					</div>

					<TeamCard team={matchData.awayTeam} />
				</CardContent>
			</Card>
		</div>
	);
}
