<script>
  // @ts-nocheck
  import "../app.css";
  import Toast from "$lib/Toast.svelte";
  import { onMount,beforeUpdate } from "svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import Themeswapper from "$lib/Themeswapper.svelte";
	import { loader,loading } from "$lib/stores/loader";
  import { fly } from 'svelte/transition'

  export let data
beforeUpdate(() => {
  const theme = localStorage.getItem("myTheme");
  if (theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
});
  onMount(() => {
    if (data.userProfile){
     $userProfile = {
       email: data.userProfile.email,
       apikey: data.userProfile.apikey,
       loggedIn: data.userProfile.loggedIn,
      };
    }

  });
  function removeApiKeyCookie() {
    document.cookie = "api_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $userProfile = {
          email: "",
          apikey: "",
          loggedIn: false,
        };
    goto("/")
  }
  let y = 0;
</script>
<style>
  .faded{
    background-color: hsl(var(--b3) / 0.7)
  }
  header{
        transition: 0.7s;
    }
</style>

<div class="min-h-screen flex flex-col" use:loader={loading}>
  {#if $userProfile.loggedIn}
  <header
  class="{y > 50 ? "bg-base-300 text-base py-2" : "faded text-lg py-8"} fixed flex gap-4 h-[50px] w-full items-center  z-10">
  <a href="/" class="ml-5">Logo</a>
  <Themeswapper />
  <a class="btn" href="/user/dashboard">dashboard</a>
  <button class="btn" on:click={removeApiKeyCookie}>Logout</button>
</header>
  {:else}
<header
class="{y > 50 ? "bg-base-300 text-base py-2" : "faded text-lg py-8"} fixed flex gap-4 h-[50px] w-full items-center  z-10">
<a class="ml-5" href="/">Logo</a>
<Themeswapper />
<a href="/create" class="btn">Create user</a>
<a class="btn mr-5" href="/login">Login</a>
</header>
  {/if}
  <main class="pt-16">
    {#key data.url}
    <div class=""
      in:fly={{ x: -200, duration: 300, delay: 300 }}
      out:fly={{ x: 200, duration: 300 }}
    >
      <slot />
    </div>
  {/key}
  </main>
  <Toast />
</div>
<svelte:window bind:scrollY={y} />
