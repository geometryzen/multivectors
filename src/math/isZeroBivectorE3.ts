import { BivectorE3 } from './BivectorE3';

/**
 * Returns true if all coordinates of the bivector are exactly zero.
 * @hidden
 */
export default function isZeroBivectorE3(m: BivectorE3): boolean {
    return m.yz === 0 && m.zx === 0 && m.xy === 0;
}
