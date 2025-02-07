type Props = { timeout: number };

export async function Body({ timeout }: Props) {
	const data = await fetch(
		// this api will wait the requested number of milliseconds and then return a random integer
		`https://data-api-xi.vercel.app/api/data?ms=${timeout}`,
		{
			next: {
				tags: ["body", "Body", "BODY"],
			},
		},
	).then((res) => res.json());

	console.log(`Render <Body> -- data: ${data.random}, ms: ${data.ms}`);

	const time = performance.now();
	const data2 = await fetch(
		// this api will wait the requested number of milliseconds and then return a random integer
		`https://data-api-xi.vercel.app/api/data?ms=${timeout}`,
		{
			next: {
				tags: ["body", "Body", "BODY", "new-tag"],
			},
		},
	).then((res) => res.json());

	console.log(
		`Render <Body> -- data: ${data2.random}, ms: ${data2.ms} - 2nd fetch duration: ${performance.now() - time}`,
	);

	return (
		<p>
			Body {">"} fetch-timeout = {data.ms}ms -- data: {data.random}
		</p>
	);
}
