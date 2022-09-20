import mustSatisfy from './mustSatisfy';
import isString from './isString';

/**
 * @hidden
 */
function beAString() {
    return "be a string";
}

/**
 * @hidden
 */
export default function (name: string, value: string, contextBuilder?: () => string): string {
    mustSatisfy(name, isString(value), beAString, contextBuilder);
    return value;
}
