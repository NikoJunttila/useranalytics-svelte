// @ts-nocheck
import { endpoint } from "$lib/js/endpoints";

/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {
  try {
    const res = await
      fetch(`${endpoint}/v1/example`, {
        method: "GET"
      })
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const cacheControl = res.headers.get("Cache-Control");
    if (cacheControl) {
      setHeaders({ "Cache-Control": cacheControl });
    }
    const total = await res.json();
    return {
      total
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}
