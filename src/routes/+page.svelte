<script>
  // @ts-ignore
  import Footer from "$lib/Footer.svelte";
  import LandingPage from "$lib/LandingPage.svelte";
  import Htmlcode from "$lib/Htmlcode.svelte";

/*   const script = `<script>`;
  const scriptEnd = `<\/script>`;
  const script2 ="<script"
  const close = ">" */

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
  <Htmlcode id="e325ccdb-284b-4f74-bfcd-c014c300a3c9" />
  <div>
      <a href="/create"><button class="btn">Create account</button></a>
      <a href="/login"><button class="btn">Login</button></a>
  </div>
</div>
<Footer></Footer>