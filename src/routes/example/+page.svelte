<script>
  // @ts-nocheck
  import { onMount, onDestroy } from "svelte";
  import { endpoint, exampleID } from "$lib/js/endpoints";
  import { notifications } from "$lib/stores/notifications";
  import { loading } from "$lib/stores/loader.js";
  import Htmlcode from "$lib/Htmlcode.svelte";
  import { t } from "$lib/localization/i18";
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
  let os;
  let browser;
  let device;
  let bounceRate = 0;
  let pages;

  function sumStatsValues(statsArray) {
    if (!statsArray) {
      return;
    }
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
    sumAvgVisitDuration = sumAvgVisitDuration / statsArray.length;
    return {
      sumDomainCount,
      sumNewVisitorCount,
      sumAvgVisitDuration,
    };
  }
  let sums = sumStatsValues(dailyStats);
  async function getDaysData() {
    try {
      loading.set(true);
      const res = await fetch(`${endpoint}/v1/visits/${fetchValue}`, {
        method: "POST",
        body: JSON.stringify({ domain_id: exampleID }),
      });
      if (!res.ok) {
        notifications.danger("error fetching data", 3000);
        return;
      }
      const check = await res.json();
      loading.set(false);
      if (!check.os) {
        notifications.warning("no stats yet for this page", 3000);
        return;
      }
      os = check.os;
      os.sort(function (a, b) {
        return b.Count - a.Count;
      });
      device = check.device;
      device.sort(function (a, b) {
        return b.Count - a.Count;
      });
      browser = check.browser;
      browser.sort(function (a, b) {
        return b.Count - a.Count;
      });
      dailyStats = check.original;
      dailyStats.sort(function (a, b) {
        return b.Count - a.Count;
      });
      pages = check.pages;
      bounceRate = check.bounce;
      sums = sumStatsValues(dailyStats);
    } catch (err) {
      notifications.danger(err, 3000);
      loading.set(false);
    }
  }

  onMount(() => {
    loading.set(false);
    getDaysData();
    setupWebSocket();
  });

  function setupWebSocket() {
    socket = new WebSocket("wss://analytics-derp.koyeb.app/v1/wsCount");
    //socket = new WebSocket("ws://localhost:8000/v1/wsCount");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      // Update clientCount based on server data
      clientCount = parseInt(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      // Re-open the connection after a delay (e.g., 1 second)
      setTimeout(() => {
        setupWebSocket();
      }, 1000);
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }
  let socket;
  let clientCount = 1;

  onDestroy(() => {
    if (socket) {
      socket.close();
    }
  });

  let days = [7, 30, 90];
  let fetchValue = 30;
</script>

<svelte:head>
  <title>Example</title>
</svelte:head>
<div class=" flex flex-col justify-center items-center">
  <a href="/" class="btn mt-2 text-xl bg-accent">
    <svg
      fill="#000000"
      height="20px"
      width="20px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 26.676 26.676"
      xml:space="preserve"
    >
      <g>
        <path
          d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
        c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
        C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
        c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
        C26.18,21.891,26.141,21.891,26.105,21.891z"
        />
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
        <g> </g>
      </g>
    </svg></a
  >
  <p class="text-lg">
    {$t("domain.live")}:
    <span class="font-bold text-xl rounded-xl bg-accent animate-pulse p-2"
      >{clientCount}</span
    >
  </p>
  {#await data.streamed.total}
    Loading...
  {:then total}
    <h1 class="text-2xl my-1">
      <a class="text-blue-700" href={total.Url} target="_blank">{total.Name}</a>
      stats
    </h1>
    <div class="md:stats !bg-base-300 flex gap-2 flex-col shadow">
      <div
        class="stat md:border-b-0 border-neutral border-b-2 border-solid place-items-center"
      >
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
        <div class="stat-title">{$t("domain.totalV")}</div>
        <div class="stat-value">{total.TotalVisits}</div>
        {#if total.total > 0}
          <div class="stat-desc text-green-500">
            {$t("domain.change")}: {Math.floor(total.total)}%
          </div>
        {:else if total.total < 0}
          <div class="stat-desc text-red-600">
            {$t("domain.change")}: {Math.floor(total.total)}%
          </div>
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
        <div class="stat-title">{$t("domain.totalU")}</div>
        <div class="stat-value">{total.TotalUnique}</div>
        {#if total.unique > 0}
          <div class="stat-desc text-green-500">
            {$t("domain.change")}: {Math.floor(total.unique)}%
          </div>
        {:else if total.unique < 0}
          <div class="stat-desc text-red-600">
            {$t("domain.change")}: {Math.floor(total.unique)}%
          </div>
        {/if}
      </div>
    </div>
  {/await}
  <select
    name="fetch"
    id="fetchdays"
    class="my-5 outline outline-2 outline-accent focus:outline-accent-focus rounded-md"
    bind:value={fetchValue}
    on:change={getDaysData}
  >
    {#each days as day}
      <option name="select" value={day}>
        <!--    Last {day} days -->
        {@html $t("select.days", { days: day })}
      </option>
    {/each}
  </select>
  {#if dailyStats}
    <div
      class="md:stats !bg-base-300 flex gap-2 flex-col shadow divide-y-2 md:divide-y-0"
    >
      <div class="stat place-items-center">
        <div class="stat-title">{$t("domain.pView")}</div>
        <div class="stat-value">{sums.sumDomainCount}</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">{$t("domain.pUniq")}</div>
        <div class="stat-value">{sums.sumNewVisitorCount}</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">{$t("domain.pAvg")}</div>
        <div class="stat-value">{Math.floor(sums.sumAvgVisitDuration)}s</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">{$t("domain.pBounce")}</div>
        <div class="stat-value">{bounceRate}%</div>
      </div>
    </div>
    <p>{$t("domain.from")}:</p>
    {#if dailyStats.length > 0}
      <div
        class="bg-base-300 flex flex-col max-h-[25vh] overflow-y-auto shadow divide-y-2"
      >
        {#each dailyStats as from}
          <div class="stat">
            <div class="stat-title text-center">
              {from.Visitfrom}:
              <span class="text-2xl text-base-content font-bold"
                >{from.Count}</span
              >
            </div>
            <div class="stat-title text-center">
              {$t("domain.fromAvg")}:
              <span class="text-2xl text-base-content font-bold"
                >{from.AvgVisitDuration}s</span
              >
            </div>
          </div>
        {/each}
      </div>
    {/if}
    {#if os}
      <p>{$t("domain.browser")}</p>
      <div
        class="md:stats !bg-base-300 flex flex-col shadow divide-y-2 md:divide-y-0"
      >
        {#each browser as b}
          <div class="stat">
            <div class="stat-title text-center">{b.ColumnValue}</div>
            <div class="stat-value">{b.Count}</div>
          </div>
        {/each}
      </div>
      <p>{$t("domain.os")}</p>
      <div
        class="md:stats !bg-base-300 flex flex-col shadow divide-y-2 md:divide-y-0"
      >
        {#each os as os1}
          <div class="stat">
            <div class="stat-title text-center">{os1.ColumnValue}</div>
            <div class="stat-value">{os1.Count}</div>
          </div>
        {/each}
      </div>
      <p>{$t("domain.device")}</p>
      <div
        class="md:stats !bg-base-300 flex flex-col shadow divide-y-2 md:divide-y-0"
      >
        {#each device as dev}
          <div class="stat">
            <div class="stat-title text-center">{dev.ColumnValue}</div>
            <div class="stat-value">{dev.Count}</div>
          </div>
        {/each}
      </div>
    {/if}
    <p>{$t("domain.pagesVisited")}</p>
    {#if pages}
      <div
        class="bg-base-300 flex flex-col max-h-[25vh] overflow-y-auto shadow divide-y-2"
      >
        {#each pages as p}
          <div class="stat">
            <div class="stat-title text-center">{p.Page}</div>
            <div class="stat-value">{p.PageCount}</div>
          </div>
        {/each}
      </div>
    {:else}
      <p>no data for pages visited</p>
    {/if}
  {/if}
  {#await data.streamed.total}
  Loading...
{:then total} 
<Htmlcode id={total.ID} /> 
{/await}
</div>

<style>
  div.stat-value {
    text-align: center;
  }
  p {
    margin: 5px 0;
  }
  div.shadow {
    border-radius: var(--rounded-box, 1rem /* 16px */);
  }
</style>
