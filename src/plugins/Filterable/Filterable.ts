import AbstractPlugin from '../AbstractPlugin';
import Header from './Header.svelte';
import {isString, isNumber, isEmpty} from "lodash-es";
import {filter} from './Header.svelte';
import {refresh} from '../../Table.svelte';

export default class extends AbstractPlugin {
    private filterExpression = '';
    private partials = {
        header: {
            after: Header
        }
    };

    constructor(config: object, prop: string) {
        super(config, prop);
        filter.subscribe(str => {
            this.filterExpression = str;
            refresh.set({});
        });
    }

    public process(data: Array<object>) {
        if (isEmpty(this.filterExpression)) {
            return data;
        }
        return data.filter(item => {
            if (!isString(item[this.prop]) && !isNumber(item[this.prop])) {
                return true;
            }
            return new RegExp(this.filterExpression).test(item[this.prop]);
        });
    };
}