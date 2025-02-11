import { unstable_cache } from "next/cache";

type Props = { timeout: number };

export async function Body({ timeout }: Props) {
	const time = performance.now();
	async function makeFetch() {
		console.log("FETCH");
		const data = await fetch(
			// this api will wait the requested number of milliseconds and then return a random integer
			`https://data-api-xi.vercel.app/api/data?ms=${timeout}`,
			{ cache: "no-store" },
		).then((res) => res.json());
		return data;
	}

	// In this case we have 2 independent unstable_cache calls. The first
	// one returns the data the first time the page is generated.
	//
	// The second one will reuse the data from the first call and it won't make
	// an additional call to the API.
	//
	// When the tag from the 2nd call is revalidated, the 1st call will not be
	// revalidated so what will happen is that the 1st won't be doing anything
	// because its content wasn't revalidated and the 2nd call will be the one
	// that fetches the data.
	//
	// Based on the above, the data is only ever fetched once but the tags
	// can't be updated once they're set because the data used in the first
	// generation of the page never revalidates and that's the one used to set
	// the tags.
	//
	// NOTE: In Vercel the behavior is different as the unstable_cache calls
	// are being deduped, so it works like the double-fetch strategy.

	const getData = unstable_cache(makeFetch, []);
	const data = await getData();

	console.log(
		`(unstable_cache) Render <Body> -- data: ${data.random}, ms: ${data.ms} - 1st fetch duration: ${performance.now() - time}`,
	);

	const time2 = performance.now();
	const getData2 = unstable_cache(makeFetch, [], {
		tags: ["body", "Body", "BODY", "new-tag"],
	});
	const data2 = await getData2();

	console.log(
		`(unstable_cache) Render <Body> -- data: ${data2.random}, ms: ${data2.ms} - 2nd fetch duration: ${performance.now() - time2}`,
	);

	return (
		<p>
			Body {">"} fetch-timeout = {data2.ms}ms -- data: {data2.random}
		</p>
	);
}
