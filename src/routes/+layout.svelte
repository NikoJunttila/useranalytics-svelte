<script>
  // @ts-nocheck
  import "../app.css";
  import Toast from "$lib/Toast.svelte";
  import { onMount } from "svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  export let data
  import { notifications } from "$lib/stores/notifications";
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
  let selectedTheme = "mytheme";
  function changeTheme(event) {
    selectedTheme = event.target.value;
    const body = document.querySelector("html");
    body.setAttribute("data-theme", selectedTheme);
  }
</script>

<div class="min-h-screen flex flex-col">
  {#if $userProfile.loggedIn}
  <header
  class="fixed flex gap-4 py-4 h-[50px] w-full items-center bg-base-200 z-10">
  <a href="/" class="ml-5">Logo</a>
  <a href="/user/dashboard" class="ml-auto">dashboard</a>
  <button class="btn" on:click={removeApiKeyCookie}>Logout</button>
</header>
  {:else}
<header
class="fixed flex gap-4 py-4 h-[50px] w-full items-center bg-base-200 z-10">
<a class="ml-5" href="/">Logo</a>
<div class="ml-auto dropdown dropdown-hover">
    <div tabindex="0" role="button" class="btn m-1">
    Theme
    <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
    <li>
      <input
        type="radio"
        name="theme-dropdown1"
        id="theme-dropdown1"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Default"
        on:change={changeTheme}
        value="mytheme"
        checked={selectedTheme === 'mytheme'}
        />
        <label for="theme-dropdown1" class="theme-controller btn btn-sm btn-block btn-ghost justify-start">Mytheme</label>

    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown2"
        id="theme-dropdown2"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label="coffee"
        on:change={changeTheme}
        value="coffee"
        checked={selectedTheme === 'coffee'}
      />
    <label for="theme-dropdown2" class="theme-controller btn btn-sm btn-block btn-ghost justify-start">Coffee</label>
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown3"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label="dark"
        id="theme-dropdown3"
        on:change={changeTheme}
        value="dark"
        checked={selectedTheme === 'dark'}
      />
      <label for="theme-dropdown3" class="theme-controller btn btn-sm btn-block btn-ghost justify-start">Dark</label>

    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown4"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label="bumblebee"
        id="theme-dropdown4"
        on:change={changeTheme}
        value="bumblebee"
        checked={selectedTheme === 'bumblebee'}
      />
      <label for="theme-dropdown4" class="theme-controller btn btn-sm btn-block btn-ghost justify-start">bumblebee</label>

    </li>
  </ul>
</div><a href="/create" class="mx-1">Create user</a>
<a class="btn mx-1" href="/login">Login</a>

</header>
  {/if}
  <main class="pt-[50px]">
    <slot />
  </main>
  <Toast />
</div>
<style>
 input[type="radio"] {
    display: none;
}
</style>
