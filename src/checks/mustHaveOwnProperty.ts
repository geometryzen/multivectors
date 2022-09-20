import isDefined from './isDefined';
import { mustBeDefined } from './mustBeDefined';
import mustSatisfy from './mustSatisfy';

/**
 * @hidden
 */
function haveOwnProperty(prop: string) {
    return function () {
        return "have own property `" + prop + "`";
    };
}

/**
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function mustHaveOwnProperty(name: string, value: {}, prop: string, contextBuilder?: () => string): void {
    mustBeDefined('name', name);
    mustBeDefined('prop', prop);
    if (isDefined(value)) {
        // eslint-disable-next-line no-prototype-builtins
        if (!value.hasOwnProperty(prop)) {
            mustSatisfy(name, false, haveOwnProperty(prop), contextBuilder);
        }
    }
    else {
        mustBeDefined(name, value, contextBuilder);
    }
}
