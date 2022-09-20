import mustSatisfy from './mustSatisfy';
import isNull from './isNull';
import isObject from './isObject';

/**
 * @hidden
 */
function beObject() {
    return "be a non-null `object`";
}

/**
 * @hidden
 */
export function mustBeNonNullObject<T>(name: string, value: T, contextBuilder?: () => string): T {
    mustSatisfy(name, isObject(value) && !isNull(value), beObject, contextBuilder);
    return value;
}
