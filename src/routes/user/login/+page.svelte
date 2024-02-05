<script>
  // @ts-nocheck
  import { userProfile } from "$lib/stores/userStore";
  import { notifications } from "$lib/stores/notifications";
  import { goto } from "$app/navigation";
  import {endpoint} from "$lib/js/endpoints"
  import { loading } from "$lib/stores/loader.js";
  let user = {
      email: "",
      password: ""
  }
  let forgotEmail = ""
  async function reset(){
    try {
      const response = await fetch(`${endpoint}/v1/forgotPass`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email:forgotEmail}),
        });
        if (response.ok) {
          notifications.success("Email sent! Go to your email to reset password", 5000);
          forgotEmail = "";
        }
    } catch (err) {
      notifications.danger(error, 4000); 
    }
  }
  async function login(){
    warning = ""
      try {
        loading.set(true)
        const response = await fetch(`${endpoint}/v1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        let data = await response.json();
        loading.set(false)
        if (response.ok) {
          notifications.success("Succesfully loggedIn", 2000);
          document.cookie = `api_key=${data.api_key}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
          $userProfile = {
            name: data.name,
            email: data.email,
            apikey: data.api_key,
            loggedIn: true,
          };
          setTimeout(() => goto("/user/dashboard"), 500);
        } else {
          warning = data.error
          notifications.warning("wrong password/email", 5000);
          console.error("Error:", response.text, response.statusText);
        }
      } catch (error) {
        loading.set(false)
        notifications.danger(error, 3000);        
      }
  }
  let warning = ""
  </script>
  <div class="flex flex-col justify-center items-center gap-2">
      <form class="flex mt-5 gap-2 p-4 flex-col bg-base-200" on:submit|preventDefault={login}>
          <label for="email">Email:</label>
          <!-- svelte-ignore a11y-autofocus -->
          <input class="input" autofocus autocomplete="email" name="email" id="email" bind:value={user.email} type="text" placeholder="email" />
          <label for="password">Password:</label>
          <input class="input" name="password" id="password" bind:value={user.password} type="password" placeholder="password" />
          {#if warning}
            <p class="text-red-900">{warning}</p>
          {/if}
          <button class="btn bg-neutral mt-2">Login</button>
  </form>
  <div class="flex gap-2">
    <button class="btn" onclick="my_modal_2.showModal()">Forgot password?</button>
      <button class="btn"><a href="/create">create user</a></button>
  </div>
  </div>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg text-center">Password reset</h3>
      <form class="text-center" on:submit|preventDefault={reset}>
        <p>Sends password reset link to your email.</p>
        <label for="forgotEmail" class="py-4 mr-2">Email:</label>
        <input class="my-3 input bg-base-300" type="text" bind:value={forgotEmail} name="forgotEmail" id="forgotEmail">
        <br>
        <button class="btn" type="submit">Send reset link</button>
      </form>
    </div>
  </dialog>
