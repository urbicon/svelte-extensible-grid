interface Handlers {
    clickHandler: Function;
}

export default class {

    private config: object;

    private prop: string;

    private partials = {
        table: {},
        header: {},
        row: {},
        cell: {}
    };

    constructor(config: object, prop: string) {
        this.config = config;
        this.prop = prop;
    }

    public process(data: Array<object>): object {
        return data;
    };

    public render(scope: string, target: Element, anchor?: Element) {
        if(!this.partials[scope]){
            return;
        }
        if (this.partials[scope].before) {
            this.renderPartial(this.partials[scope].before, target, anchor)
        }
        if (this.partials[scope].after) {
            this.renderPartial(this.partials[scope].after, target)
        }
    };

    private renderPartial(partial: any, target: Element, anchor?: Element) {
        const options = {target}
        if (anchor) {
            options.anchor = anchor;
        }
        new partial(options);
    }

    public handleEvent(evt: PointerEvent): boolean {
        const handler = this[evt.type + 'Handler' as keyof Handlers];
        if (typeof handler === 'function') {
            return handler.call(this, evt);
        }
        return false;
    }
}