<script>
    import { t } from "$lib/localization/i18";
</script>
<style>
    section{
        margin: 5px 0;
    }
    img{
        border-radius: 15px;
    }
    


</style>
<div class="flex flex-col justify-center items-center text-center gap-5 text-2xl">
    <section id="quickstart">
        <h2>{$t("doc.p1")}</h2>
        <p>{$t("doc.p2")}.</p>
    <a class="text-blue-500" href="create">1. {$t("doc.p3")} </a>
    <p class="mb-10">2. {$t("doc.p4")}.</p>
    <img class="mx-auto" src="https://i.imgur.com/UUVpuIo.png" alt="dashboard">
    <p class="mb-10">3. {$t("doc.p5")}.</p> 
    <img class="mx-auto" src="https://i.imgur.com/PUA34uF.png" alt="html">
    </section>
    
    <section id="usage" class="pb-10">
        <h2>{$t("doc.p6")}.</h2>
        <p>{$t("doc.p7")}.</p>
        <p class="mb-10">{$t("doc.p8")}.</p>
        <img class="mb-10" src="https://i.imgur.com/mPzPH8x.png" alt="stats">
        <a  class="text-blue-600 btn" href="/example">{$t("doc.p9")}</a>
    </section>
</div>