<script>
  import { t } from "$lib/localization/i18";
  const script = `<script>`;
  const scriptEnd = `<\/script>`;
  const script2 ="<script"
  const close = ">"
  /**
   * @type {string}
   */
   export let id
</script>
    <div id="getStarted" class="text-[1.2rem] mt-4 mx-4">
        <p>{$t("html.para1")}</p>
        <p>{$t("html.para2")}</p>
    </div>
    <div class="text-[0.6rem] md:text-xl lg:text-2xl bg-base-200  m-3  sm:p-7 rounded">
        <p><span class="text-blue-800">{script}</span><span class="text-red-600">var</span> dID="{id}"<span class="text-blue-800">{scriptEnd}</span></p>
        <p><span class="text-blue-800">{script2}</span> <span class="text-blue-400">defer src</span>="https://cdn.jsdelivr.net/gh/NikoJunttila/userAnalytics@main/javascript/tracker.js" crossorigin="anonymous" referrerpolicy="no-referrer"{close}<span class="text-blue-800">{scriptEnd}</span></p>
    </div>