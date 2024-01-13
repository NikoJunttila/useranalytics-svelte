<script>
  // @ts-nocheck
  import { notifications } from "$lib/stores/notifications";
  import { beforeUpdate } from "svelte";
  import { userProfile } from "$lib/stores/userStore";
  import { goto } from "$app/navigation";
  import {endpoint} from "$lib/js/endpoints"

  let formData = {
    name: "",
    email: "",
    password: "",
  };
  let confirmpass = "";
  let minlen = false;
  let hasUpper = false;
  let hasNumber2 = false;
  let passIsValid = false;
  let firstpassValid = false;
  let emailValid = false;
  function validateEmail() {
    emailValid = /[@]/.test(formData.email);
  }

  function validatePassword() {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    if (formData.password.length >= minLength) {
      minlen = true;
    } else {
      minlen = false;
    }
    hasUppercase ? (hasUpper = true) : (hasUpper = false);
    hasNumber ? (hasNumber2 = true) : (hasNumber2 = false);

    const isPasswordValid =
      formData.password.length >= minLength && hasUppercase && hasNumber;
    isPasswordValid ? (firstpassValid = true) : (firstpassValid = false);
    const passwordsMatch = formData.password === confirmpass;
    passIsValid = isPasswordValid && passwordsMatch;
  }
  beforeUpdate(() => {
    validatePassword();
    validateEmail();
  });
  async function handleSubmit() {
    // @ts-ignore
    if (formData.password != confirmpass) {
      notifications.warning("Passwords don't match", 2000);
      return;
    }
    try {
      const response = await fetch(`${endpoint}/v1/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let data = await response.json();
      if (response.ok) {
        notifications.success("Succesfully created user! Redirecting...", 2000);
        console.log(data);
        document.cookie = `api_key=${data.api_key}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
        console.log("API key has been set as a cookie.");
        $userProfile = {
          name: data.name,
          email: data.email,
          apikey: data.api_key,
          loggedIn: true,
        };
        setTimeout(() => goto("/user/dashboard"), 500);
      } else {
        notifications.warning("email already taken", 2000);
        console.error("Error:", response.text, response.statusText);
      }
    } catch (error) {
      notifications.danger(error, 3000);
      console.error("Error:", error);
    }
  }
</script>
<div class="flex justify-center items-center pt-5">
  <form
    on:submit|preventDefault={handleSubmit}
    class="flex flex-col p-5 gap-3 bg-base-200 rounded w-full md:w-96"
  >
    <label for="name">Name:</label>
    <input
      class="form-input"
      type="text"
      id="name"
      bind:value={formData.name}
      name="name"
      placeholder="Name"
      required
    />

    <label for="email">Email:</label>
    <input
      class="form-input"
      type="email"
      on:input={validateEmail}
      id="email"
      bind:value={formData.email}
      name="email"
      placeholder="Email"
      required
    />
    {#if formData.email && !emailValid}
      <p class="text-red-900 text-xs">Please enter a valid email address.</p>
    {/if}
    <label for="password">Password:</label>
    <input
      class="form-input"
      on:input={validatePassword}
      type="password"
      id="password"
      bind:value={formData.password}
      name="password"
      placeholder="Password"
      required
    />
    {#if formData.password && !firstpassValid}
      <p class="text-red-900 text-xs">
        Password must have
        {#if !minlen}
          atleast 8 characters,
        {/if}
        {#if !hasUpper}
          contain an uppercase letter,
        {/if}
        {#if !hasNumber2}
          a Number
        {/if}
      </p>
    {/if}
    <label for="confirm_password">Confirm Password:</label>
    <input
      class="form-input"
      on:input={validatePassword}
      type="password"
      id="confirm_password"
      bind:value={confirmpass}
      name="confirm_password"
      placeholder="Confirm Password"
      required
    />
    {#if formData.password && confirmpass && formData.password !== confirmpass}
      <p class="error">Passwords do not match.</p>
    {/if}
    <button
      disabled={!passIsValid || !emailValid}
      class="btn bg-green-400"
      type="submit">Create</button
    >
  </form>
</div>

<style>
  :disabled {
    background-color: rgb(226, 3, 3);
    opacity: 0.7;
    color: black;
  }
</style>
