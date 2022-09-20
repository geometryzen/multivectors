import { Scalar } from './Scalar';
import { Unit } from './Unit';

/**
 * @hidden
 */
export class Scalar3 implements Scalar {
    private readonly a_: number;
    private readonly uom_: Unit;
    constructor(a: number, uom: Unit) {
        this.a_ = a;
        this.uom_ = uom;
    }
    get a(): number {
        return this.a_;
    }
    get uom() {
        return this.uom_;
    }
    mulByNumber(alpha: number): Scalar3 {
        return new Scalar3(alpha * this.a, this.uom);
    }
}

export default Scalar3;
