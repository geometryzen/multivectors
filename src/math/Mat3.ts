import { Matrix3 } from './Matrix3';
import { MatrixLike } from './MatrixLike';
import { Unit } from './Unit';

/**
 * @hidden
 */
export class Mat3 implements MatrixLike {
    /**
     * 
     */
    private data = Matrix3.one();
    /**
     * 
     */
    public uom: Unit;
    /**
     * 
     */
    constructor(source: MatrixLike) {
        const n11 = source.getElement(0, 0);
        const n12 = source.getElement(0, 1);
        const n13 = source.getElement(0, 2);
        const n21 = source.getElement(1, 0);
        const n22 = source.getElement(1, 1);
        const n23 = source.getElement(1, 2);
        const n31 = source.getElement(2, 0);
        const n32 = source.getElement(2, 1);
        const n33 = source.getElement(2, 2);
        this.data.set(
            n11, n12, n13,
            n21, n22, n23,
            n31, n32, n33);
        this.uom = Unit.mustBeUnit('uom', source.uom);
    }

    /**
     * 
     */
    get dimensions(): number {
        return 3;
    }

    /**
     * Returns the element at the specified (zero-based) row and column.
     * @param row The zero-based row.
     * @param column The zero-based column.
     */
    getElement(row: number, column: number): number {
        return this.data.getElement(row, column);
    }

    /**
     * @param i the zero-based index of the row.
     */
    row(i: number): number[] {
        return this.data.row(i);
    }

    /**
     * @param radix
     */
    toString(radix?: number): string {
        return this.data.toString(radix);
    }
}
