import isNull from '../checks/isNull';
import isNumber from '../checks/isNumber';
import isObject from '../checks/isObject';
import { SpinorE2 } from './SpinorE2';

/**
 * Determines whether the argument supports the SpinorE2 interface.
 * The argument must be a non-null object and must support the a, and xy numeric properties.
 * @hidden
 */
export function isSpinorE2(v: unknown): v is SpinorE2 {
    if (isObject(v) && !isNull(v)) {
        return isNumber((<SpinorE2>v).a) && isNumber((<SpinorE2>v).xy);
    }
    else {
        return false;
    }
}
