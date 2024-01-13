import {endpoint} from "$lib/js/endpoints"

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
    const apiKey = cookies.get("api_key")
    console.log(apiKey)
    const url = `${endpoint}/v1/feed_follows`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "ApiKey " + apiKey,
      }
    };
    const res = await fetch(url, options);
    const domains = await res.json()
    return {
        domains
    };
};