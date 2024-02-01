<script>
  import { onMount } from "svelte";
  
  onMount(() => {
    const numRows = 5;
    const numCols = 10;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const emptyElement = document.createElement("div");
        emptyElement.style.setProperty(
          "--animation-order",
          (row * numCols + col + 1).toString()
        );
        animate.appendChild(emptyElement);
      }
    }
  });
  /**
   * @type {HTMLDivElement}
   */
  let animate;
</script>

<div
  bind:this={animate}
  id="entrance"
  class="pointer-events-none grid grid-cols-10 grid-rows-5 h-full w-full z-50 fixed"
></div>

<style>
  :global(#entrance > div) {
    animation-name: slide-out-bottom;
    animation-duration: 350ms;
    animation-delay: calc(var(--animation-order) * 50ms);
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
    /* background-color: #009688; */
    background-color: hsl(var(--p));
  }

  @-webkit-keyframes slide-out-bottom {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-bottom {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
  }
</style>
