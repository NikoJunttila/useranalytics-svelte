<script>

</script>
<style>
  section {
    --s: 100px;
    --c1: #F8B195;
    --c2: #355C7D;
    
    --_g: 
    var(--c2) 6%  14%,var(--c1) 16% 24%,var(--c2) 26% 34%,var(--c1) 36% 44%,
    var(--c2) 46% 54%,var(--c1) 56% 64%,var(--c2) 66% 74%,var(--c1) 76% 84%,var(--c2) 86% 94%;
    background:
    radial-gradient(100% 100% at 100% 0,var(--c1) 4%,var(--_g),#0008 96%,#0000),
    radial-gradient(100% 100% at 0 100%,#0000, #0008 4%,var(--_g),var(--c1) 96%)
    var(--c1);
    background-size: var(--s) var(--s);
  }
  </style>
  
  <section class="w-full h-screen relative flex flex-col items-center justify-center">
    <main class="w-[300px] h-[300px] z-[2] grid place-items-center p-4 bg-base-100 rounded">
      <h1 class="text-3xl">Trustlytics</h1>
      <p>Introducing Trustlytics: Your Privacy-Respecting, Open-Source User Analytics Solution
        We understand the importance of safeguarding user privacy while gaining valuable insights. 
        That's why we've created a cutting-edge, open-source user analytics software designed with your privacy in mind.</p>
        <a class="text-blue-600" href="/example">Example on how it works here</a>
    </main>
    <button class="btn mt-5">
      <a href="#info">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m202.83 146.83l-72 72a4 4 0 0 1-5.66 0l-72-72a4 4 0 0 1 5.66-5.66L124 206.34V40a4 4 0 0 1 8 0v166.34l65.17-65.17a4 4 0 0 1 5.66 5.66Z"/></svg>
      </a>  
    </button>
  </section>
