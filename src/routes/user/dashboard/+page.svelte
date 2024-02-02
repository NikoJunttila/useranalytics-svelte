<script>
  // @ts-nocheck
  import { notifications } from "$lib/stores/notifications";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import { endpoint } from "$lib/js/endpoints";
  import { loading } from "$lib/stores/loader.js";
  export let data;

  let domainData = {
    name: "",
    url: "",
  };

  async function newDomain() {
    try {
      loading.set(true);
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
      loading.set(false);
      if (res.ok) {
        notifications.success(
          "Succesfully created domain. Redirecting...",
          2000
        );
        goto(`/user/domain/${data.ID}`);
      } else {
        notifications.danger(data.error, 3000);
      }
    } catch (error) {
      console.error(error);
      loading.set(false);
      notifications.danger(error, 3000);
    }
  }

  let domain_id = "";

  async function getFollow() {
    try {
      loading.set(true);
      const url = `${endpoint}/v1/feed_follows`;
      const options = {
        method: "POST",
        headers: {
          Authorization: "ApiKey " + $userProfile.apikey,
        },
        body: JSON.stringify({ domain_id: domain_id }),
      };
      const res = await fetch(url, options);
      const newFollow = await res.json();
      loading.set(false);
      if (res.ok) {
        goto(`/user/domain/${newFollow.DomainID}`);
      } else {
        notifications.danger(newFollow.error, 3000);
      }
    } catch (error) {
      loading.set(false);
      console.error(error);
      notifications.danger(error, 3000);
    }
  }
  let password = ""
  let newPass = ""
  async function reset(){
    try{
    loading.set(true);
      const url = `${endpoint}/v1/passChange`;
      const options = {
        method: "POST",
        headers: {
          Authorization: "ApiKey " + $userProfile.apikey,
        },
        body: JSON.stringify({ oldPass: password,newPass: newPass}),
      };
      const res = await fetch(url, options);
      loading.set(false);
      if (res.ok) {
        notifications.success(
          "Succesfully changed password",
          4000
        );
        password = ""
        newPass = ""
      } else {
        notifications.danger(res.status, 3000);
      }
    } catch (error) {
      loading.set(false);
      console.error(error);
      notifications.danger(error, 3000);
    }
  }
</script>

<section class="flex flex-col justify-center items-center">
  <div class="text-center">
    <p>{$userProfile.email}</p>
    <button class="btn my-2" onclick="my_modal_3.showModal()">Change password</button>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button
          >
        </form>
        <h3 class="font-bold text-lg text-center">Password change</h3>
        <form class="text-center" on:submit|preventDefault={reset}>
          <label for="password" class="py-4 mr-2">Old password:</label>
          <input class="my-3 input bg-base-300" type="password" bind:value={password} name="password" id="password">
          <br>
          <label for="newPass" class="py-4 mr-2">New password:</label>
          <input class="my-3 input bg-base-300" type="password" bind:value={newPass} name="newPass" id="newPass">
          <br>
          <button class="btn" type="submit">Change password</button>
        </form>
      </div>
    </dialog>
    <p class="mb-4">Added domains</p>
    {#if data.domains}
      <div class="flex flex-wrap gap-2">
        {#each data.domains as domain}
          <a href="/user/domain/{domain.DomainID}" target="_blank">
            <div
              class="card overflow-hidden p-2 h-32 w-32 text-xl bg-base-300 grid place-items-center hover:bg-base-200"
            >
              {domain.DomainName}
            </div>
          </a>
        {/each}
      </div>
    {/if}
    <p class="text-xl my-2">
      Create new tracking link and start analysing user stats.
    </p>
    <form on:submit|preventDefault={newDomain}>
      <label for="name">Name:</label>
      <input
        name="name"
        id="name"
        class="rounded-md"
        bind:value={domainData.name}
        type="text"
        placeholder="name"
      />
      <label for="url">Url:</label>
      <input
        name="url"
        id="url"
        class="rounded-md"
        bind:value={domainData.url}
        type="text"
        placeholder="url"
      />
      <button class="btn">Create</button>
    </form>
    <p class="mt-5 mb-2 text-xl">
      Follow someone elses domain <span class="text-base"
        >(You need to get ID from them.)</span
      >
    </p>
    <form on:submit|preventDefault={getFollow}>
      <!--       <label for="name">Name:</label>
      <input class="rounded-md" bind:value={follow.domain_name} type="text" placeholder="name" /> -->
      <label for="id">ID:</label>
      <input
        id="id"
        name="id"
        class="rounded-md"
        bind:value={domain_id}
        type="text"
        placeholder="domain id"
      />
      <button class="btn">Follow</button>
    </form>
  </div>
</section>

<style>
  p {
    font-size: 1.2rem;
  }

</style>
