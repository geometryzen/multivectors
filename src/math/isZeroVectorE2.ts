import { VectorE2 } from './VectorE2';

/**
 * Returns true if all coordinates of the vector are exactly zero.
 * @hidden
 */
export function isZeroVectorE2(v: VectorE2): boolean {
    return v.x === 0 && v.y === 0;
}
