import { doesNotSatisfy } from './mustSatisfy';

/**
 * @hidden
 */
function beAnArray(): string {
    return "be an array";
}

/**
 * @hidden
 */
export function mustBeArray<T>(name: string, value: T[], contextBuilder?: () => string): T[] {
    if (Array.isArray(value)) {
        return value;
    }
    else {
        doesNotSatisfy(name, beAnArray, contextBuilder);
    }
}
