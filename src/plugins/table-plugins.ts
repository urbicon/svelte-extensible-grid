import Filterable from './Filterable/Filterable';
import Sortable from './Sortable/Sortable';
import Editable from './Editable/Editable';
import {refresh} from '../Table.svelte';

interface Plugins {
    Filterable: Filterable;
    Sortable: Sortable;
    Editable: Editable;
}

export const PluginFactory = {
    plugins: {Filterable, Sortable, Editable},
    createNewInstance(name: string, config: object, prop: string) {
        return new this.plugins[name as keyof Plugins](config, prop);
    }
};

export class Pluggable {

    private _plugins: object;

    public get plugins(): object {
        return this._plugins;
    }

    public set plugins(value: object) {
        this._plugins = value;
    }

    constructor(registerPlugin: Function, plugins: object, prop: string) {
        this._plugins = {};
        this.registerPlugins(registerPlugin, plugins, prop);
    }

    private registerPlugins(registerPlugin: Function, plugins: object, prop: string) {
        for (const name in plugins) {
            this._plugins[name] = PluginFactory.createNewInstance(name, plugins[name], prop);
            registerPlugin(this._plugins[name]);
        }
    }

    public render(scope: string, target: Element, anchor: Element) {
        for (let name in this._plugins) {
            this._plugins[name].render(scope, target, anchor);
        }
    };

    public handleHeaderClick(evt: PointerEvent) {
        let forceRefresh = false;
        for (const name in this._plugins) {
            forceRefresh = forceRefresh || this._plugins[name].handleEvent(evt);
        }
        if (forceRefresh) {
            refresh.set({});
        }
    };
}
