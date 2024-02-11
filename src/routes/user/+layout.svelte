<script>
import { onMount } from "svelte";
import { userProfile } from "$lib/stores/userStore";
import { goto } from "$app/navigation";
import { page } from '$app/stores';  



  export let data
  onMount(() => {
    if (data.userProfile){
     $userProfile = {
       email: data.userProfile.email,
       apikey: data.userProfile.apikey,
       loggedIn: data.userProfile.loggedIn,
      };
      if ($page.url.pathname === "/user/login")
        goto("/user/dashboard")
    }
  });
</script>
<slot />