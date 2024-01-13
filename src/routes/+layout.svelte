<script>
  // @ts-nocheck
  import "../app.css";
  import Toast from "$lib/Toast.svelte";
  import { onMount } from "svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import { getCookies } from "$lib/js/getCookies";
  import { themeChange } from 'theme-change'
  import {endpoint} from "$lib/js/endpoints"

  async function fetchUser() {
    const myCookie = getCookies("api_key");
    if (myCookie) {
      try {
        const url =`${endpoint}/v1/users`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "ApiKey " + myCookie,
          },
        };
        const res = await fetch(url, options);
        if (res.ok) {
          let data = await res.json();
          $userProfile = {
            name: data.name,
            email: data.email,
            apikey: data.api_key,
            loggedIn: true,
          };
          goto("/user/dashboard")
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  onMount(() => {
    fetchUser();
    themeChange(false)
  });
  function removeApiKeyCookie() {
    document.cookie = "api_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $userProfile = {
          name: "",
          email: "",
          apikey: "",
          loggedIn: false,
        };
    goto("/")
  }
</script>

<div class="min-h-screen flex flex-col">
  {#if $userProfile.loggedIn}
  <header
  class="fixed flex gap-4 py-4 h-[50px] w-full items-center bg-base-200 z-10">
  <a href="/" class="ml-5">Logo</a>
  <a href="/user/dashboard" class="ml-auto">dashboard</a>
  <button class="btn" on:click={removeApiKeyCookie}>Logout</button>
  <button class="mr-5" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07L19.07 3.5m-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13l.51 1.67m-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87l.4 1.31M19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35l-2.53-2.2m4.33-2.7l1.15-2.77l2.2 2.54l-3.35.23m1.15-4.96l-1.14-2.78l3.34.24l-2.2 2.54M9.63 18.93l2.77 1.15l-2.53 2.19l-.24-3.34Z"/></svg></button>
</header>
  {:else}
<header
class="fixed flex gap-4 py-4 h-[50px] w-full items-center bg-base-200 z-10">
<a class="ml-5" href="/">Logo</a>
<a href="/create" class="ml-auto">Create user</a>
<a class="btn" href="/login">Login</a>
<button class="mr-5" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07L19.07 3.5m-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13l.51 1.67m-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87l.4 1.31M19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35l-2.53-2.2m4.33-2.7l1.15-2.77l2.2 2.54l-3.35.23m1.15-4.96l-1.14-2.78l3.34.24l-2.2 2.54M9.63 18.93l2.77 1.15l-2.53 2.19l-.24-3.34Z"/></svg></button>
</header>
  {/if}
  <main class="pt-[50px]">
    <slot />
  </main>
  <Toast />
</div>

<style>
</style>
