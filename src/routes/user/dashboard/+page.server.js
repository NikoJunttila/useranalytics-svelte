import {endpoint} from "$lib/js/endpoints"
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies , setHeaders }) {
    const apiKey = cookies.get("api_key")
    const url = `${endpoint}/v1/feed_follows`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "ApiKey " + apiKey,
      }
    };
    const res = await fetch(url, options);

    const cacheControl = res.headers.get("Cache-Control")
		if (cacheControl) {
			setHeaders({ "Cache-Control": cacheControl })
		}
    if (!res.ok){
      throw error(res.status, "could not fetch domains")
    }
    const domains = await res.json()
    return {
        domains
    };
};