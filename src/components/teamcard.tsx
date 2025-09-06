// import logo from "@/assets/mhcLogoWhite.svg";

export interface Team {
	name: string;
	logo: string | null; // URL of the team logo
	score: number;
}

export default function TeamCard({ team }: { team: Team }) {
	return (
		<div className="flex flex-col items-center">
			<img
				src={
					team.logo ||
					"https://storage.googleapis.com/publiq_be_production/files/projecten/UDB/_660x660_crop_center-center_82_line/UiTlabel.png"
				}
				alt=""
				className="w-34 h-34 mb-2"
			/>
			<span className="font-bold text-xl">{team.name}</span>
		</div>
	);
}
