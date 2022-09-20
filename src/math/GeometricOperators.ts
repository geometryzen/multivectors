import { LinearOperators } from './LinearOperators';
import { RingOperators } from './RingOperators';
import { Unit } from './Unit';

/**
 * Special methods for operators on elements of geometric spaces.
 * @hidden
 */
export interface GeometricOperators<T> extends LinearOperators<T>, RingOperators<T> {
    __div__(rhs: T | Unit | number): T;
    __rdiv__(lhs: T | Unit | number): T;

    __vbar__(rhs: T | Unit | number): T;
    __rvbar__(lhs: T | Unit | number): T;

    __wedge__(rhs: T | Unit | number): T;
    __rwedge__(lhs: T | Unit | number): T;

    __lshift__(rhs: T | Unit | number): T;
    __rlshift__(lhs: T | Unit | number): T;

    __rshift__(rhs: T | Unit | number): T;
    __rrshift__(lhs: T | Unit | number): T;

    /**
     * !x = x.inv()
     */
    __bang__(): T;

    /**
     * Inverse (may not exist).
     */
    inv(): T;

    __eq__(rhs: T | Unit | number): boolean;
    __ne__(rhs: T | Unit | number): boolean;
}
