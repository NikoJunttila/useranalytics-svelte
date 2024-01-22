<script>
  // @ts-nocheck
  import "../app.css";
  import Toast from "$lib/Toast.svelte";
  import { onMount,beforeUpdate } from "svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import Themeswapper from "$lib/Themeswapper.svelte";
  //import Spinner from "$lib/Spinner.svelte";
	import { loader,loading } from "$lib/stores/loader";
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
</script>

<div class="min-h-screen flex flex-col" use:loader={loading}>
  {#if $userProfile.loggedIn}
  <header
  class="fixed flex gap-4 py-4 h-[50px] w-full items-center bg-base-200 z-10">
  <a href="/" class="ml-5">Logo</a>
  <Themeswapper />
  <a class="btn" href="/user/dashboard">dashboard</a>
  <button class="btn" on:click={removeApiKeyCookie}>Logout</button>
</header>
  {:else}
<header
class="fixed flex gap-4 py-4 h-[50px] w-full items-center bg-base-200 z-10">
<a class="ml-5" href="/">Logo</a>
<Themeswapper />
<a href="/create" class="btn">Create user</a>
<a class="btn mx-1" href="/login">Login</a>
</header>
  {/if}
  <main class="pt-[50px]">
    <slot />
  </main>
  <Toast />
</div>

