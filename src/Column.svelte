<script lang='typescript'>
    import {getContext, afterUpdate} from 'svelte';
    import {TABLE} from './Table.svelte';
    import {Pluggable} from "./plugins/table-plugins";

    const {registerColumn, registerPlugin} = getContext(TABLE);
    export let prop = '';
    export let plugins = {};
    let target;
    let anchor;
    const pluggable = new Pluggable(registerPlugin, plugins, prop);
    registerColumn({prop, pluggable});

    const onClick = function (evt: PointerEvent) {
        pluggable.handleHeaderClick(evt)
    }

    afterUpdate(() => pluggable.render('header', target, anchor));

</script>

<th on:click={onClick} bind:this={target}>
    <span bind:this={anchor}>
        <slot/>
    </span>
</th>