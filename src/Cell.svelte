<script lang='typescript'>
    import {afterUpdate} from 'svelte';

    export let pluggable = {};
    let target;
    let anchor;

    afterUpdate(() => pluggable.render('cell', target, anchor));

</script>

<td bind:this={target}>
    <span bind:this={anchor}>
        <slot></slot>
    </span>
</td>