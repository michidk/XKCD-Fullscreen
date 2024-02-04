import { fetchWithTimeout } from "./utils";

const HOST = 'https://xkcd.com/';

const BLACKLIST = [
  // Interactive comics (https://www.explainxkcd.com/wiki/index.php/Category:Interactive_comics)
  826, // Guest Week: Zach Weiner (SMBC)
  1110, // Click and Drag
  1350, // Lorenz
  1416, // Pixels
  1506, // xkcloud
  1525, // Emojic 8 Ball
  1608, // Hoverboard
  1663, // Garden
  1975, // Right Click
  2067, // Challengers
  2131, // Emojidome
  2198, // Throw
  2288, // Collector's Edition
  2445, // Checkbox
  2601, // Instructions
  2712, // Gravity
  2765  // Escape Speed
];

export type ComicResponse = {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
};

export async function getByIndex(number: number): Promise<ComicResponse> {
  const response = await fetchWithTimeout(`${HOST}${number}/info.0.json`, { method: 'GET' });
  if (!response.ok) throw new Error(`Could not fetch comic #${number}! HTTP error: ${response.statusText} (${response.status})`);
  const data: ComicResponse = await response.json();
  return data;
}

export async function getLatest(): Promise<ComicResponse> {
  const response = await fetchWithTimeout(`${HOST}/info.0.json`, { method: 'GET' });
  if (!response.ok) throw new Error(`Could not fetch latest comic! HTTP error: ${response.statusText} (${response.status})`);
  const data: ComicResponse = await response.json();
  return data;
}

export async function getRandom(): Promise<ComicResponse> {
  const latestComic = await getLatest();
  if (typeof latestComic === 'string') throw new Error(latestComic);

  let whitelistedRandom: number | undefined = undefined;
  do {
    whitelistedRandom = randomIntFromInterval(1, latestComic.num);
  } while (BLACKLIST.includes(whitelistedRandom));
  return getByIndex(whitelistedRandom);
}

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
