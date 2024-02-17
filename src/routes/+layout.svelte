<script>
  // @ts-nocheck
  import "../app.css";
  import Toast from "$lib/Toast.svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import Themeswapper from "$lib/Themeswapper.svelte";
	import { loader,loading } from "$lib/stores/loader";
  import { fly } from 'svelte/transition'
  import Footer from "$lib/Footer.svelte";
  import EntranceReveal from "$lib/EntranceReveal.svelte";
  import logo2 from '$lib/assets/Logo300.png';
  import { locale, t } from "$lib/localization/i18";
  import { onMount } from "svelte";
  import finland from '$lib/assets/finland-32.png';
  import english from '$lib/assets/english.png';



  function removeApiKeyCookie() {
    document.cookie = "api_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $userProfile = {
          email: "",
          apikey: "",
          loggedIn: false,
        };
    goto("/")}

  onMount(() => {
    const localization = localStorage.getItem("local");
    if (localization){
     $locale = localization
     if (localization == "en"){
      lang = true;
     } else {
      lang = false
     }
    } else {
      const langue = navigator.language
      if (langue == "fi-FI"){
        localStorage.setItem("local", "fi");
        lang = false
        $locale = "fi"
      }
    }
  })
  let y = 0;
  export let data
  let lang = true
function toggleLanguage() {
  $locale = $locale === "en" ? "fi" : "en";
  localStorage.setItem("local", $locale);
}
</script>
<div class="min-h-screen flex flex-col overflow-hidden" use:loader={loading}>
  <EntranceReveal />
  <header
  class="{y > 50 ? "h-[50px]" : "h-[75px]"} bg-primary fixed flex gap-1 lg:gap-4 h-[50px] w-full items-center  z-20">
  <a href="/"><img class="btn-ghost lg:ml-5 ml-1 rounded" src={logo2} width="50" height="50" alt="logo"></a>
  <Themeswapper />
  <div class="flex justify-center items-center">
    <img src={finland} alt="suomi" width="40" height="40"/>
  <input type="checkbox" class="toggle mx-1 toggle-primary" bind:checked={lang} on:change={toggleLanguage} />
  <img src={english} alt="suomi" width="40" height="40"/>
  </div>

  {#if $userProfile.loggedIn}
  <div class="hidden sm:block">
    <a href="/docs" class="btn">{$t("nav.docs")}</a>
    <a class="btn" href="/user/dashboard">{$t("nav.dashboard")}</a>
    <button class="btn mr-5" on:click={removeApiKeyCookie}>{$t("nav.logout")}</button>
  </div>
  <div class="dropdown dropdown-bottom dropdown-end sm:hidden lg:mr-8 mr-2 ">
    <div tabindex="0" id="hamburger" role="button" class="btn m-1 w-[60px] ">  
      <div class="hamburger-lines">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
  </div>  
  </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content z-[1] divide-y-2 menu p-2 shadow text-center bg-base-100 rounded-box w-52">
      <li><a class="btn" href="/user/dashboard">{$t("nav.dashboard")}</a></li>
      <li><a href="/docs" class="btn">{$t("nav.docs")}</a></li>
      <li><button class="btn" on:click={removeApiKeyCookie}>{$t("nav.logout")}</button></li>
    </ul>
  </div>
  {:else}
  <div class="hidden md:block">
  <!--   <a href="/create" class="btn">Create user</a> -->
    <a href="/docs" class="btn">{$t("nav.docs")}</a>
    <a class="btn mr-5" href="/user/login">Log in/Create</a>
  </div>
  <div class="dropdown dropdown-bottom dropdown-end md:hidden lg:mr-8 mr-2 ">
    <div tabindex="0" id="hamburger" role="button" class="btn m-1 w-[60px] ">  
      <div class="hamburger-lines">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
  </div>  
  </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content z-[1] divide-y-2 menu p-2 shadow bg-base-100 rounded-box w-52">
      <li><a href="/user/login">{$t("nav.login")}</a></li>
      <li><a href="/create">{$t("nav.create")}</a></li>
      <li><a href="/docs">{$t("nav.docs")}</a></li>
    </ul>
  </div>
  {/if}
</header>

  <div class="pt-[75px] min-h-screen">
    {#key data.url}
    <main
      in:fly={{ x: -200, duration: 300, delay: 300 }}
      out:fly={{ x: 200, duration: 300 }}>
      <slot />
  </main>
  {/key}
  </div>
  <Toast />
  <Footer></Footer>
</div>

<svelte:window bind:scrollY={y} />


<style>
    @keyframes appear {
    from {
      opacity:0;
      filter:blur(5px);
    }
    to {
      opacity:1;
      filter:blur(0);
    }
  }
  header{
        transition: 1s;
        animation: 2.5s ease-in appear;
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