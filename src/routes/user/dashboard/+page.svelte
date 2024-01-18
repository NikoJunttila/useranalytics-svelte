<script>
// @ts-nocheck
  import { notifications } from "$lib/stores/notifications";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import {endpoint} from "$lib/js/endpoints"
  export let data;

  let domainData = {
    name: "",
    url: "",
  };
  
  async function newDomain() {
    try {
      const url = `${endpoint}/v1/domains`;
      const options = {
        method: "POST",
        headers: {
          Authorization: "ApiKey " + $userProfile.apikey,
        },
        body: JSON.stringify(domainData),
      };
      const res = await fetch(url, options);
      let data = await res.json();
      if (res.ok) {
        notifications.success(
          "Succesfully created domain. Redirecting...",
          2000
        );
        goto(`/user/domain/${data.ID}`);
      }else {
        notifications.danger(data.error, 3000);
      }
    } catch (error) {
      console.error(error);
      notifications.danger(error, 3000);
    }
  }

let domain_id = ""

async function getFollow(){
  try {
      const url = `${endpoint}/v1/feed_follows`;
      const options = {
        method: "POST",
        headers: {
          Authorization: "ApiKey " + $userProfile.apikey,
        },
        body: JSON.stringify({domain_id: domain_id})
      };
      const res = await fetch(url, options);
      const newFollow = await res.json();
      if (res.ok) {
        goto(`/user/domain/${newFollow.DomainID}`);
      }else {
        notifications.danger(newFollow.error, 3000);
      }
    } catch (error) {
      console.error(error);
      notifications.danger(error, 3000);
    }
}
</script>
<style>
  p{
    font-size: 1.2rem;
  }
</style>
<section class="flex flex-col justify-center items-center">
  <div class="text-center">
    <p>{$userProfile.email}</p>
    <button on:click={() => console.log($userProfile)}>tester</button>
    <p class="mb-4" >Added domains</p>
    {#if data.domains}
    <div class="flex flex-wrap gap-2">
      {#each data.domains as domain}
      <a href="/user/domain/{domain.DomainID}">
        <div class="card h-32 w-32 text-2xl bg-base-300 grid place-items-center hover:bg-base-200">
          <h2>{domain.DomainName}</h2>
        </div>
      </a>
      {/each}
    </div>
      {/if}
    <p class="text-xl my-2">Create new tracking link and start analysing user stats.</p>
    <form on:submit|preventDefault={newDomain}>
      <label for="name">Name:</label>
      <input name="name" class="rounded-md" bind:value={domainData.name} type="text" placeholder="name" />
      <label for="url">Url:</label>
      <input name="url" class="rounded-md" bind:value={domainData.url} type="text" placeholder="url" />
      <button class="btn">Create</button>
    </form>
    <p class="mt-5 mb-2 text-xl">Follow someone elses domain <span class="text-base">(You need to get ID from them.)</span></p>
    <form on:submit|preventDefault={getFollow}>
<!--       <label for="name">Name:</label>
      <input class="rounded-md" bind:value={follow.domain_name} type="text" placeholder="name" /> -->
      <label for="id">ID:</label>
      <input name="id" class="rounded-md" bind:value={domain_id} type="text" placeholder="domain id" />
      <button class="btn">Follow</button>
    </form>
  </div>
</section>