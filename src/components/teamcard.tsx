import logo from "@/assets/mhcLogoWhite.svg";

export interface Team {
	name: string;
	logo: string | null; // URL of the team logo
	score: number;
}

export default function TeamCard({ team }: { team: Team }) {
	return (
		<div className="flex flex-col items-center">
			<img src={team.logo || logo} alt="" className="w-34 h-34" />
			<span className="font-bold text-2xl pt-8">{team.name}</span>
		</div>
	);
}
