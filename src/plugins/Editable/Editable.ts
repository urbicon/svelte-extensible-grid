import AbstractPlugin from '../AbstractPlugin';
import Cell from './Cell.svelte';

export default class extends AbstractPlugin {
    private partials = {
        cell: {
            after: Cell
        }
    };

    constructor(config: object, prop: string) {
        super(config, prop);
    }
}