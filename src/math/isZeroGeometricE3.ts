import { GeometricE3 } from './GeometricE3';
import isZeroBivectorE3 from './isZeroBivectorE3';
import isZeroVectorE3 from './isZeroVectorE3';

/**
 * Returns true if all coordinates of the vector are exactly zero.
 * @hidden
 */
export function isZeroGeometricE3(m: GeometricE3): boolean {
    return isZeroVectorE3(m) && isZeroBivectorE3(m) && m.a === 0 && m.b === 0;
}
