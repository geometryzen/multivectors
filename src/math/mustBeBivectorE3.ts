import { BivectorE3 } from './BivectorE3';

/**
 * @hidden
 */
export default function mustBeBivectorE3(name: string, B: BivectorE3): BivectorE3 {
    if (isNaN(B.yz) || isNaN(B.zx) || isNaN(B.xy)) {
        throw new Error(`${name}, (${B.yz}, ${B.zx}, ${B.xy}), must be a BivectorE3.`);
    }
    return B;
}
