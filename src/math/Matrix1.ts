import { AbstractMatrix } from "./AbstractMatrix";
import { Unit } from "./Unit";

export class Matrix1 extends AbstractMatrix<Matrix1> {

    public static one(): Matrix1 {
        return new Matrix1(new Float32Array([1]));
    }

    public static zero(): Matrix1 {
        return new Matrix1(new Float32Array([0]));
    }

    /**
     * 
     * @param elements 
     * @param uom The optional unit of measure.
     */
    constructor(elements: Float32Array, uom?: Unit) {
        super(elements, 1, uom);
    }
}
