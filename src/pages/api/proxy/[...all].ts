import type { APIRoute } from "astro";

const API_HOST: string = "eu.i.posthog.com";
const ASSET_HOST: string = "eu-assets.i.posthog.com";

async function retrieveStatic(
	request: Request,
	pathname: string
): Promise<Response> {
	const response: Response = await fetch(`https://${ASSET_HOST}${pathname}`);
	return new Response(response.body, {
		headers: response.headers,
		status: response.status,
	});
}

async function forwardRequest(
	request: Request,
	pathWithSearch: string
): Promise<Response> {
	const headers: Headers = new Headers(request.headers);
	headers.delete("cookie");

	const response = await fetch(`https://${API_HOST}${pathWithSearch}`, {
		method: request.method,
		headers: headers,
		body:
			request.method != "GET"
				? new Uint8Array(await request.arrayBuffer())
				: undefined,
	});
	return new Response(response.body, {
		headers: response.headers,
		status: response.status,
	});
}

async function handleRequest(request: Request): Promise<Response> {
	const url: URL = new URL(request.url);
	const pathname: string = url.pathname.split("/api/proxy")[1];
	const search: string = url.search;
	const pathWithParams: string = pathname + search;

	if (pathname.startsWith("/static/")) {
		return retrieveStatic(request, pathWithParams);
	} else {
		return forwardRequest(request, pathWithParams);
	}
}

export const ALL: APIRoute = async ({ request }) => {
	return handleRequest(request);
};
