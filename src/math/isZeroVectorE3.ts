import { VectorE3 } from './VectorE3';

/**
 * Returns true if all coordinates of the vector are exactly zero.
 * @hidden
 */
export default function isZeroVectorE3(v: VectorE3): boolean {
    return v.x === 0 && v.y === 0 && v.z === 0;
}
