// @ts-nocheck
import { endpoint } from "$lib/js/endpoints";
/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params, setHeaders }) {
  try {
    const apiKey = cookies.get("api_key");
    if (!apiKey) {
      throw error(401, "Unauthorized: API key not found");
    }
    const res = await fetch(`${endpoint}/v1/domain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "ApiKey " + apiKey,
      },
      body: JSON.stringify({ domain_id: params.slug }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const cacheControl = res.headers.get("Cache-Control");
    if (cacheControl) {
      setHeaders({ "Cache-Control": cacheControl });
    }
    const total = await res.json();
    return {
      streamed : {
        total: total
      }
      /* total */
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}
