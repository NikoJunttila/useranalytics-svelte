<script>
import { onMount } from "svelte";
import { userProfile } from "$lib/stores/userStore";
import { goto } from "$app/navigation";


  export let data
  onMount(() => {
    if (data.userProfile){
     $userProfile = {
       email: data.userProfile.email,
       apikey: data.userProfile.apikey,
       loggedIn: data.userProfile.loggedIn,
      };
      goto("/user/dashboard")
    }
  });
</script>
<slot />