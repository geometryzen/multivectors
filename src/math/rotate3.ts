import { SpinorE3 } from './SpinorE3';

/**
 * @hidden
 * @param x 
 * @param y 
 * @param z 
 * @param spinor 
 * @returns 
 */
export function rotateX(x: number, y: number, z: number, spinor: SpinorE3): number {
    const a = spinor.xy;
    const b = spinor.yz;
    const c = spinor.zx;
    const w = spinor.a;

    const ix = w * x - c * z + a * y;
    const iy = w * y - a * x + b * z;
    const iz = w * z - b * y + c * x;
    const iw = b * x + c * y + a * z;

    return ix * w + iw * b + iy * a - iz * c;
}

/**
 * @hidden
 * @param x 
 * @param y 
 * @param z 
 * @param spinor 
 * @returns 
 */
export function rotateY(x: number, y: number, z: number, spinor: SpinorE3): number {
    const a = spinor.xy;
    const b = spinor.yz;
    const c = spinor.zx;
    const w = spinor.a;

    const ix = w * x - c * z + a * y;
    const iy = w * y - a * x + b * z;
    const iz = w * z - b * y + c * x;
    const iw = b * x + c * y + a * z;

    return iy * w + iw * c + iz * b - ix * a;
}

/**
 * @hidden
 * @param x 
 * @param y 
 * @param z 
 * @param spinor 
 * @returns 
 */
export function rotateZ(x: number, y: number, z: number, spinor: SpinorE3): number {
    const a = spinor.xy;
    const b = spinor.yz;
    const c = spinor.zx;
    const w = spinor.a;

    const ix = w * x - c * z + a * y;
    const iy = w * y - a * x + b * z;
    const iz = w * z - b * y + c * x;
    const iw = b * x + c * y + a * z;

    return iz * w + iw * a + ix * c - iy * b;
}
