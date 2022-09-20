import mustSatisfy from './mustSatisfy';
import isInteger from './isInteger';

/**
 * @hidden
 */
function beAnInteger() {
    return "be an integer";
}

/**
 * @hidden
 */
export default function mustBeInteger(name: string, value: number, contextBuilder?: () => string): number {
    mustSatisfy(name, isInteger(value), beAnInteger, contextBuilder);
    return value;
}
