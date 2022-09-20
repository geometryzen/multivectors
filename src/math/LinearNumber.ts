/**
 * This interface is provided to ensure consistency.
 * It is not part of the documented API.
 * Notice that the effect on the target depends upon whether the target class is mutable.
 * MAGNITUDE is the chosen type for the magnitude method and scaling.
 * For dimensionless quantities without units, use number.
 * For linear quantities with units, you may use Unit.
 * For geometric quantities with units, you may use the quantity itself because it can represent a scalar.
 */

import { Unit } from "./Unit";

/**
 * @hidden
 * I: The lightweight interface form of the concreate class, usually just coordinates.
 * M: The concrete class
 * S: The lightweight interface form of the spinor.
 * V: The lightweight interface form of the vector.
 * F: The field over which the LinearNumber is defined.
 */
export interface LinearNumber<I, M, S, V, F> {
  add(rhs: I, α?: F): M;
  divByScalar(a: F, uom?: Unit): M;
  /**
   * Determines whether two number are equal.
   */
  equals(other: unknown): boolean;
  scale(α: F): M;
  mulByScalar(a: F, uom?: Unit): M;
  neg(): M;
  reflect(n: V): M;
  rotate(rotor: S): M;
  sub(rhs: I, α?: F): M;
  toExponential(fractionDigits?: number): string;
  toFixed(fractionDigits?: number): string;
  toLaTeX(radix?: number): string;
  toPrecision(precision?: number): string;
  toString(radix?: number): string;
}
