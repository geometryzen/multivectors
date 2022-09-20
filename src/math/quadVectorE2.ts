/**
 * @hidden
 * @param vector 
 * @returns |vector|^2 
 */
export function quadVectorE2(vector: Readonly<{ x: number; y: number }>): number {
    const x = vector.x;
    const y = vector.y;
    return x * x + y * y;
}
