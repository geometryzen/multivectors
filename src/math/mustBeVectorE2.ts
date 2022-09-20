import { VectorE2 } from './VectorE2';

/**
 * @hidden
 * @param name 
 * @param v 
 * @returns 
 */
export function mustBeVectorE2(name: string, v: VectorE2): VectorE2 {
    if (isNaN(v.x) || isNaN(v.y)) {
        throw new Error(`${name}, (${v.x}, ${v.y}), must be a VectorE2.`);
    }
    return v;
}
