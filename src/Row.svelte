<script lang='typescript'>
    import {getContext} from 'svelte';
    import {TABLE} from './Table.svelte';
    import Cell from './Cell.svelte';

    export let item = {}
    const {getColumns} = getContext(TABLE);
    const columns = getColumns();
</script>

<tr>
    {#each columns as col}
        <Cell pluggable="{col.pluggable}">{item[col.prop]}</Cell>
    {/each}
</tr>