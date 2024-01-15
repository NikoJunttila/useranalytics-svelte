// @ts-nocheck
import { endpoint } from "$lib/js/endpoints";
//import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({setHeaders }) {
  try {

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
      fetch(`${endpoint}/v1/example2`, {
        method: "GET",
      }).then(checkResponse),
      fetch(`${endpoint}/v1/example`, {
        method: "GET"
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