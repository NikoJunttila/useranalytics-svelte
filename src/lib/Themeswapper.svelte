<script>
    // @ts-nocheck
let selectedTheme = "mytheme";
function changeTheme(event) {
  selectedTheme = event.target.value;
  const body = document.querySelector("html");
  body.setAttribute("data-theme", selectedTheme);
  localStorage.setItem("myTheme", selectedTheme);
}
const themes = ["mytheme","coffee","dark","bumblebee","valentine"]
</script>
<div class="ml-auto dropdown dropdown-hover">
    <div tabindex="0" role="button" class="btn m-1">
    Theme
    <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
    {#each themes as theme, index}
    <li>
      <input
        type="radio"
        name="theme-dropdown{index}"
        id="theme-dropdown{index}"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={theme}
        on:change={changeTheme}
        value={theme}
        checked={selectedTheme === theme}
      />
      <label
        for="theme-dropdown{index}"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        >{theme}</label
      >
    </li>
    {/each} 
  </ul>
</div>

<style>
    input[type="radio"] {
       display: none;
   }
   </style>