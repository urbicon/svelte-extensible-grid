<script context="module" lang="ts">
    import {writable} from "svelte/store";
    export const filter = writable('');
</script>

<div>
    <input bind:value={$filter}>
</div>

