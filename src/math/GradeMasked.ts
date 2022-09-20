/**
 * Marker interface
 *
 * Cartesian coordinates
 * 3 linear dimensions
 * No units of measure
 * Euclidean metric.
 * @hidden
 */
export interface GradeMasked {
  /**
   * A bitmask describing the presence of non-zero grades.
   *
   * 0x0 = none
   * 0x1 = scalar
   * 0x2 = vector
   * 0x4 = bivector
   * 0x8 = pseudoscalar
   */
  grades: number;
}
