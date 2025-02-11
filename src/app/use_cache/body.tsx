type Props = { timeout: number };

// NOTE: The `cacheTag` function doesn't work without Next.js Dynamic IO
export async function Body({ timeout }: Props) {
	// "use cache";

	const data = await fetch(
		// this api will wait the requested number of milliseconds and then return a random integer
		`https://data-api-xi.vercel.app/api/data?ms=${timeout}`,
		{
			next: {
				tags: ["body", "Body", "BODY", "new-tag"],
			},
		},
	).then((res) => res.json());

	console.log(`Render <Body> -- data: ${data.random}, ms: ${data.ms}`);

	return (
		<p>
			Body {">"} fetch-timeout = {data.ms}ms -- data: {data.random}
		</p>
	);
}
