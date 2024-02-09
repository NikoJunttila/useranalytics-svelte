<script>
  // @ts-nocheck
  import Htmlcode from "$lib/Htmlcode.svelte";
  import { onMount } from "svelte";
  let blob;

  function handleMousemove(event) {
    const { clientX, clientY } = event;
    blob.animate(
      {
        left: `${clientX + window.scrollX}px`,
        top: `${clientY + window.scrollY}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  }
  let hiddenElements = [];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show2");
        } else {
          entry.target.classList.remove("show2");
        }
      });
    });

    // Query and observe hidden elements
    hiddenElements = document.querySelectorAll(".hidden2");
    hiddenElements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  });
</script>
<div bind:this={blob} id="blob"></div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="blur" on:mousemove={handleMousemove} class="z-10 overflow-hidden">
  <div class="w-full h-screen flex flex-col items-center justify-center p-5">
    <main id="card"
    class="w-64 md:w-80  lg:w-96 grid place-items-center z-20 relative p-1 bg-base-200 shadow  overflow-hidden rounded-lg">
    <div class="grid lg:p-7 sm:text-xl md:text-2xl place-items-center bg-base-200 p-4 z-10">
      <h1 class="text-3xl md:text-4xl lg:text-5xl py-2">Trustlytics</h1>
      <p class="text-center">Introducing Trustlytics</p>
      <p>
        Your Privacy-Respecting, Open-Source User Analytics Solution. We
        understand the importance of safeguarding user privacy while gaining
        valuable insights. That's why we've created a cutting-edge, open-source
        user analytics software designed with your privacy in mind.
      </p>
      <a class="mt-4" href="/example"
      ><span>Discover how it works</span></a>
    </div>
    <div class="p-1 animatedShadow"></div>
  </main>
    <button class="mt-5 heartbeat">
      <a href="#info">
        <span>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
          ><path
          fill="currentColor"
          d="m202.83 146.83l-72 72a4 4 0 0 1-5.66 0l-72-72a4 4 0 0 1 5.66-5.66L124 206.34V40a4 4 0 0 1 8 0v166.34l65.17-65.17a4 4 0 0 1 5.66 5.66Z"
          /></svg>
        </span>
      </a>
    </button>
  </div>
  <div class="h-1 bg-accent w-full"></div>
  <div id="info" class="flex flex-col items-center mt-5 mx-2 gap-5 lg:gap-0 scroll-m-12 sm:text-2xl 
  text-lg lg:text-3xl lg:grid lg:grid-cols-2 lg:place-items-center lg:mx-5
  ">
    <section class=" min-h-[20vh]">
      <p class="hidden2">
        🔒 Privacy First: With Trustlytics, your users' data remains confidential.
        We prioritize user privacy by using anonymized data and robust encryption,
        ensuring you can analyze user behavior without compromising their trust.
      </p>
      </section>
    <div></div>
    <div></div>
    <section class="min-h-[20vh]">
      <p class="hidden2 lg:ml-4">  
        🌟 Incredibly Lightweight: Trustlytics efficient design ensures minimal
        impact on your system's resources. It runs smoothly in the background,
        allowing you to focus on what matters most - your data.
      </p>
    </section>
    <section class="min-h-[20vh]">
      <p class="hidden2 lg:ml-4">
        🌐 Open Source: We believe in transparency and collaboration. Trustlytics
        is open-source, meaning you have full access to the codebase, can
        customize it to your needs, and contribute to the community.
      </p>
    </section>
    <div></div>
    <div></div>
    <section class="min-h-[20vh]">
      <p class="hidden2 lg:ml-4">
        📊 Actionable Insights: Gain meaningful insights into user behavior,
        preferences, and trends. Trustlytics's powerful analytics tools empower
        you to make data-driven decisions that drive growth and innovation.
      </p>
    </section>
    <section class="min-h-[20vh]">
      <p class="hidden2">
        🛠️ Easy Integration: Seamlessly integrate Trustlytics into your website or
        application. Our user-friendly setup makes it accessible to businesses of
        all sizes.
      </p>
    </section>
    <div></div>
    <div></div>
    <section class="min-h-[20vh]">
      <p class="hidden2 lg:ml-4">
        📈 Scalable & Reliable: Whether you're a startup or an enterprise,
        Trustlytics scales with you. Our robust infrastructure ensures reliable
        performance even as your user base grows.
      </p>
    </section>
  </div>
  <div class="flex flex-col items-center pb-5 mt-5 show2">
    <Htmlcode id="e325ccdb-284b-4f74-bfcd-c014c300a3c9" />
    <div>
      <a href="/create"><span>Create account</span></a>
      <a href="/user/login"><span>Login</span></a>
    </div>
  </div>
</div>

<style>

@media (min-width:1024px){
  #info > section:nth-child(odd){
    border-right: hsl(var(--a)) solid 1px;
    border-bottom: hsl(var(--a)) solid 1px;
  }
  #info > section:nth-child(even){
    border-bottom: hsl(var(--a)) solid 1px;
  }
  #info > div:nth-child(odd){
    border-right: hsl(var(--a)) solid 1px;
  }
  #info > div{
    content: "";
    width: 100%;
    height: 100%;
  }
}
  .hidden2{
  opacity:0;
  transition: all 1s;
  filter:blur(5px);
  transform: translateX(-100%);
  transition-timing-function: ease-in;
}
::selection {
  text-decoration: underline;
  background: hsl(var(--p));
}
.show2{
  opacity:1;
  filter:blur(0);
  transform: translateX(0);
}
  @media(prefers-reduced-motion){
    .hidden2{
      transition: none;
    }
  }
  @keyframes rotate {
    from {
      rotate: 0deg;
    }

    50% {
      scale: 1 1.5;
    }

    to {
      rotate: 360deg;
    }
  }

  #blob {
    height: 25vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: rgb(12, 112, 223);
    background-image: linear-gradient(180deg, hsl(var(--p)), hsl(var(--a)));
    animation: rotate 15s infinite;
    /* opacity: 0.8; */
    pointer-events: none;
  }
  @media (max-width:500px){
    #blob{
      display: none;
    }
  }
  #card{
    transition: all 0.2s linear;
    filter: drop-shadow(-10px -9px 35px hsl(var(--p)));
  }
  #card:hover{
    scale: 1.03;
    box-shadow: 15px 5px 50px rgba(0, 0, 0, .3);
  transform-origin: left center;
  transform: perspective(1000px) rotateY(-7deg);
  }
  #blur {
    backdrop-filter: blur(12vmax);
    /* background: linear-gradient(128deg, hsl(var(--b1)) 0%, hsl(var(--b2)) 50%, hsl(var(--b3)) 100%) !important; */
  }
  #card::before {
  content: '';
  position: absolute;
  width: 100px;
  background-image: linear-gradient(180deg, hsl(var(--p)), hsl(var(--a)));
  
  /* background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255)); */
  height: 130%;
  animation: rotBGimg 5s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

#card::after {
  content: '';
  position: absolute;
  ;
  inset: 5px;
  border-radius: 15px;
}  
a {
 padding: 0.9rem 2rem;
 position: relative;
 display: inline-block;
 letter-spacing: 0.05rem;
 font-weight: 700;
 border-radius: 500px;
 overflow: hidden;
 background: hsl(var(--p));
}

a span {
 position: relative;
 z-index: 10;
 transition: color 0.4s;
}
a:hover{
    scale: 1.05;
    transition: 0.5s;
  }
a:hover span {
 color: hsl(var(--n));
}

a::before,
a::after {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 z-index: 0;
}

a::before {
 content: "";
 background: hsl(var(--a));
 width: 120%;
 left: -10%;
 transform: skew(30deg);
 transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

a:hover::before {
 transform: translate3d(100%, 0, 0);
}
.heartbeat {
	-webkit-animation: heartbeat 1.5s ease-in-out 5s infinite both;
	        animation: heartbeat 1.5s ease-in-out 5s infinite both;
}
 @-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
</style>
