import { mustBeDefined } from '../checks/mustBeDefined';
import mustBeInteger from '../checks/mustBeInteger';
import { AbstractMeasure } from './AbstractMeasure';
import { MatrixLike } from './MatrixLike';
import { Unit } from './Unit';

/**
 * @hidden
 * @param elements 
 * @param length 
 */
function checkElementsLength(elements: Float32Array, length: number): void {
    if (elements.length !== length) {
        throw new Error(`elements must have length ${length}`);
    }
}

/**
 * Base class for matrices with the expectation that they will be used with WebGL.
 * The underlying data storage is a <code>Float32Array</code>.
 * @hidden
 */
export class AbstractMatrix<T extends { elements: Float32Array }> extends AbstractMeasure implements MatrixLike {

    private _elements: Float32Array;
    private _length: number;
    private _dimensions: number;
    public modified: boolean;

    /**
     * @param elements
     * @param dimensions
     */
    constructor(elements: Float32Array, dimensions: number, uom: Unit) {
        super(uom);
        this._elements = mustBeDefined('elements', elements);
        this._dimensions = mustBeInteger('dimensions', dimensions);
        this._length = dimensions * dimensions;
        checkElementsLength(elements, this._length);
        this.modified = false;
    }

    get dimensions(): number {
        return this._dimensions;
    }

    get elements(): Float32Array {
        return this._elements;
    }
    set elements(elements: Float32Array) {
        checkElementsLength(elements, this._length);
        this._elements = elements;
    }

    copy(source: MatrixLike): T {
        const N = this.dimensions;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                const value = source.getElement(i, j);
                this.setElement(i, j, value);
            }
        }
        this.uom = source.uom;
        return <T><unknown>this;
    }

    /**
     * Returns the element at the specified (zero-based) row and column.
     * @param row The zero-based row.
     * @param column The zero-based column.
     */
    getElement(row: number, column: number): number {
        return this.elements[row + column * this._dimensions];
    }

    /**
     * Determines whether this matrix is the identity matrix.
     */
    isOne(): boolean {
        for (let i = 0; i < this._dimensions; i++) {
            for (let j = 0; j < this._dimensions; j++) {
                const value = this.getElement(i, j);
                if (i === j) {
                    if (value !== 1) {
                        return false;
                    }
                }
                else {
                    if (value !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * @param row The zero-based row.
     * @param column The zero-based column.
     * @param value The value of the element.
     */
    setElement(row: number, column: number, value: number): void {
        this.elements[row + column * this._dimensions] = value;
    }
}
