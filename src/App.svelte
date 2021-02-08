<script lang='typescript'>
  import {Table, Column, data} from './table.js';
</script>

<Table data={data}>
    <Column plugins={{Sortable: {dir: 'ASC'}}} prop="foo">Foo</Column>
    <Column plugins={{Filterable: {}}} prop="bar">Bar</Column>
    <Column plugins={{Editable: {}}} prop="baz">Baz</Column>
</Table>