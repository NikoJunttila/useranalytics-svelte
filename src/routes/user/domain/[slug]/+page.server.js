// @ts-nocheck
import { endpoint } from "$lib/js/endpoints";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {
  try {
    const apiKey = cookies.get("api_key");

    const checkResponse = async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data); // Log the response data
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
    console.log("compare:", compare);
    console.log("total:", total);

    return {
      compare,
      total,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}
