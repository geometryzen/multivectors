import { AbelianOperators } from './AbelianOperators';
/**
 * Special methods for operators on elements of linear spaces.
 * This is provided for interface consistency.
 * It may not adhere to strict mathematical definitions.
 * @hidden
 */
export interface LinearOperators<T> extends AbelianOperators<T> {
    /**
     * Unary ~
     */
    __tilde__(): T;
}
