<script context="module">
  import {writable} from "svelte/store";

  export const TABLE = {};
  export let refresh = writable({});
</script>

<script lang='typescript'>
    import {setContext, onDestroy} from 'svelte';
    import Row from './Row.svelte';

    export let data = [];
    let processedData = [];
    const columns = [];
    let plugins = [];

    refresh.subscribe(() => data = data.concat([]))

    setContext(TABLE, {
        registerColumn: col => {
            columns.push(col);
            onDestroy(() => {
                const i = columns.indexOf(col);
                columns.splice(i, 1);
            });
        },
        registerPlugin: plugin => {
            plugins.push(plugin);
            onDestroy(() => {
                const i = plugins.indexOf(plugin);
                plugins.splice(i, 1);
            });
        },
        getColumns: () => {
            return columns;
        }
    });

    const processData = function () {
        processedData = data;
        plugins.forEach(plugin => {
            processedData = plugin.process(processedData)
        });
        return processedData;
    };

</script>

<table>
    <thead>
    <tr>
        <slot/>
    </tr>
    </thead>
    <tbody>
    {#each processData(data) as item}
        <Row {item}/>
    {/each}
    </tbody>
</table>