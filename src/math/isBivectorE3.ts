import isNull from '../checks/isNull';
import isNumber from '../checks/isNumber';
import isObject from '../checks/isObject';
import { BivectorE3 } from './BivectorE3';

/**
 * Determines whether the argument supports the BivectorE3 interface.
 * The argument must be a non-null object and must support the yz, zx, and xy numeric properties.
 * @hidden
 */
export default function isBivectorE3(v: unknown): v is BivectorE3 {
    if (isObject(v) && !isNull(v)) {
        return isNumber((<BivectorE3>v).xy) && isNumber((<BivectorE3>v).yz) && isNumber((<BivectorE3>v).zx);
    }
    else {
        return false;
    }
}
