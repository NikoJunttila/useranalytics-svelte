import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

//endpoint = backend location
export const endpoint = browser ? env.PUBLIC_ENDPOINT : (env.PUBLIC_INTERNAL_ENDPOINT || env.PUBLIC_ENDPOINT);
export const exampleID = env.PUBLIC_EXAMPLE_ID;
export const jsDelivr = env.PUBLIC_JS_DELIVR_URL ?? "https://cdn.jsdelivr.net/gh/NikoJunttila/userAnalytics@main/javascript/tracker.js";
