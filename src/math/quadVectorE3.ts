/**
 * @hidden
 * @returns x^2 + y^2 + z^2
 */
export function quadVectorE3(vector: Readonly<{ x: number; y: number; z: number }>): number {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    return x * x + y * y + z * z;
}
