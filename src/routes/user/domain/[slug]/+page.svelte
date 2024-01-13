<script>
  // @ts-nocheck
  import { userProfile } from "$lib/stores/userStore";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import {endpoint} from "$lib/js/endpoints"

  // @ts-ignore
  let slug;
  $: {
    slug = $page.params.slug;
  }
  let domainData = {
    name: "",
    url: "",
    totalVisits: 0,
    totalUnique: 0,
    avgTime: 0,
    id: "",
  };
  let dailyStats = [
    {
      DomainCount: 0,
      NewVisitorCount: 0,
      AvgVisitDuration: 0,
      Visitfrom: "direct",
      Count: 0,
    },
  ];
  
  function sumStatsValues(statsArray) {
  // Initialize variables to hold the sums
  let sumDomainCount = 0;
  let sumNewVisitorCount = 0;
  let sumAvgVisitDuration = 0;

  // Loop through the array and add up the values
  for (let i = 0; i < statsArray.length; i++) {
    sumDomainCount += statsArray[i].DomainCount;
    sumNewVisitorCount += statsArray[i].NewVisitorCount;
    sumAvgVisitDuration += statsArray[i].AvgVisitDuration;
  }
  sumAvgVisitDuration = sumAvgVisitDuration / statsArray.length
  return {
    sumDomainCount,
    sumNewVisitorCount,
    sumAvgVisitDuration ,
  };
}
let sums = sumStatsValues(dailyStats);
let compare = {
    total: 0,
    unique: 0
  }
async function getCompare() {
    try {
      const res = await fetch(`${endpoint}/v1/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // @ts-ignore
        body: JSON.stringify({ domain_id: slug }),
      });
      console.log(res)
      if (!res.ok) {
        console.log("error");
        return;
      }
      const data = await res.json();
      if (data == null){
        console.log("data null")
        return;
      }
      console.log(data)
      compare.total = data.total
      compare.unique = data.unique
      return
    } catch (err) {
      // Handle any unexpected errors here.
      console.error(err);
      // @ts-ignore
      return error(500, "Internal Server Error");
    }
  }
  async function getData() {
    try {
      const res = await fetch(`${endpoint}/v1/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ApiKey " + $userProfile.apikey,
        },
        // @ts-ignore
        body: JSON.stringify({ domain_id: slug }),
      });
      if (!res.ok) {
        console.log("error");
        return;
      }
      const data = await res.json();
      if (data == null){
        console.log("data null")
        return;
      }
      domainData = {
        name: data.Name,
        url: data.Url,
        totalVisits: data.TotalVisits,
        totalUnique: data.TotalUnique,
        avgTime: data.TotalTime,
        id: data.ID,
      };
    } catch (err) {
      console.error(err);
      return error(500, "Internal Server Error");
    }
  }
  async function getDaysData() {
    try {
      const res = await fetch(`${endpoint}/v1/visits/${fetchValue}`, {
        method: "POST",
        body: JSON.stringify({ domain_id: slug }),
      });
      if (!res.ok) {
        return;
      }
      const check = await res.json();
      if (check == null){
        console.log("error")
        return;
      }
      dailyStats = check
       dailyStats.sort(function (a, b) {
        return b.Count - a.Count;
      }); 
      sums = sumStatsValues(dailyStats);
    } catch (err) {
      // Handle any unexpected errors here.
      console.error(err);
      // @ts-ignore
    }
  }
  onMount(() => {
    getData();
    getDaysData();
    getCompare()
  });
  const script = `<script>`;
  const scriptEnd = `<\/script>`;
  const script2 = "<script";
  const close = ">";
  let days = [7, 30, 90];
  let fetchValue = 30;
</script>

<div class=" flex flex-col justify-center items-center">
  <h1 class="text-2xl my-3"><a class="text-blue-700 " href={domainData.url}>{domainData.name}</a> stats</h1>
  <div class="md:stats flex gap-2 flex-col shadow">
    <div class="stat place-items-center">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          /></svg
        >
      </div>
      <div class="stat-title">Total Page Views</div>
      <div class="stat-value">{domainData.totalVisits}</div>
      {#if compare.total > 0}
      <div class="stat-desc text-green-500">change from last month: {compare.total}%</div>
      {:else if compare.total < 0}
      <div class="stat-desc text-red-600">change from last month: {compare.total}%</div>
      {/if}
    </div>
    <div class="stat place-items-center">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          /></svg
        >
      </div>
      <div class="stat-title">Total Unique visits:</div>
      <div class="stat-value">{domainData.totalUnique}</div>
      {#if compare.unique > 0}
      <div class="stat-desc text-green-500">change from last month: {compare.unique}%</div>
      {:else if compare.unique < 0}
      <div class="stat-desc text-red-600">change from last month: {compare.unique}%</div>
      {/if}
    </div>
  </div>
  <select
    class="my-5 bg-inherit outline outline-2 outline-green-700 rounded-md"
    bind:value={fetchValue}
    on:change={getDaysData}
  >
    {#each days as day}
      <option value={day}>
        Last {day} days
      </option>
    {/each}
  </select>
  {#if dailyStats}
    <div class="md:stats flex gap-2 flex-col shadow">
      <div class="stat place-items-center">
        <div class="stat-title">Page Views</div>
        <div class="stat-value">{sums.sumDomainCount}</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Unique visits:</div>
        <div class="stat-value">{sums.sumNewVisitorCount}</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Avg visit duration:</div>
        <div class="stat-value">{sums.sumAvgVisitDuration}s</div>
      </div>
    </div>
    <p>Visits coming from:</p>
    {#if dailyStats.length > 0}
    <div class="md:stats flex flex-col shadow">
      {#each dailyStats as from}
        <div class="stat">
          <div class="stat-title text-center">{from.Visitfrom}</div>
          <div class="stat-value">{from.Count}</div>
        </div>
      {/each}
    </div>
    {/if}
  {/if}
  <p class="text-center">
    Add this script to your root index file. <sub>
      (index.html/app.html) common ones.</sub
    >
  </p>
  <div class="text-[0.6rem] sm:text-xs bg-base-200 m-3 sm:p-7 rounded">
    <p>
      <span class="text-blue-800">{script}</span><span class="text-red-600"
        >var</span
      >
      dID="{domainData.id}"<span class="text-blue-800">{scriptEnd}</span>
    </p>
    <p>
      <span class="text-blue-800">{script2}</span>
      <span class="text-blue-400">async src</span
      >="https://cdn.jsdelivr.net/gh/NikoJunttila/userAnalytics@main/javascript/tracker.js"
      type="text/javascript"{close}<span class="text-blue-800">{scriptEnd}</span
      >
    </p>
  </div>
</div>
