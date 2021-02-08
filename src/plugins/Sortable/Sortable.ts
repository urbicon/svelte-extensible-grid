import {writable} from 'svelte/store';
import AbstractPlugin from "../AbstractPlugin";
import Header from "./Header.svelte";

export const currentDir = writable('ASC');

export default class extends AbstractPlugin {

    private currentDir = 'ASC';
    private partials = {
        header: {
            after: Header
        }
    };

    constructor(config: object, prop: string) {
        super(config, prop);
        this.currentDir = config.dir;
        currentDir.set(this.currentDir);
    }

    private normalize(value: any) {
        return typeof value === 'string' ? value.toUpperCase() : value;
    };

    private compare(a: object, b: object) {
        if (this.normalize(a[this.prop]) < this.normalize(b[this.prop])) {
            return this.normalize(this.currentDir) === 'DESC' ? 1 : -1;
        }
        if (this.normalize(a[this.prop]) > this.normalize(b[this.prop])) {
            return this.normalize(this.currentDir) === 'DESC' ? -1 : 1;
        }
        return 0;
    };

    private clickHandler(evt: PointerEvent) {
        this.currentDir = (this.currentDir === 'ASC') ? 'DESC' : 'ASC';
        currentDir.set(this.currentDir);
        return true;
    }

    public process(data: Array<object>) {
        return data.sort((a, b) => this.compare(a, b));
    };
};