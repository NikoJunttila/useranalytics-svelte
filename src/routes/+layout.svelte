<script>
  // @ts-nocheck
  import "../app.css";
  import Toast from "$lib/Toast.svelte";
  import { onMount } from "svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import Themeswapper from "$lib/Themeswapper.svelte";
	import { loader,loading } from "$lib/stores/loader";
  import { fly } from 'svelte/transition'
  import Footer from "$lib/Footer.svelte";
  import EntranceReveal from "$lib/EntranceReveal.svelte";
  import logo from '$lib/assets/Logo40.png';
  export let data
  onMount(() => {
    const theme = localStorage.getItem("myTheme");
  if (theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
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


<div class="min-h-screen flex flex-col overflow-hidden" use:loader={loading}>
  <EntranceReveal />
  {#if $userProfile.loggedIn}
  <header
  class="{y > 50 ? "h-[50px]" : "h-[75px]"} bg-primary fixed flex gap-4 h-[50px] w-full items-center  z-20">
  <a href="/"><img class="btn-ghost ml-5 rounded" src={logo} width="45" height="45" alt="logo"></a>
  <Themeswapper />
  <div class="hidden sm:block">
    <a href="/docs" class="btn">Docs</a>
    <a class="btn" href="/user/dashboard">dashboard</a>
    <button class="btn mr-5" on:click={removeApiKeyCookie}>Logout</button>
  </div>
  <div class="dropdown dropdown-bottom dropdown-end sm:hidden mr-8 ">
    <div tabindex="0" id="hamburger" role="button" class="btn m-1 w-[60px] ">  
      <div class="hamburger-lines">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
  </div>  
  </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow text-center bg-base-100 rounded-box w-52">
      <li><a class="btn" href="/user/dashboard">dashboard</a></li>
      <a href="/docs" class="btn">Docs</a>
      <li><button class="btn" on:click={removeApiKeyCookie}>Logout</button></li>
    </ul>
  </div>
</header>
  {:else}
<header
class="{y > 50 ? "h-[50px]" : "h-[75px]"} bg-primary fixed flex gap-4  w-full items-center  z-10">
<a href="/"><img class="btn-ghost ml-5 rounded" src={logo} width="45" height="45" alt="logo"></a>
<Themeswapper />
<div class="hidden sm:block">
  <a href="/create" class="btn">Create user</a>
  <a href="/docs" class="btn">Docs</a>
  <a class="btn mr-5" href="/login">Login</a>
</div>
<div class="dropdown dropdown-bottom dropdown-end sm:hidden mr-8 ">
  <div tabindex="0" id="hamburger" role="button" class="btn m-1 w-[60px] ">  
    <div class="hamburger-lines">
    <span class="line line1"></span>
    <span class="line line2"></span>
    <span class="line line3"></span>
</div>  
</div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a href="/login">Sign in</a></li>
    <li><a href="/create">Create user</a></li>
    <li><a href="/docs">Docs</a></li>
  </ul>
</div>
</header>
  {/if}
  <div class="pt-[75px] min-h-screen">
    {#key data.url}
    <div
      in:fly={{ x: -200, duration: 300, delay: 300 }}
      out:fly={{ x: 200, duration: 300 }}
    >
      <slot />
    </div>
  {/key}
  </div>
  <Toast />
  <Footer></Footer>
</div>

<svelte:window bind:scrollY={y} />


<style>
  header{
        transition: 1s;
    }
    .hamburger-lines {
  display: block;
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: #0e2431;
}

.line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.line2 {
  transition: transform 0.2s ease-in-out;
}

.line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

#hamburger:focus > div .line1 {
  transform: rotate(45deg);
}

#hamburger:focus > div .line2 {
  transform: scaleY(0);
}

#hamburger:focus > div .line3 {
  transform: rotate(-45deg);
}

</style>