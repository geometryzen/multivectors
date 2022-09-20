import isNull from '../checks/isNull';
import isNumber from '../checks/isNumber';
import isObject from '../checks/isObject';
import { VectorE2 } from './VectorE2';

/**
 * Determines whether the argument supports the VectorE3 interface.
 * The argument must be a non-null object and must support the x, y, and z numeric properties.
 * @deprecated Do not use this because it could accept types that have scalar and bivector components.
 * @hidden
 */
export function isVectorE2(v: unknown): v is VectorE2 {
    if (isObject(v) && !isNull(v)) {
        return isNumber((<VectorE2>v).x) && isNumber((<VectorE2>v).y);
    }
    else {
        return false;
    }
}
