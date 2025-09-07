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
			<span className="text-3xl text-gray-300 mt-2 font-mono">{matchPart}</span>
			<span className="text-9xl font-extrabold font-mono">
				{scoreTeamA} - {scoreTeamB}
			</span>
			<span className="text-5xl text-gray-300 mt-2 font-mono">{matchTime}</span>
		</div>
	);
}
