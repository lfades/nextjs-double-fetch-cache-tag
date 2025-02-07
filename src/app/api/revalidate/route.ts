import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
	const tag = new URL(request.url).searchParams.get("tag") ?? "";

	console.log(`revalidateTag: ${tag}`);

	revalidateTag(tag);

	return NextResponse.json({ purgedTag: tag });
}
