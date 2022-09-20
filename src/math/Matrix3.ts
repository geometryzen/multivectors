import { AbstractMatrix } from './AbstractMatrix';
import { inv3x3 } from './inv3x3';
import { mul3x3 } from './mul3x3';
import { Unit } from './Unit';

/**
 * 
 */
export class Matrix3 extends AbstractMatrix<Matrix3> {
    /**
     * @param elements The matrix elements in column-major order. i.e. [m00, m10, m20, m01, m11, m21,,m02, m12, m22]
     * @param uom The optional unit of measure.
     */
    constructor(elements: Float32Array/* = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])*/, uom?: Unit) {
        super(elements, 3, uom);
    }

    /**
     *
     */
    inv(): this {
        inv3x3(this.elements, this.elements);
        this.uom = Unit.div(Unit.ONE, this.uom);
        return this;
    }

    /**
     * @param rhs
     */
    mul(rhs: Matrix3): this {
        return this.mul2(this, rhs);
    }

    /**
     * @param lhs
     */
    rmul(lhs: Matrix3): this {
        mul3x3(lhs.elements, this.elements, this.elements);
        this.uom = Unit.mul(lhs.uom, this.uom);
        return this;
    }

    /**
     * @param a
     * @param b
     */
    mul2(a: Matrix3, b: Matrix3): this {
        mul3x3(a.elements, b.elements, this.elements);
        this.uom = Unit.mul(a.uom, b.uom);
        return this;
    }

    /**
     * Sets this matrix to be equivalent to the spinor.
     *
     * this ⟼ rotation(spinor)
     *
     * @param attitude  The spinor from which the rotation will be computed.
     */
    /*
    rotation(spinor: SpinorE3): this {
        // The correspondence between quaternions and spinors is
        // i <=> -e2^e3, j <=> -e3^e1, k <=> -e1^e2.
        const x: number = -spinor.yz;
        const y: number = -spinor.zx;
        const z: number = -spinor.xy;
        const α: number = spinor.a;

        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = α * x2;
        const wy = α * y2;
        const wz = α * z2;

        this.set(
            1 - yy - zz, xy - wz, xz + wy,
            xy + wz, 1 - xx - zz, yz - wx,
            xz - wy, yz + wx, 1 - xx - yy
        );

        return this;
    }
    */

    /**
     * @param i the zero-based index of the row.
     */
    row(i: number): number[] {
        const te = this.elements;
        return [te[0 + i], te[3 + i], te[6 + i]];
    }

    /**
     * <p>
     * Sets all elements of this matrix to the supplied values (provided in <em>row-major</em> order).
     * </p>
     * <p>
     * An advantage of this method is that the function call resembles the matrix written out.
     * </p>
     * <p>
     * The parameters are named according to the 1-based row and column.
     * </p>
     *
     * @param n11
     * @param n12
     * @param n13
     * @param n21
     * @param n22
     * @param n23
     * @param n31
     * @param n32
     * @param n33
     */
    set(n11: number, n12: number, n13: number,
        n21: number, n22: number, n23: number,
        n31: number, n32: number, n33: number): this {

        const te = this.elements;

        te[0] = n11; te[3] = n12; te[6] = n13;
        te[1] = n21; te[4] = n22; te[7] = n23;
        te[2] = n31; te[5] = n32; te[8] = n33;

        return this;
    }

    /**
     * @param radix
     */
    toString(radix?: number): string {
        const text: string[] = [];
        for (let i = 0; i < this.dimensions; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            text.push(this.row(i).map(function (element: number, index: number) {
                return element.toString(radix);
            }).join(' '));
        }
        return text.join('\n');
    }

    /**
     *
     */
    transpose(): this {
        let tmp: number;
        const m = this.elements;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return this;
    }

    /**
     * Creates a new matrix with all elements zero except those along the main diagonal which have the value unity.
     */
    public static one(): Matrix3 {
        return new Matrix3(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
    }

    public static zero(): Matrix3 {
        return new Matrix3(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]));
    }
}
