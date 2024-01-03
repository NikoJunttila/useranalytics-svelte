<script>
  // @ts-ignore
  import Footer from "$lib/Footer.svelte";
  import LandingPage from "$lib/LandingPage.svelte";

  const script = `<script>`;
  const scriptEnd = `<\/script>`;
  const script2 ="<script"
  const close = ">"
</script>
<style>
    section{
        padding:5px;
    }
</style>
<LandingPage />
<div id="info" class="flex flex-col items-center">
  <section  class="max-w-xl min-h-[20vh]">
    🔒 Privacy First: With Trustlytics, your users' data remains confidential.
    We prioritize user privacy by using anonymized data and robust encryption,
    ensuring you can analyze user behavior without compromising their trust.
  </section>
  <section class="max-w-xl min-h-[20vh]">
    🌟 Incredibly Lightweight: Privana's efficient design ensures minimal impact
    on your system's resources. It runs smoothly in the background, allowing you
    to focus on what matters most - your data.
  </section>
  <section class="max-w-xl min-h-[20vh]">
    🌐 Open Source: We believe in transparency and collaboration. Trustlytics is
    open-source, meaning you have full access to the codebase, can customize it
    to your needs, and contribute to the community.
  </section>
  <section class="max-w-xl min-h-[20vh]">
    📊 Actionable Insights: Gain meaningful insights into user behavior,
    preferences, and trends. Trustlytics's powerful analytics tools empower you
    to make data-driven decisions that drive growth and innovation.
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
<div class="flex  flex-col items-center pb-5">
  <div id="getStarted" class="mx-2">
      <h1>To get started just add a small script to your index HTML head tag and start tracking user stats.</h1>
      <p>dID is unique to every domain so you need to login first to generate your own code that links your domains with that ID</p>
  </div>
  <div class="text-[0.6rem] sm:text-xs bg-base-200  m-3  sm:p-7 rounded">
      <p><span class="text-blue-800">{script}</span><span class="text-red-600">var</span> dID = "22b567c5-2736-436d-81f7-edab07857f02"<span class="text-blue-800">{scriptEnd}</span></p>
      <p><span class="text-blue-800">{script2}</span> <span class="text-blue-400">async src</span>="https://cdn.jsdelivr.net/gh/NikoJunttila/userAnalytics@main/javascript/tracker.js" type="text/javascript"{close}<span class="text-blue-800">{scriptEnd}</span></p>
  </div>
  <div>
      <a href="/create"><button class="btn">Create account</button></a>
      <a href="/login"><button class="btn">Login</button></a>
  </div>
</div>
<Footer></Footer>