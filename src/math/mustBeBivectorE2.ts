import { BivectorE2 } from './BivectorE2';

/**
 * @hidden
 * @param name 
 * @param B 
 * @returns 
 */
export function mustBeBivectorE2(name: string, B: BivectorE2): BivectorE2 {
    if (isNaN(B.xy)) {
        throw new Error(`${name}, (${B.xy}), must be a BivectorE2.`);
    }
    return B;
}
