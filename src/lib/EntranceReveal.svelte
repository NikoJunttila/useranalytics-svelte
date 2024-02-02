<script>
  import { onMount } from "svelte";
  
  onMount(() => {
    setTimeout(() =>{
      animate.remove()
    }, 2600)

  });
  /**
   * @type {HTMLDivElement}
   */
  let animate;

  let loopCount = 50;
  let dummyArray = Array.from({ length: loopCount }, (_, index) => index);
</script>

<div
  bind:this={animate}
  id="entrance"
  class="pointer-events-none grid grid-cols-10 grid-rows-5 h-full w-full z-50 fixed">
{#each dummyArray as index (index)}
  <div style="--animation-order: {index}"></div>
{/each}
</div>

<style>
  #entrance > div {
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
