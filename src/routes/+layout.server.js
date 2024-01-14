/** @type {import('./$types').LayoutServerLoad} */
import {endpoint} from "$lib/js/endpoints"
export async function load({ fetch, cookies }) {
  async function fetchUser() {
    const myCookie = cookies.get("api_key");
    if (myCookie) {
      try {
        const url = `${endpoint}/v1/users`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "ApiKey " + myCookie,
          },
        };
        const res = await fetch(url, options);
        if (res.ok) {
          let data = await res.json();
          // You might want to handle the user data appropriately
          // For now, let's assume you want to share it across pages
          return {
            email: data.email,
            apikey: data.api_key,
            loggedIn: true,
          };
        }
      } catch (error) {
        console.error(error);
      }
    }
    // Return a default value or handle the case when no user is fetched
    return null;
  }

  // Fetch user data and assign it to a variable that will be available in pages
  const userProfile = await fetchUser();

  return {
      userProfile
  };
}