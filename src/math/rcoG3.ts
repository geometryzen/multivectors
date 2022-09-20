import { compG3Get as get } from './compG3Get';
import { compG3Set as set } from './compG3Set';
import { GeometricE3 } from './GeometricE3';
import { rcoE3 } from './rcoE3';
import { Unit } from './Unit';

/**
 * @hidden
 * @param a 
 * @param b 
 * @param out 
 * @returns 
 */
export default function rcoG3<T extends GeometricE3>(a: GeometricE3, b: GeometricE3, out: T): T {

    out.uom = Unit.mul(a.uom, b.uom);

    const a0 = get(a, 0);
    const a1 = get(a, 1);
    const a2 = get(a, 2);
    const a3 = get(a, 3);
    const a4 = get(a, 4);
    const a5 = get(a, 5);
    const a6 = get(a, 6);
    const a7 = get(a, 7);

    const b0 = get(b, 0);
    const b1 = get(b, 1);
    const b2 = get(b, 2);
    const b3 = get(b, 3);
    const b4 = get(b, 4);
    const b5 = get(b, 5);
    const b6 = get(b, 6);
    const b7 = get(b, 7);

    set(out, 0, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 0));
    set(out, 1, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 1));
    set(out, 2, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 2));
    set(out, 3, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 3));
    set(out, 4, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 4));
    set(out, 5, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 5));
    set(out, 6, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 6));
    set(out, 7, rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 7));

    return out;
}
