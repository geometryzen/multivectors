import isDefined from './isDefined';
import mustSatisfy from './mustSatisfy';

/**
 * @hidden
 */
function beDefined() {
    return "not be 'undefined'";
}

/**
 * @hidden
 */
export function mustBeDefined<T>(name: string, value: T, contextBuilder?: () => string): T {
    mustSatisfy(name, isDefined(value), beDefined, contextBuilder);
    return value;
}
