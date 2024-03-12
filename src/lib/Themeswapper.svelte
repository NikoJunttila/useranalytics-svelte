<script>
  // @ts-nocheck
  import { t } from "$lib/localization/i18";
  import { onMount } from "svelte";
  let themeIndex = 0
  onMount(() => {
    const theme = localStorage.getItem("myTheme");
    if (theme) {
      document.querySelector("html").setAttribute("data-theme", theme);
    }
    themeIndex = obj.findIndex((x) => x.name == theme);
  });

  let selectedTheme = "mytheme";
  function changeTheme(event) {
    selectedTheme = event.target.value;
    const body = document.querySelector("html");
    body.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("myTheme", selectedTheme);
    themeIndex = obj.findIndex((x) => x.name == selectedTheme);
  }
  const obj = [
    { name: "dark", color: "#1d232a" },
    { name: "mytheme", color: "#f9e6ff" },
    { name: "coffee", color: "#211720" },
    { name: "bumblebee", color: "#f7f7f7" },
    { name: "valentine", color: "#f0d6e8" },
    { name: "lemonade", color: "#3ce66f" },
  ];
</script>

<div class="ml-auto dropdown dropdown-hover">
  <div tabindex="0" role="button" class="btn m-1">
    {$t("nav.theme")}
    <svg
      width="12px"
      height="12px"
      class="h-2 w-2 fill-current opacity-60 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      ><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
      ></path></svg
    >
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    tabindex="0"
    class="dropdown-content bg-base-300 z-[1] p-3 shadow-2xl rounded-box w-52"
  >
    {#each obj as theme, index}
      <li>
        <input
          type="radio"
          name="theme-dropdown{index}"
          id="theme-dropdown{index}"
          aria-label={theme.name}
          on:change={changeTheme}
          value={theme.name}
          checked={selectedTheme === theme.name}
        />
        <label
          for="theme-dropdown{index}"
          class="{themeIndex == index ? "active" : ""} btn text-center btn-sm btn-block btn-ghost hover:opacity-70"
          style="background-color: {theme.color};">{theme.name}</label
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  input[type="radio"] {
    display: none;
  }
  .active::before{
    content: "✔";
  }
</style>
