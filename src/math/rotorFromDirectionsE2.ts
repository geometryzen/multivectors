import { dotVectorE2 as dot } from './dotVectorE2';
import { quadVectorE2 as quad } from './quadVectorE2';
import { SpinorE2 as Spinor } from './SpinorE2';
import { Unit } from './Unit';
import { VectorE2 as Vector } from './VectorE2';

/**
 * @hidden
 */
const sqrt = Math.sqrt;

/**
 * @hidden
 */
interface Output extends Spinor {
    versor(a: Readonly<Vector>, b: Readonly<Vector>): Output;
    addScalar(a: number, uom?: Unit, α?: number): Output;
    divByScalar(α: number, uom?: Unit): Output;
}

/**
 * @hidden
 * Sets this multivector to a rotor representing a rotation from a to b.
 * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
 * Returns undefined (void 0) if the vectors are anti-parallel.
 * 
 * @param a The 'from' vector. 
 * @param b The 'to' vector.
 * @param m The output multivector.
 * @returns 
 */
export function rotorFromDirectionsE2(a: Readonly<Vector>, b: Readonly<Vector>, m: Output): void {
    const quadA = quad(a);
    const absA = sqrt(quadA);
    const quadB = quad(b);
    const absB = sqrt(quadB);
    const BA = absB * absA;
    const dotBA = dot(b, a);
    const denom = sqrt(2 * (quadB * quadA + BA * dotBA));
    if (denom !== 0) {
        m.versor(b, a);
        m.addScalar(BA, void 0, 1);
        m.divByScalar(denom);
    }
    else {
        // The denominator is zero when |a||b| + a << b = 0.
        // If θ is the angle between a and b, then  cos(θ) = (a << b) /|a||b| = -1
        // Then a and b are anti-parallel.
        // The plane of the rotation is ambiguous.
        return void 0;
    }
}
