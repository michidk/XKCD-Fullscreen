function urlify(url: string): string {
	if (url.startsWith("http") || url.startsWith("https")) {
		return url;
	}
	return `https://${url}`;
}

function getServerUrl(): string {
	return urlify(
		process.env.NEXT_PUBLIC_SITE_URL ||
			process.env.NEXT_PUBLIC_VERCEL_URL ||
			process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ||
			"http://localhost:3000",
	);
}

export type SiteConfig = typeof site;
export const site = {
	name: "XKCD Fullscreen",
	description: "A simple XKCD fullscreen viewer built for digitale signage.",
	links: {
		github: "https://github.com/michidk/XKCD-Fullscreen",
	},
	url: getServerUrl(),
};
