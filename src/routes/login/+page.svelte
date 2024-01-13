<script>
// @ts-nocheck
import { userProfile } from "$lib/stores/userStore";
import { notifications } from "$lib/stores/notifications";
import { goto } from "$app/navigation";
import {endpoint} from "$lib/js/endpoints"
let user = {
    email: "",
    password: ""
}

async function login(){
    try {
      const response = await fetch(`${endpoint}/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await response.json();
      if (response.ok) {
        notifications.success("Succesfully loggedIn", 2000);
        console.log(data);
        document.cookie = `api_key=${data.api_key}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
        console.log("API key has been set as a cookie.");
        $userProfile = {
          name: data.name,
          email: data.email,
          apikey: data.api_key,
          loggedIn: true,
        };
        setTimeout(() => goto("/user/dashboard"), 500);
      } else {
        notifications.warning("wrong password/email", 2000);
        console.error("Error:", response.text, response.statusText);
      }
    } catch (error) {
      notifications.danger(error, 3000);
      console.error("Error:", error);
    }
}

</script>
<div class="flex flex-col justify-center items-center gap-2">
    <form class="flex flex-col" on:submit|preventDefault={login}>
        <label for="name">Email:</label>
        <input bind:value={user.email} type="text" placeholder="email" />
        <label for="name">Password:</label>
        <input bind:value={user.password} type="password" placeholder="password" />
    <button class="btn mt-2">Login</button>
</form>
<div class="flex gap-2">
    <button class="btn">forgot password?</button><button class="btn">create</button>
</div>
</div>