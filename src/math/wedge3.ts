import { VectorE3 } from './VectorE3';

export function wedgeYZ(a: VectorE3, b: VectorE3): number {
    return a.y * b.z - a.z * b.y;
}

export function wedgeZX(a: VectorE3, b: VectorE3): number {
    return a.z * b.x - a.x * b.z;
}

export function wedgeXY(a: VectorE3, b: VectorE3): number {
    return a.x * b.y - a.y * b.x;
}
