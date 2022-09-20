import isNull from '../checks/isNull';
import isNumber from '../checks/isNumber';
import isObject from '../checks/isObject';
import { SpinorE3 } from './SpinorE3';

/**
 * Determines whether the argument supports the SpinorE3 interface.
 * The argument must be a non-null object and must support the a, xy, yz, and zx numeric properties.
 * @hidden
 */
export default function isSpinorE3(v: unknown): v is SpinorE3 {
    if (isObject(v) && !isNull(v)) {
        return isNumber((<SpinorE3>v).a) && isNumber((<SpinorE3>v).xy) && isNumber((<SpinorE3>v).yz) && isNumber((<SpinorE3>v).zx);
    }
    else {
        return false;
    }
}
