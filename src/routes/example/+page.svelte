<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import {endpoint, exampleID} from "$lib/js/endpoints"
  import { notifications } from "$lib/stores/notifications";
  import { loading } from "$lib/stores/loader.js";
  import Htmlcode from "$lib/Htmlcode.svelte";
  export let data;
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
  async function getDaysData() {
    try {
      loading.set(true)
      const res = await fetch(`${endpoint}/v1/visits/${fetchValue}`, {
        method: "POST",
        body: JSON.stringify({ domain_id: exampleID }),
      });
      if (!res.ok) {
        notifications.danger("error fetching data", 3000);
        return;
      }
      const check = await res.json();
      loading.set(false)
      if (check == null){
        console.log("no stats")
        return;
      }
      dailyStats = check
       dailyStats.sort(function (a, b) {
        return b.Count - a.Count;
      }); 
      sums = sumStatsValues(dailyStats);
    } catch (err) {
      notifications.danger(err, 3000);
      loading.set(false)
    }
  }
  onMount(() => {
    loading.set(false)
    getDaysData();
  });
  let days = [7, 30, 90];
  let fetchValue = 30;
</script>
<style>
  .bg{
    background-color: hsl(var(--b3) / var(--tw-bg-opacity)) !important;
  }
</style>
<div class=" flex flex-col justify-center items-center">
  <h1 class="text-2xl my-3"><a class="text-blue-700 " href={data.total.Url}>{data.total.Name}</a> stats</h1>
  <div class="md:stats bg flex gap-2 flex-col shadow">
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
      <div class="stat-value">{data.total.TotalVisits}</div>
      {#if data.total.total > 0}
      <div class="stat-desc text-green-500">change from last month: {data.total.total}%</div>
      {:else if data.total.total < 0}
      <div class="stat-desc text-red-600">change from last month: {data.total.total}%</div>
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
      <div class="stat-value">{data.total.TotalUnique}</div>
      {#if data.total.unique > 0}
      <div class="stat-desc text-green-500">change from last month: {data.total.unique}%</div>
      {:else if data.total.unique < 0}
      <div class="stat-desc text-red-600">change from last month: {data.total.unique}%</div>
      {/if}
    </div>
  </div>
  <select
    name="fetch"
    id="fetchdays"
    class="my-5 bg-neutral outline outline-2 outline-accent focus:outline-accent-focus rounded-md"
    bind:value={fetchValue}
    on:change={getDaysData}
  >
    {#each days as day}
      <option name="select" value={day}>
        Last {day} days
      </option>
    {/each}
  </select>
  {#if dailyStats}
    <div class="md:stats bg flex gap-2 flex-col shadow">
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
        <div class="stat-value">{Math.floor(sums.sumAvgVisitDuration)}s</div>
      </div>
    </div>
    <p>Visits coming from:</p>
    {#if dailyStats.length > 0}
    <div class="md:stats bg flex flex-col shadow">
      {#each dailyStats as from}
        <div class="stat">
          <div class="stat-title text-center">{from.Visitfrom}</div>
          <div class="stat-value">{from.Count}</div>
        </div>
      {/each}
    </div>
    {/if}
  {/if}
<Htmlcode id={data.total.ID} />
</div>
