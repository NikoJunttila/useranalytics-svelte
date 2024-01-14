// @ts-nocheck
import { endpoint } from "$lib/js/endpoints";
//import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params, setHeaders }) {
  try {
    const apiKey = cookies.get("api_key");

    const checkResponse = async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const cacheControl = response.headers.get("Cache-Control")
      if (cacheControl) {
        setHeaders({ "Cache-Control": cacheControl })
      }
      const data = await response.json();
      return data;
    };

    const [compareResponse, totalResponse] = await Promise.all([
      fetch(`${endpoint}/v1/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain_id: params.slug }),
      }).then(checkResponse),
      fetch(`${endpoint}/v1/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ApiKey " + apiKey,
        },
        body: JSON.stringify({ domain_id: params.slug }),
      }).then(checkResponse),
    ]);
    const compare =  compareResponse;
    const total =  totalResponse;
    return {
      compare,
      total,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}