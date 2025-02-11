import { Body } from "./body";

export const dynamic = "error";

export default async function HomePage() {
	return (
		<main style={{ backgroundColor: "lightgreen", padding: 32 }}>
			<Body timeout={500} />
		</main>
	);
}
