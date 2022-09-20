import { AbstractMatrix } from "./AbstractMatrix";
import { Unit } from "./Unit";

export class Matrix0 extends AbstractMatrix<Matrix0> {
    constructor(elements: Float32Array, uom?: Unit) {
        super(elements, 0, uom);
    }
}
