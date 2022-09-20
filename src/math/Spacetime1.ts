import { readOnly } from "../i18n/readOnly";
import { AbstractMeasure } from "./AbstractMeasure";
import { gauss } from "./gauss";
import { GeometricNumber } from "./GeometricNumber";
import { GeometricOperators } from "./GeometricOperators";
import { GradeMasked } from "./GradeMasked";
import { QQ } from "./QQ";
import { stringFromCoordinates } from "./stringFromCoordinates";
import { Unit } from "./Unit";

/**
 * @hidden
 */
const COORD_0_A = 0;
/**
 * @hidden
 */
const COORD_1_T = 1;
/**
 * @hidden
 */
const COORD_2_X = 2;
/**
 * @hidden
 */
const COORD_3_TX = 3;

/**
 * Coordinates corresponding to basis labels.
 * @hidden
 */
const coordinates = function (m: GeometricM11): [a: number, t: number, x: number, tx: number] {
    const coords: [number, number, number, number] = [0, 0, 0, 0];
    coords[COORD_0_A] = m.a;
    coords[COORD_1_T] = m.t;
    coords[COORD_2_X] = m.x;
    coords[COORD_3_TX] = m.b;
    return coords;
};

interface Vector {
    t: number;
    x: number;
    uom?: Unit;
}

interface Spinor {
    a: number;
    b: number;
    uom?: Unit;
}

interface GeometricM11 extends Vector, Spinor {
    uom?: Unit;
}

/**
 * @hidden
 */
const BASIS_LABELS: ['1', 'e0', 'e1', 'I'] = ["1", "e0", "e1", "I"];

/**
 * @hidden
 */
const BASIS_LABELS_LaTeX: ['1', 'e_{0}', 'e_{1}', 'I'] = ["1", "e_{0}", "e_{1}", "I"];

/**
 *
 */
export class Spacetime1 extends AbstractMeasure implements GradeMasked, GeometricM11, GeometricNumber<Spacetime1, Spacetime1, Spinor, Vector, number>, GeometricOperators<Spacetime1> {
    /**
     * The scalar value 0.
     * 
     * This scalar is permanently locked (immutable).
     */
    static readonly zero = Spacetime1.scalar(0).permlock();
    /**
     * The scalar value 1.
     * 
     * This scalar is permanently locked (immutable).
     */
    static readonly one = Spacetime1.scalar(1).permlock();
    /**
     * The vector in the Time direction.
     * 
     * e0 * e0 = 1
     * 
     * This vector is permanently locked (immutable).
     */
    static readonly e0 = Spacetime1.vector(1, 0).permlock();
    /**
     * The vector in the Space direction.
     * 
     * e1 * e1 = -1
     * 
     * This vector is permanently locked (immutable).
     */
    static readonly e1 = Spacetime1.vector(0, 1).permlock();
    static readonly I = new Spacetime1(0, 0, 0, 1).permlock();
    static readonly kilogram = Spacetime1.scalar(1, Unit.KILOGRAM).permlock();
    static readonly meter = Spacetime1.scalar(1, Unit.METER).permlock();
    static readonly second = Spacetime1.scalar(1, Unit.SECOND).permlock();
    static readonly ampere = Spacetime1.scalar(1, Unit.AMPERE).permlock();
    static readonly kelvin = Spacetime1.scalar(1, Unit.KELVIN).permlock();
    static readonly mole = Spacetime1.scalar(1, Unit.MOLE).permlock();
    static readonly candela = Spacetime1.scalar(1, Unit.CANDELA).permlock();
    static readonly coulomb = Spacetime1.scalar(1, Unit.COULOMB).permlock();
    static readonly newton = Spacetime1.scalar(1, Unit.NEWTON).permlock();
    static readonly joule = Spacetime1.scalar(1, Unit.JOULE).permlock();
    /**
     * Creates a grade 0 (scalar) multivector with value `a * uom`.
     * The scalar returned is in the unlocked (mutable) state.
     * @param a The scaling factor for the unit of measure.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static scalar(a: number, uom?: Unit): Spacetime1 {
        return new Spacetime1(a, 0, 0, 0, uom);
    }

    /**
     * Creates a grade 1 (vector) multivector with a value (t * e0 + x * e1) * uom.
     * The value returned is in the unlocked (mutable) state.
     * @param t the coordinate corresponding to the e0 basis vector.
     * @param x  the coordinate corresponding to the e1 basis vector.
     * @param uom  the optional unit of measure. Equivalent to 1 if omitted.
     */
    static vector(t: number, x: number, uom?: Unit): Spacetime1 {
        return new Spacetime1(0, t, x, 0, uom);
    }

    /**
     * a
     */
    private $M00: number;
    /**
     * t
     */
    private $M01: number;
    /**
     * x
     */
    private $M10: number;
    /**
     * tx
     */
    private $M11: number;

    /**
     *
     * @param a the coordinate of this multivector corresponding to the one scalar. Default is zero.
     * @param t the coordinate of this multivector corresponding to the e0 basis vector. Default is zero..
     * @param x the coordinate of this multivector corresponding to the e1 basis vector. Default is zero.
     * @param b the coordinate of this multivector corresponding to the I pseudoscalar. Default is zero.
     * @param uom the optional unit of measure for this multivector.
     */
    constructor(a = 0, t = 0, x = 0, b = 0, uom?: Unit) {
        super(uom);
        this.$M00 = a;
        this.$M01 = t;
        this.$M10 = x;
        this.$M11 = b;
    }
    get a(): number {
        return this.$M00;
    }
    set a(a: number) {
        if (this.isMutable()) {
            this.$M00 = a;
        }
        else {
            throw new Error(readOnly('a').message);
        }
    }
    get t(): number {
        return this.$M01;
    }
    set t(t: number) {
        if (this.isMutable()) {
            this.$M01 = t;
        }
        else {
            throw new Error(readOnly('t').message);
        }
    }
    get x(): number {
        return this.$M10;
    }
    set x(x: number) {
        if (this.isMutable()) {
            this.$M10 = x;
        }
        else {
            throw new Error(readOnly('x').message);
        }
    }
    get b(): number {
        return this.$M11;
    }
    set b(b: number) {
        if (this.isMutable()) {
            this.$M11 = b;
        }
        else {
            throw new Error(readOnly('b').message);
        }
    }
    get grades(): number {
        let mask = 0x0;
        if (this.$M00 !== 0) {
            mask += 0x1;
        }
        if (this.t !== 0 || this.x !== 0) {
            mask += 0x2;
        }
        if (this.b !== 0) {
            mask += 0x4;
        }
        return mask;
    }
    add(rhs: Spacetime1, α = 1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().add(rhs, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.a = rhs.a * α;
                this.t = rhs.t * α;
                this.x = rhs.x * α;
                this.b = rhs.b * α;
                this.uom = rhs.uom;
                return this;
            }
            else if (rhs.isZero() || α === 0) {
                return this;
            }
            else {
                this.a += rhs.a * α;
                this.t += rhs.t * α;
                this.x += rhs.x * α;
                this.b += rhs.b * α;
                this.uom = Unit.compatible(this.uom, rhs.uom);
                return this;
            }
        }
    }
    /**
     * @hidden
     */
    addScalar(a: number, uom?: Unit, α = 1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().addScalar(a, uom, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.a = a * α;
                this.uom = uom;
                return this;
            }
            else if (a === 0 || α === 0) {
                return this;
            }
            else {
                this.a += a * α;
                this.uom = Unit.compatible(this.uom, uom);
                return this;
            }
        }
    }
    /**
     * @hidden
     * @param v 
     * @param α 
     * @returns 
     */
    addVector(v: Vector, α = 1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().addVector(v, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (v.t === 0 && v.x === 0) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.t += v.t * α;
            this.x += v.x * α;
            return this;
        }
    }
    clone(): Spacetime1 {
        return new Spacetime1(this.a, this.t, this.x, this.b, this.uom);
    }
    conj(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().conj().permlock();
        }
        else {
            // this.$M00 = +this.$M00;
            this.$M01 = -this.$M01;
            this.$M10 = -this.$M10;
            this.$M11 = -this.$M11;
            return this;
        }
    }
    div(rhs: Spacetime1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().div(rhs).permlock();
        }
        else {
            return this.mul(rhs.clone().inv().permlock());
        }
    }
    /**
     * @hidden
     */
    divByNumber(a: number): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().divByNumber(a).permlock();
        }
        else {
            this.$M00 /= a;
            this.$M01 /= a;
            this.$M10 /= a;
            this.$M11 /= a;
            return this;
        }
    }
    divByScalar(a: number, uom?: Unit): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().divByScalar(a, uom).permlock();
        }
        else {
            this.$M00 /= a;
            this.$M01 /= a;
            this.$M10 /= a;
            this.$M11 /= a;
            this.uom = Unit.div(this.uom, uom);
            return this;
        }
    }
    divByVector(v: Vector): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().divByVector(v).permlock();
        }
        else {
            const t = v.t;
            const x = v.x;
            return this.mulByVector(v).divByScalar(t * t - x * x, Unit.pow(v.uom, QQ.valueOf(2, 1)));
        }
    }
    dual(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().dual().permlock();
        }
        else {
            const M000 = this.$M00;
            const M001 = this.$M01;
            const M010 = this.$M10;
            const M011 = this.$M11;

            this.$M00 = M011;
            this.$M01 = M010;
            this.$M10 = M001;
            this.$M11 = M000;
            return this;
        }
    }
    equals(other: unknown): boolean {
        if (other === this) {
            return true;
        }
        else if (other instanceof Spacetime1) {
            return Unit.isCompatible(this.uom, other.uom) &&
                this.a === other.a &&
                this.t === other.t &&
                this.x === other.x &&
                this.b === other.b;
        }
        else {
            return false;
        }
    }
    ext(rhs: Spacetime1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().ext(rhs).permlock();
        }
        else {
            const L000 = this.$M00;
            const L001 = this.$M01;
            const L010 = this.$M10;
            const L011 = this.$M11;

            const R000 = rhs.$M00;
            const R001 = rhs.$M01;
            const R010 = rhs.$M10;
            const R011 = rhs.$M11;

            this.$M00 = L000 * R000;
            this.$M01 = L000 * R001 + L001 * R000;
            this.$M10 = L000 * R010 + L010 * R000;
            this.$M11 = L000 * R011 + L001 * R010 - L010 * R001 + L011 * R000;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    grade(n: number): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().grade(n).permlock();
        }
        else {
            // There is no change to the unit of measure.
            switch (n) {
                case 0: {
                    this.t = 0;
                    this.x = 0;
                    this.b = 0;
                    break;
                }
                case 1: {
                    this.a = 0;
                    this.b = 0;
                    break;
                }
                case 2: {
                    this.a = 0;
                    this.t = 0;
                    this.x = 0;
                    break;
                }
                default: {
                    this.a = 0;
                    this.t = 0;
                    this.x = 0;
                    this.b = 0;
                }
            }
            return this;
        }
    }
    inv(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().inv().permlock();
        }
        else {
            const x0 = this.$M00;
            const x1 = this.$M01;
            const x2 = this.$M10;
            const x3 = this.$M11;

            const A = [
                [+x0, +x1, -x2, +x3],
                [+x1, +x0, +x3, -x2],
                [+x2, +x3, +x0, -x1],
                [+x3, +x2, -x1, +x0],
            ];

            const b = [1, 0, 0, 0];

            const X = gauss(A, b);

            this.a = X[0];
            this.t = X[1];
            this.x = X[2];
            this.b = X[3];

            this.uom = Unit.inv(this.uom);

            return this;
        }
    }
    isBivector(): boolean {
        return this.a === 0 && this.t === 0 && this.x === 0;
    }
    isOne(): boolean {
        return this.a === 1 && this.t === 0 && this.x === 0 && this.b === 0 && Unit.isOne(this.uom);
    }
    isScalar(): boolean {
        return this.t === 0 && this.x === 0 && this.b === 0;
    }
    isSpinor(): boolean {
        return this.t === 0 && this.x === 0;
    }
    isVector(): boolean {
        return this.a === 0 && this.b === 0;
    }
    isZero(): boolean {
        return this.a === 0 && this.t === 0 && this.x === 0 && this.b === 0;
    }
    lco(rhs: Spacetime1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().lco(rhs).permlock();
        }
        else {
            const L000 = this.$M00;
            const L001 = this.$M01;
            const L010 = this.$M10;
            const L011 = this.$M11;

            const R000 = rhs.$M00;
            const R001 = rhs.$M01;
            const R010 = rhs.$M10;
            const R011 = rhs.$M11;

            this.$M00 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011;
            this.$M01 = L000 * R001 + L010 * R011;
            this.$M10 = L000 * R010 + L001 * R011;
            this.$M11 = L000 * R011;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    mul(rhs: Spacetime1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().mul(rhs).permlock();
        }
        else {
            const L000 = this.$M00;
            const L001 = this.$M01;
            const L010 = this.$M10;
            const L011 = this.$M11;

            const R000 = rhs.$M00;
            const R001 = rhs.$M01;
            const R010 = rhs.$M10;
            const R011 = rhs.$M11;

            this.$M00 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011;
            this.$M01 = L000 * R001 + L001 * R000 + L010 * R011 - L011 * R010;
            this.$M10 = L000 * R010 + L010 * R000 + L001 * R011 - L011 * R001;
            this.$M11 = L000 * R011 + L001 * R010 - L010 * R001 + L011 * R000;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    /**
     * @hidden
     */
    mulByNumber(a: number): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().mulByNumber(a).permlock();
        }
        else {
            this.$M00 *= a;
            this.$M01 *= a;
            this.$M10 *= a;
            this.$M11 *= a;
            return this;
        }
    }
    mulByScalar(a: number, uom: Unit): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().mulByScalar(a, uom).permlock();
        }
        else {
            this.$M00 *= a;
            this.$M01 *= a;
            this.$M10 *= a;
            this.$M11 *= a;
            this.uom = Unit.mul(this.uom, uom);
            return this;
        }
    }
    mulByVector(v: Vector): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().mulByVector(v).permlock();
        }
        else {
            const L000 = this.$M00;
            const L001 = this.$M01;
            const L010 = this.$M10;
            const L011 = this.$M11;

            const R001 = v.t;
            const R010 = v.x;

            this.$M00 = L001 * R001 - L010 * R010;
            this.$M01 = L000 * R001 - L011 * R010;
            this.$M10 = L000 * R010 - L011 * R001;
            this.$M11 = L001 * R010 - L010 * R001;
            this.uom = Unit.mul(this.uom, v.uom);
            return this;
        }
    }
    neg(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().neg().permlock();
        }
        else {
            this.a = -this.a;
            this.t = -this.t;
            this.x = -this.x;
            this.b = -this.b;
            return this;
        }
    }

    /**
     * @hidden
     */
    quaditude(): Spacetime1 {
        return this.squaredNorm();
    }

    /**
     * @hidden
     */
    quaditudeNoUnits(): number {
        const a = this.$M00;
        const t = this.$M01;
        const x = this.$M10;
        const tx = this.$M11;
        return a * a + t * t - x * x - tx * tx;
    }
    rco(rhs: Spacetime1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().rco(rhs).permlock();
        }
        else {
            const L000 = this.$M00;
            const L001 = this.$M01;
            const L010 = this.$M10;
            const L011 = this.$M11;

            const R000 = rhs.$M00;
            const R001 = rhs.$M01;
            const R010 = rhs.$M10;
            const R011 = rhs.$M11;

            this.$M00 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011;
            this.$M01 = L001 * R000 - L011 * R010;
            this.$M10 = L010 * R000 - L011 * R001;
            this.$M11 = L011 * R000;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    reflect(n: Vector): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().reflect(n).permlock();
        }
        else {
            const t = n.t;
            const t2 = t * t;
            const x = n.x;
            const x2 = x * x;
            this.$M00 = this.$M00 * (x2 - t2);
            this.$M01 = -this.$M01 * (t2 + x2);
            this.$M10 = this.$M10 * (t2 + x2);
            this.$M11 = -this.$M11 * (t2 + x2);
            return this;
        }
    }
    rev(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().rev().permlock();
        }
        else {
            // this.$M00 = +this.$M00;
            // this.$M01 = +this.$M01;
            // this.$M10 = +this.$M10;
            this.$M11 = -this.$M11;
            return this;
        }
    }
    rotate(spinor: Spinor): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().rotate(spinor).permlock();
        }
        else {
            // const Sa = spinor.a;
            // const Sb = spinor.b;
            throw new Error("Method not implemented.");
        }
    }

    /**
     * @hidden
     */
    scale(α: number): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().scale(α).permlock();
        }
        else {
            this.$M00 = this.$M00 * α;
            this.$M01 = this.$M01 * α;
            this.$M10 = this.$M10 * α;
            this.$M11 = this.$M11 * α;
            return this;
        }
    }
    scp(rhs: Spacetime1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().scp(rhs).permlock();
        }
        else {
            const L000 = this.$M00;
            const L001 = this.$M01;
            const L010 = this.$M10;
            const L011 = this.$M11;

            const R000 = rhs.$M00;
            const R001 = rhs.$M01;
            const R010 = rhs.$M10;
            const R011 = rhs.$M11;

            this.$M00 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011;
            this.$M01 = 0;
            this.$M10 = 0;
            this.$M11 = 0;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    sqrt(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().sqrt().permlock();
        }
        else {
            if (this.isScalar()) {
                this.$M00 = Math.sqrt(this.$M00);
                this.$M01 = 0;
                this.$M10 = 0;
                this.$M11 = 0;
                this.uom = Unit.sqrt(this.uom);
                return this;
            }
            else {
                throw new Error(`Target of sqrt() method must be a scalar, but was ${this}`);
            }
        }
    }
    squaredNorm(): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().squaredNorm().permlock();
        }
        else {
            const a = this.$M00;
            const t = this.$M01;
            const x = this.$M10;
            const tx = this.$M11;
            this.$M00 = a * a + t * t - x * x - tx * tx;
            this.$M01 = 0;
            this.$M10 = 0;
            this.$M11 = 0;
            this.uom = Unit.mul(this.uom, this.uom);
            return this;
        }
    }
    sub(rhs: Spacetime1, α = 1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().sub(rhs, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.a = -rhs.a * α;
                this.t = -rhs.t * α;
                this.x = -rhs.x * α;
                this.b = -rhs.b * α;
                this.uom = rhs.uom;
                return this;
            }
            else if (rhs.isZero() || α === 0) {
                return this;
            }
            else {
                this.a -= rhs.a * α;
                this.t -= rhs.t * α;
                this.x -= rhs.x * α;
                this.b -= rhs.b * α;
                this.uom = Unit.compatible(this.uom, rhs.uom);
                return this;
            }
        }
    }
    /**
     * @hidden
     */
    subScalar(a: number, uom?: Unit, α = 1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().subScalar(a, uom, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.a = - a * α;
                this.uom = uom;
                return this;
            }
            else if (a === 0 || α === 0) {
                return this;
            }
            else {
                this.a -= a * α;
                this.uom = Unit.compatible(this.uom, uom);
                return this;
            }
        }
    }
    /**
     * @hidden
     * @param v 
     * @param α 
     * @returns 
     */
    subVector(v: Vector, α = 1): Spacetime1 {
        if (this.isLocked()) {
            return this.clone().subVector(v, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (v.t === 0 && v.x === 0) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.t -= v.t * α;
            this.x -= v.x * α;
            return this;
        }
    }

    toExponential(fractionDigits?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toExponential(fractionDigits);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }
    toFixed(fractionDigits?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toFixed(fractionDigits);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }
    toLaTeX(radix?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toString(radix);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS_LaTeX, this.uom);
    }
    toPrecision(precision?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toPrecision(precision);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }
    toString(radix?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toString(radix);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }
    /**
     * @hidden
     */
    __div__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().div(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().divByNumber(rhs).permlock();
        }
        else if (rhs instanceof Unit) {
            return this.clone().divByScalar(1, rhs).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rdiv__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().div(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime1.scalar(lhs).div(this).permlock();
        }
        else if (lhs instanceof Unit) {
            return Spacetime1.scalar(1, lhs).div(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __vbar__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().scp(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().scp(Spacetime1.scalar(rhs)).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rvbar__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().scp(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime1.scalar(lhs).scp(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __wedge__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().ext(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            // The outer product with a scalar is scalar multiplication.
            return this.clone().mulByNumber(rhs).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rwedge__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().ext(this).permlock();
        }
        else if (typeof lhs === 'number') {
            // The outer product with a scalar is scalar multiplication, and commutes.
            return this.clone().mulByNumber(lhs).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __lshift__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().lco(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().lco(Spacetime1.scalar(rhs)).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rlshift__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().lco(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime1.scalar(lhs).lco(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rshift__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().rco(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().rco(Spacetime1.scalar(rhs)).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rrshift__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().rco(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime1.scalar(lhs).rco(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __bang__(): Spacetime1 {
        return this.clone().inv().permlock();
    }
    /**
     * @hidden
     */
    __eq__(rhs: number | Spacetime1 | Unit): boolean {
        if (rhs instanceof Spacetime1) {
            return this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return this.equals(Spacetime1.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return this.equals(Spacetime1.scalar(1, rhs));
        }
        else {
            return false;
        }
    }
    /**
     * @hidden
     */
    __ne__(rhs: number | Spacetime1 | Unit): boolean {
        if (rhs instanceof Spacetime1) {
            return !this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return !this.equals(Spacetime1.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return !this.equals(Spacetime1.scalar(1, rhs));
        }
        else {
            return true;
        }
    }
    /**
     * @hidden
     */
    __tilde__(): Spacetime1 {
        return this.clone().rev().permlock();
    }
    /**
     * @hidden
     */
    __add__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().add(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().addScalar(rhs).permlock();
        }
        else if (rhs instanceof Unit) {
            return this.clone().addScalar(1, rhs, 1).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __radd__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().add(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime1.scalar(lhs).add(this).permlock();
        }
        else if (lhs instanceof Unit) {
            return Spacetime1.scalar(1, lhs).add(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __sub__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().sub(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().subScalar(rhs).permlock();
        }
        else if (rhs instanceof Unit) {
            return this.clone().subScalar(1, rhs).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rsub__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().sub(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime1.scalar(lhs).sub(this).permlock();
        }
        else if (lhs instanceof Unit) {
            return Spacetime1.scalar(1, lhs).sub(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __pos__(): Spacetime1 {
        return this.clone().permlock();
    }
    /**
     * @hidden
     */
    __neg__(): Spacetime1 {
        return this.clone().neg().permlock();
    }
    /**
     * @hidden
     */
    __mul__(rhs: number | Spacetime1 | Unit): Spacetime1 {
        if (rhs instanceof Spacetime1) {
            return this.clone().mul(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().mulByNumber(rhs).permlock();
        }
        else if (rhs instanceof Unit) {
            return this.clone().mulByScalar(1, rhs).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rmul__(lhs: number | Spacetime1 | Unit): Spacetime1 {
        if (lhs instanceof Spacetime1) {
            return lhs.clone().mul(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return this.clone().mulByNumber(lhs).permlock();
        }
        else if (lhs instanceof Unit) {
            return this.clone().mulByScalar(1, lhs).permlock();
        }
        else {
            return void 0;
        }
    }
}
