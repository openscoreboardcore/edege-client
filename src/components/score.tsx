// import Countdown from "react-countdown";

// const Completionist = () => <span>00:00</span>;

export default function Score({
	scoreTeamA,
	scoreTeamB,
	matchTime,
	matchPart,
}: {
	scoreTeamA: number;
	scoreTeamB: number;
	matchTime: string;
	matchPart: string;
}) {
	return (
		<div className="flex flex-col items-center col-span-2">
			<span className="text-3xl text-gray-400 mt-2">{matchPart}</span>
			<span className="text-9xl font-extrabold">
				{scoreTeamA} - {scoreTeamB}
			</span>
			<span className="text-6xl text-gray-400 mt-2">
				{/* <Countdown date={Date.now(matchTime) + 5000}>
					<Completionist />
				</Countdown> */}
				{matchTime}
			</span>
		</div>
	);
}
