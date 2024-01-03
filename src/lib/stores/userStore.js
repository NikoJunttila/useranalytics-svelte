import { writable } from "svelte/store";

export const userProfile = writable({name: "",email:"",apikey:"",loggedIn:false})