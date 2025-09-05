export interface Config {
	apiUrl: string;
	timeout: number;
	scoreboardId: string;
}

export default function config(getParam: string): Config {
	const config = JSON.parse(atob(getParam)) as Partial<Config>;

	return {
		apiUrl: config.apiUrl || "https://api.example.com",
		timeout: config.timeout || 5000,
		scoreboardId: config.scoreboardId || "defaultScoreboard",
	};
}
