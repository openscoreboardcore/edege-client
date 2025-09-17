export interface Team {
	name: string;
	logo: string; // URL of the team logo
	score: number;
}

export default function TeamCard({ team }: { team: Team }) {
	// const type = team.name.toLocaleLowerCase().includes("flevoland")
	// 	? "home"
	// 	: "away";

	// const [logoSrc, setLogoSrc] = useState<string>(
	// 	type === "home" ? logo : team.logo || uit
	// );

	// useEffect(() => {
	// 	if (team.logo && type === "away") {
	// 		const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(
	// 			team.logo
	// 		)}`;
	// 		removeBackground(proxiedUrl).then((blob: Blob) => {
	// 			setLogoSrc(URL.createObjectURL(blob));
	// 		});
	// 	}
	// 	console.log(team.logo);
	// }, [team.logo, type]);

	return (
		<div className="flex flex-col items-center">
			<img src={team.logo} alt="" className="w-34 h-34 object-contain" />
			<span className="font-bold text-2xl pt-8">{team.name}</span>
		</div>
	);
}
