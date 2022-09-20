import { doesNotSatisfy } from './mustSatisfy';

/**
 * @hidden
 */
function beFunction() {
    return "be a function";
}

/**
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function mustBeFunction(name: string, value: unknown, contextBuilder?: () => string): Function {
    if (typeof value === 'function') {
        return value;
    }
    else {
        doesNotSatisfy(name, beFunction, contextBuilder);
    }
}
