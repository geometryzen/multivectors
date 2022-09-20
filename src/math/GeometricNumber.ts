import { LinearNumber } from './LinearNumber';
import { Unit } from './Unit';

/**
 * This interface is provided to ensure consistency.
 * It is not part of the documented API.
 * Notice that the effect on the target depends upon whether the target class in mutable.
 * I: The lightweight interface form of the concreate class, usually just coordinates.
 * M: The concrete class
 * S: The lightweight interface form of the spinor.
 * V: The lightweight interface form of the vector.
 * F: The field over which the LinearNumber is defined.
 */
export interface GeometricNumber<I, M, S, V, F> extends LinearNumber<I, M, S, V, F> {

    /**
     * Addition of a scalar.
     */
    addScalar(a: F, uom?: Unit, α?: number): M;

    addVector(vector: V, α?: number): M;

    /**
     * Makes a copy of this multivector.
     * The resulting multivector is mutable (unlocked).
     */
    clone(): M;

    /**
     * Clifford Conjugation.
     * 
     * The multiplier for grade a is (-1)^(a(a+1)/2).
     * 
     * This gives the pattern + - - + + - - +
     */
    conj(): M;

    /**
     * Left contraction
     */
    lco(rhs: I): M;

    /**
     * divide really only applies to division algebras, may not be defined.
     */
    div(rhs: I): M;
    /**
     *
     */
    divByVector(rhs: V): M;

    /**
     * dualization: dual(Ak) = Ak << inv(I)
     * 
     * For a Euclidean space inv(I) = + rev(I)
     * 
     * For a Minkowski space inv(I) = - rev(I)
     * 
     * See Geometric Algebra for Computer Science, p80. 
     */
    dual(): M;

    /**
     * Exterior or Outer Product.
     */
    ext(rhs: I): M;

    /**
     * extraction of grade.
     */
    grade(grade: number): M;

    /**
     * Inverse (may not exist).
     */
    inv(): M;

    /**
     *
     */
    isOne(): boolean;

    /**
     * A multivector is considered to be a scalar if all coordinates with grade other than zero are zero.
     */
    isScalar(): boolean;

    /**
     * A multivector is considered to be a spinor if all coordinates with grade other than 0 and 2 are zero.
     */
    isSpinor(): boolean;

    /**
     * A multivector is considered to be a vector if all coordinates with grade other than 1 are zero.
     */
    isVector(): boolean;

    /**
     * A multivector is considered to be a bivector if all coordinates with grade other than 2 are zero.
     */
    isBivector(): boolean;

    /**
     *
     */
    isZero(): boolean;

    /**
     * Multiplication.
     */
    mul(rhs: I): M;
    /**
     * 
     * @param rhs
     */
    mulByVector(rhs: V): M;

    /**
     * squared norm, scp(x, rev(x))
     */
    quaditude(): M;

    /**
     * squared norm, scp(x, rev(x))
     */
    quaditudeNoUnits(): F;

    /**
     * Right contraction
     */
    rco(rhs: I): M;

    /**
     * Reverse
     */
    rev(): M;

    /**
     * Scalar Product
     */
    scp(rhs: I): M;

    subScalar(a: F, uom?: Unit, α?: number): M;

    subVector(vector: V, α?: number): M;

    /**
     * Square Root.
     */
    sqrt(): M;

    /**
     * Squared norm: ||x||**2 = scp(x, rev(x))
     */
    squaredNorm(): M;
}
