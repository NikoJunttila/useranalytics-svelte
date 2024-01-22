<script>
// @ts-nocheck

    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "./stores/notifications.js";

    export let themes = {
        danger: "#E26D69",
        success: "#84C991",
        warning: "#f0ad4e",
        info: "#5bc0de",
        default: "#aaaaaa",
    };
</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="alert toast"
            role="alert"
            style="background: {themes[notification.type]};"
            in:fly={{ delay:250, y: 30 }}
        >
            <span class="content">{notification.message}</span>
            {#if notification.icon}<i class={notification.icon} />{/if}
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        top: 10vh;
        left: 0;
        right: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
    }
    .toast {
        flex: 0 0 auto;
        position: relative;
        max-width: 1250px;
    }
    .content{
        color: white;
        mix-blend-mode: difference;
    }
</style>