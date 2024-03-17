"use server";

import { type ComicResponse, getByIndex, getRandom } from "@/lib/xkcd";

type Props = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: Props) {
	const searchParams = props.searchParams;
	const comicId = searchParams.id as string;
	const comicNumber = Number.parseInt(comicId, 10);

	try {
		let comic: ComicResponse | undefined = undefined;
		if (comicNumber) {
			comic = await getByIndex(comicNumber);
		} else {
			comic = await getRandom();
		}

		return (
			<div className="flex flex-col justify-center items-center h-screen p-4 text-center">
				<h1 className="text-4xl font-bold text-gray-800 pb-2">
					XKCD #{comic.num}: {comic.title}
				</h1>
				<div className="flex-grow flex justify-center items-center">
					<img
						src={comic.img}
						alt={comic.alt}
						style={{
							maxHeight: "calc(100vh - 8rem)",
							objectFit: "contain",
							width: "auto",
							maxWidth: "100%",
							minHeight: "35vh", // Zoom a bit in, because image is rather small on big screens
						}}
					/>
				</div>
				<p className="mt-4 mb-[50px] mx-72 text-2xl italic text-center">
					{comic.alt}
				</p>
				<div className="fixed bottom-3 text-xl left-5 text-left">
					www.xkcd.com
				</div>
				<div className="fixed bottom-3 text-xl right-5 text-right">
					github.com/michidk/XKCD-Fullscreen
				</div>
			</div>
		);
	} catch (error) {
		console.error(error);
		return <div>Failed to load comic.</div>;
	}
}
