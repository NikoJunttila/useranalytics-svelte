  // @ts-nocheck
import Spinner from "$lib/Spinner.svelte";

export const loader = (node, loading) => {
	let Spin, loadingValue;
	const unsubscribe = loading.subscribe(loading => {
		if(loading){
			Spin = new Spinner({
				target: node,
				intro: true
			})
		} else {
			if(Spin){
				Spin?.$destroy?.()
				Spin = undefined;
			}
		}
	})
}

import { writable  }from 'svelte/store';
export const loading = writable(false);