declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_CLIENT_REDIRECT_URL: string;
			GITHUB_ID: string;
			GITHUB_SECRET: string;
			GITHUB_REDIRECT_URL: string;
			DISCORD_ID: string;
			DISCORD_SECRET: string;
			DISCORD_REDIRECT_URL: string;
			SESSION_SECRET: string;
			CLIENT_REDIRECT_URL: string;
		}
	}
}

export {};
