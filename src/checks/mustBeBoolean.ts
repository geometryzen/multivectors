import mustSatisfy from './mustSatisfy';
import isBoolean from './isBoolean';

/**
 * @hidden
 */
function beBoolean() {
    return "be `boolean`";
}

/**
 * @hidden
 */
export function mustBeBoolean(name: string, value: boolean, contextBuilder?: () => string): boolean {
    mustSatisfy(name, isBoolean(value), beBoolean, contextBuilder);
    return value;
}
