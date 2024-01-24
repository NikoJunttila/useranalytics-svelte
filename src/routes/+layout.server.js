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
          return {
            email: data.email,
            apikey: myCookie,
            loggedIn: true,
          };
        }
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  }
  const userProfile = await fetchUser();

  return {
      userProfile
  };
}