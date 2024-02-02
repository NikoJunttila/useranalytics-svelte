<script>
  // @ts-nocheck
  import Htmlcode from "$lib/Htmlcode.svelte";
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

</script>
<div bind:this={blob} id="blob"></div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="blur" on:mousemove={handleMousemove} class="z-10 overflow-hidden">
  <div class="w-full h-screen flex flex-col items-center justify-center p-5">
    <main id="card"
      class="w-64 md:w-80 grid place-items-center z-20 relative p-1 bg-base-200 shadow  overflow-hidden rounded-lg"
    >
    <div class="grid lg:p-7 place-items-center bg-base-200 p-2 z-10">
      <h1 class="text-3xl py-2">Trustlytics</h1>
      <p class="text-center">Introducing Trustlytics</p>
      <p>
        Your Privacy-Respecting, Open-Source User Analytics Solution. We
        understand the importance of safeguarding user privacy while gaining
        valuable insights. That's why we've created a cutting-edge, open-source
        user analytics software designed with your privacy in mind.
      </p>
      <a class="mt-4" href="/example"
      ><span>Discover how it works</span></a
      >
    </div>
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
  <div id="info" class="flex flex-col items-center scroll-m-12">
    <section class="max-w-xl min-h-[20vh]">
      🔒 Privacy First: With Trustlytics, your users' data remains confidential.
      We prioritize user privacy by using anonymized data and robust encryption,
      ensuring you can analyze user behavior without compromising their trust.
    </section>
    <section class="max-w-xl min-h-[20vh]">
      🌟 Incredibly Lightweight: Trustlytics efficient design ensures minimal
      impact on your system's resources. It runs smoothly in the background,
      allowing you to focus on what matters most - your data.
    </section>
    <section class="max-w-xl min-h-[20vh]">
      🌐 Open Source: We believe in transparency and collaboration. Trustlytics
      is open-source, meaning you have full access to the codebase, can
      customize it to your needs, and contribute to the community.
    </section>
    <section class="max-w-xl min-h-[20vh]">
      📊 Actionable Insights: Gain meaningful insights into user behavior,
      preferences, and trends. Trustlytics's powerful analytics tools empower
      you to make data-driven decisions that drive growth and innovation.
    </section>
    <section class="max-w-xl min-h-[20vh]">
      🛠️ Easy Integration: Seamlessly integrate Trustlytics into your website or
      application. Our user-friendly setup makes it accessible to businesses of
      all sizes.
    </section>
    <section class="max-w-xl min-h-[20vh]">
      📈 Scalable & Reliable: Whether you're a startup or an enterprise,
      Trustlytics scales with you. Our robust infrastructure ensures reliable
      performance even as your user base grows.
    </section>
  </div>
  <div class="flex flex-col items-center pb-5">
    <Htmlcode id="e325ccdb-284b-4f74-bfcd-c014c300a3c9" />
    <div>
      <a href="/create"><span>Create account</span></a>
      <a href="/login"><span>Login</span></a>
    </div>
  </div>
</div>

<style>
  section {
    padding: 5px;
    
  }
  @media (min-width: 768px) {
    section {
      font-size: 1.25rem;
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
/*     background: linear-gradient(
      66deg,
      rgba(12, 112, 223, 1) 10%,
      rgba(238, 233, 118, 1) 50%,
      rgba(149, 0, 0, 1) 90%
    ); */
    background-image: linear-gradient(180deg, hsl(var(--p)), hsl(var(--a)));
    animation: rotate 15s infinite;
    opacity: 0.8;
    pointer-events: none;
  }
  @media (max-width:500px){
    #blob{
      display: none;
    }
  }
  #card{
    transition: all 0.2s linear;
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
