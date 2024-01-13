import { writable } from "svelte/store";

export const userProfile = writable({email:"",apikey:"",loggedIn:false})