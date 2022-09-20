import { AbelianOperators } from './AbelianOperators';
import { Unit } from './Unit';
/**
 * A ring is an abelian group with a second binary operation that is associative,
 * is distributive over the abelian group operation and has an identity element.
 * @hidden
 */
export interface RingOperators<T> extends AbelianOperators<T> {

    /**
     * Multiplication of the the target from the right.
     */
    __mul__(rhs: T | Unit | number): T;

    /**
     * Multiplication of the the target from the left.
     */
    __rmul__(lhs: T | Unit | number): T;

    /**
     * The multiplicative inverse is denoted by inv.
     */
    inv(): T;

    /**
     * Determines whether this element is the multiplicative identity, <b>1</b>.
     */
    isOne(): boolean;
}
