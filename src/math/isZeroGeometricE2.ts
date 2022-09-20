import { GeometricE2 } from './GeometricE2';
import { isZeroBivectorE2 } from './isZeroBivectorE2';
import { isZeroVectorE2 } from './isZeroVectorE2';

/**
 * Returns true if all coordinates of the vector are exactly zero.
 * @hidden
 */
export function isZeroGeometricE2(m: GeometricE2): boolean {
    return isZeroVectorE2(m) && isZeroBivectorE2(m) && m.a === 0 && m.b === 0;
}
