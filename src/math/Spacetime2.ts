import { readOnly } from "../i18n/readOnly";
import { AbstractMeasure } from "./AbstractMeasure";
import { gauss } from "./gauss";
import { GeometricM21 } from "./GeometricM21";
import { GeometricNumber } from "./GeometricNumber";
import { GeometricOperators } from "./GeometricOperators";
import { GradeMasked } from "./GradeMasked";
import { QQ } from "./QQ";
import { SpinorM21 as Spinor } from './SpinorM21';
import { stringFromCoordinates } from "./stringFromCoordinates";
import { Unit } from "./Unit";
import { VectorM21 as Vector } from './VectorM21';

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
 * @hidden
 */
const COORD_4_Y = 4;
/**
 * @hidden
 */
const COORD_5_TY = 5;
/**
 * @hidden
 */
const COORD_6_XY = 6;
/**
 * @hidden
 */
const COORD_7_B = 7;

/**
 * Coordinates corresponding to basis labels.
 * @hidden
 */
const coordinates = function (m: GeometricM21): [a: number, t: number, x: number, tx: number, y: number, ty: number, xy: number, b: number] {
    const coords: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0];
    coords[COORD_0_A] = m.a;
    coords[COORD_1_T] = m.t;
    coords[COORD_2_X] = m.x;
    coords[COORD_3_TX] = m.tx;
    coords[COORD_4_Y] = m.y;
    coords[COORD_5_TY] = m.ty;
    coords[COORD_6_XY] = m.xy;
    coords[COORD_7_B] = m.b;
    return coords;
};

/**
 * @hidden
 */
const BASIS_LABELS: ['1', 'e0', 'e1', 'e01', 'e2', 'e02', 'e12', 'I'] = ["1", "e0", "e1", "e01", "e2", "e02", "e12", "I"];

/**
 * @hidden
 */
const BASIS_LABELS_LaTeX: ['1', 'e_{0}', 'e_{1}', 'e_{01}', 'e_{2}', 'e_{02}', 'e_{12}', 'I'] = ["1", "e_{0}", "e_{1}", "e_{01}", "e_{2}", "e_{02}", "e_{12}", "I"];

/**
 *
 */
export class Spacetime2 extends AbstractMeasure implements GradeMasked, GeometricM21, GeometricNumber<Spacetime2, Spacetime2, Spinor, Vector, number>, GeometricOperators<Spacetime2> {
    static readonly zero = Spacetime2.scalar(0).permlock();
    static readonly one = Spacetime2.scalar(1).permlock();
    static readonly e0 = Spacetime2.vector(1, 0, 0).permlock();
    static readonly e1 = Spacetime2.vector(0, 1, 0).permlock();
    static readonly e2 = Spacetime2.vector(0, 0, 1).permlock();
    static readonly I = new Spacetime2(0, 0, 0, 0, 0, 0, 0, 1).permlock();
    static readonly kilogram = Spacetime2.scalar(1, Unit.KILOGRAM).permlock();
    static readonly meter = Spacetime2.scalar(1, Unit.METER).permlock();
    static readonly second = Spacetime2.scalar(1, Unit.SECOND).permlock();
    static readonly ampere = Spacetime2.scalar(1, Unit.AMPERE).permlock();
    static readonly kelvin = Spacetime2.scalar(1, Unit.KELVIN).permlock();
    static readonly mole = Spacetime2.scalar(1, Unit.MOLE).permlock();
    static readonly candela = Spacetime2.scalar(1, Unit.CANDELA).permlock();
    /**
     * Creates a grade 0 (scalar) multivector with value `a * uom`.
     * The scalar returned is in the unlocked (mutable) state.
     * @param a The scaling factor for the unit of measure.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static scalar(a: number, uom?: Unit): Spacetime2 {
        return new Spacetime2(a, 0, 0, 0, 0, 0, 0, 0, uom);
    }
    static vector(t: number, x: number, y: number, uom?: Unit): Spacetime2 {
        return new Spacetime2(0, t, x, 0, y, 0, 0, 0, uom);
    }
    /**
     * a
     */
    private $M000: number;
    /**
     * t
     */
    private $M001: number;
    /**
     * x
     */
    private $M010: number;
    /**
     * tx
     */
    private $M011: number;
    /**
     * y
     */
    private $M100: number;
    /**
     * ty
     */
    private $M101: number;
    /**
     * xy
     */
    private $M110: number;
    /**
     * b
     */
    private $M111: number;
    constructor(a = 0, t = 0, x = 0, tx = 0, y = 0, ty = 0, xy = 0, b = 0, uom?: Unit) {
        super(uom);
        this.$M000 = a;
        this.$M001 = t;
        this.$M010 = x;
        this.$M011 = tx;
        this.$M100 = y;
        this.$M101 = ty;
        this.$M110 = xy;
        this.$M111 = b;
    }
    get a(): number {
        return this.$M000;
    }
    set a(a: number) {
        if (this.isMutable()) {
            this.$M000 = a;
        }
        else {
            throw new Error(readOnly('a').message);
        }
    }
    get t(): number {
        return this.$M001;
    }
    set t(t: number) {
        if (this.isMutable()) {
            this.$M001 = t;
        }
        else {
            throw new Error(readOnly('t').message);
        }
    }
    get x(): number {
        return this.$M010;
    }
    set x(x: number) {
        if (this.isMutable()) {
            this.$M010 = x;
        }
        else {
            throw new Error(readOnly('x').message);
        }
    }
    get tx(): number {
        return this.$M011;
    }
    set tx(tx: number) {
        if (this.isMutable()) {
            this.$M011 = tx;
        }
        else {
            throw new Error(readOnly('tx').message);
        }
    }
    get y(): number {
        return this.$M100;
    }
    set y(y: number) {
        if (this.isMutable()) {
            this.$M100 = y;
        }
        else {
            throw new Error(readOnly('y').message);
        }
    }
    get ty(): number {
        return this.$M101;
    }
    set ty(ty: number) {
        if (this.isMutable()) {
            this.$M101 = ty;
        }
        else {
            throw new Error(readOnly('ty').message);
        }
    }
    get xy(): number {
        return this.$M110;
    }
    set xy(xy: number) {
        if (this.isMutable()) {
            this.$M110 = xy;
        }
        else {
            throw new Error(readOnly('xy').message);
        }
    }
    get b(): number {
        return this.$M111;
    }
    set b(b: number) {
        if (this.isMutable()) {
            this.$M111 = b;
        }
        else {
            throw new Error(readOnly('b').message);
        }
    }
    get grades(): number {
        let mask = 0x0;
        if (this.$M000 !== 0) {
            mask += 0x1;
        }
        if (this.t !== 0 || this.x !== 0 || this.y !== 0) {
            mask += 0x2;
        }
        if (this.tx !== 0 || this.ty !== 0 || this.xy !== 0) {
            mask += 0x4;
        }
        if (this.b !== 0) {
            mask += 0x8;
        }
        return mask;
    }
    add(rhs: Spacetime2, α = 1): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().add(rhs, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.a = rhs.a * α;
                this.t = rhs.t * α;
                this.x = rhs.x * α;
                this.tx = rhs.tx * α;
                this.y = rhs.y * α;
                this.ty = rhs.ty * α;
                this.xy = rhs.xy * α;
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
                this.tx += rhs.tx * α;
                this.y += rhs.y * α;
                this.ty += rhs.ty * α;
                this.xy += rhs.xy * α;
                this.b += rhs.b * α;
                this.uom = Unit.compatible(this.uom, rhs.uom);
                return this;
            }
        }
    }
    addScalar(a: number, uom?: Unit, α = 1): Spacetime2 {
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
    addVector(v: Vector, α = 1): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().addVector(v, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (v.t === 0 && v.x === 0 && v.y === 0) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.t += v.t * α;
            this.x += v.x * α;
            this.y += v.y * α;
            return this;
        }
    }
    clone(): Spacetime2 {
        return new Spacetime2(this.a, this.t, this.x, this.tx, this.y, this.ty, this.xy, this.b, this.uom);
    }
    conj(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().conj().permlock();
        }
        else {
            // this.$M000 = +this.$M000;
            this.$M001 = -this.$M001;
            this.$M010 = -this.$M010;
            this.$M100 = -this.$M100;
            this.$M011 = -this.$M011;
            this.$M101 = -this.$M101;
            this.$M110 = -this.$M110;
            // this.$M111 = +this.$M111;
            return this;
        }
    }
    div(rhs: Spacetime2): Spacetime2 {
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
    divByNumber(a: number): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().divByNumber(a).permlock();
        }
        else {
            this.$M000 /= a;
            this.$M001 /= a;
            this.$M010 /= a;
            this.$M011 /= a;
            this.$M100 /= a;
            this.$M101 /= a;
            this.$M110 /= a;
            this.$M111 /= a;
            return this;
        }
    }
    divByScalar(a: number, uom?: Unit): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().divByScalar(a, uom).permlock();
        }
        else {
            this.$M000 /= a;
            this.$M001 /= a;
            this.$M010 /= a;
            this.$M011 /= a;
            this.$M100 /= a;
            this.$M101 /= a;
            this.$M110 /= a;
            this.$M111 /= a;
            this.uom = Unit.div(this.uom, uom);
            return this;
        }
    }
    divByVector(v: Vector): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().divByVector(v).permlock();
        }
        else {
            const t = v.t;
            const x = v.x;
            const y = v.y;
            return this.mulByVector(v).divByScalar(t * t - x * x - y * y, Unit.pow(v.uom, QQ.valueOf(2, 1)));
        }
    }
    dual(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().dual().permlock();
        }
        else {
            const M000 = this.$M000;
            const M001 = this.$M001;
            const M010 = this.$M010;
            const M011 = this.$M011;
            const M100 = this.$M100;
            const M101 = this.$M101;
            const M110 = this.$M110;
            const M111 = this.$M111;

            this.$M000 = M111;
            this.$M001 = M110;
            this.$M010 = M101;
            this.$M011 = M100;
            this.$M100 = -M011;
            this.$M101 = -M010;
            this.$M110 = -M001;
            this.$M111 = -M000;
            return this;
        }
    }
    equals(other: unknown): boolean {
        if (other === this) {
            return true;
        }
        else if (other instanceof Spacetime2) {
            return Unit.isCompatible(this.uom, other.uom) &&
                this.a === other.a &&
                this.t === other.t &&
                this.x === other.x &&
                this.tx === other.tx &&
                this.y === other.y &&
                this.ty === other.ty &&
                this.xy === other.xy &&
                this.b === other.b;
        }
        else {
            return false;
        }
    }
    ext(rhs: Spacetime2): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().ext(rhs).permlock();
        }
        else {
            const L000 = this.$M000;
            const L001 = this.$M001;
            const L010 = this.$M010;
            const L011 = this.$M011;
            const L100 = this.$M100;
            const L101 = this.$M101;
            const L110 = this.$M110;
            const L111 = this.$M111;

            const R000 = rhs.$M000;
            const R001 = rhs.$M001;
            const R010 = rhs.$M010;
            const R011 = rhs.$M011;
            const R100 = rhs.$M100;
            const R101 = rhs.$M101;
            const R110 = rhs.$M110;
            const R111 = rhs.$M111;

            this.$M000 = L000 * R000;
            this.$M001 = L000 * R001 + L001 * R000;
            this.$M010 = L000 * R010 + L010 * R000;
            this.$M011 = L000 * R011 + L001 * R010 - L010 * R001 + L011 * R000;
            this.$M100 = L000 * R100 + L100 * R000;
            this.$M101 = L000 * R101 + L001 * R100 - L100 * R001 + L101 * R000;
            this.$M110 = L000 * R110 + L010 * R100 - L100 * R010 + L110 * R000;
            this.$M111 = L000 * R111 + L001 * R110 - L010 * R101 + L011 * R100 + L100 * R011 - L101 * R010 + L110 * R001 + L111 * R000;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    grade(n: number): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().grade(n).permlock();
        }
        else {
            // There is no change to the unit of measure.
            switch (n) {
                case 0: {
                    this.t = 0;
                    this.x = 0;
                    this.y = 0;
                    this.tx = 0;
                    this.ty = 0;
                    this.xy = 0;
                    this.b = 0;
                    break;
                }
                case 1: {
                    this.a = 0;
                    this.tx = 0;
                    this.ty = 0;
                    this.xy = 0;
                    this.b = 0;
                    break;
                }
                case 2: {
                    this.a = 0;
                    this.t = 0;
                    this.x = 0;
                    this.y = 0;
                    this.b = 0;
                    break;
                }
                case 3: {
                    this.a = 0;
                    this.t = 0;
                    this.x = 0;
                    this.y = 0;
                    this.tx = 0;
                    this.ty = 0;
                    this.xy = 0;
                    break;
                }
                default: {
                    this.a = 0;
                    this.t = 0;
                    this.x = 0;
                    this.y = 0;
                    this.tx = 0;
                    this.ty = 0;
                    this.xy = 0;
                    this.b = 0;
                }
            }
            return this;
        }
    }
    inv(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().inv().permlock();
        }
        else {
            const x0 = this.$M000;
            const x1 = this.$M001;
            const x2 = this.$M010;
            const x3 = this.$M011;
            const x4 = this.$M100;
            const x5 = this.$M101;
            const x6 = this.$M110;
            const x7 = this.$M111;

            const A = [
                [+x0, +x1, -x2, +x3, -x4, +x5, -x6, -x7],
                [+x1, +x0, +x3, -x2, +x5, -x4, -x7, -x6],
                [+x2, +x3, +x0, -x1, +x6, -x7, -x4, -x5],
                [+x3, +x2, -x1, +x0, -x7, +x6, -x5, -x4],
                [+x4, +x5, -x6, +x7, +x0, -x1, +x2, +x3],
                [+x5, +x4, +x7, -x6, -x1, +x0, +x3, +x2],
                [+x6, +x7, +x4, -x5, -x2, +x3, +x0, +x1],
                [+x7, +x6, -x5, +x4, +x3, -x2, +x1, +x0]
            ];

            const b = [1, 0, 0, 0, 0, 0, 0, 0];

            const X = gauss(A, b);

            this.a = X[0];
            this.t = X[1];
            this.x = X[2];
            this.tx = X[3];
            this.y = X[4];
            this.ty = X[5];
            this.xy = X[6];
            this.b = X[7];

            this.uom = Unit.inv(this.uom);

            return this;
        }
    }
    isBivector(): boolean {
        return this.a === 0 && this.t === 0 && this.x === 0 && this.y === 0 && this.b === 0;
    }
    isOne(): boolean {
        return this.a === 1 && this.t === 0 && this.x === 0 && this.tx === 0 && this.y === 0 && this.ty === 0 && this.xy === 0 && this.b === 0 && Unit.isOne(this.uom);
    }
    isScalar(): boolean {
        return this.t === 0 && this.x === 0 && this.tx === 0 && this.y === 0 && this.ty === 0 && this.xy === 0 && this.b === 0;
    }
    isSpinor(): boolean {
        return this.t === 0 && this.x === 0 && this.y === 0 && this.b === 0;
    }
    isVector(): boolean {
        return this.a === 0 && this.tx === 0 && this.ty === 0 && this.xy === 0 && this.b === 0;
    }
    isZero(): boolean {
        return this.a === 0 && this.t === 0 && this.x === 0 && this.tx === 0 && this.y === 0 && this.ty === 0 && this.xy === 0 && this.b === 0;
    }
    lco(rhs: Spacetime2): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().lco(rhs).permlock();
        }
        else {
            const L000 = this.$M000;
            const L001 = this.$M001;
            const L010 = this.$M010;
            const L011 = this.$M011;
            const L100 = this.$M100;
            const L101 = this.$M101;
            const L110 = this.$M110;
            const L111 = this.$M111;

            const R000 = rhs.$M000;
            const R001 = rhs.$M001;
            const R010 = rhs.$M010;
            const R011 = rhs.$M011;
            const R100 = rhs.$M100;
            const R101 = rhs.$M101;
            const R110 = rhs.$M110;
            const R111 = rhs.$M111;

            this.$M000 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011 - L100 * R100 + L101 * R101 - L110 * R110 - L111 * R111;
            this.$M001 = L000 * R001 + L010 * R011 + L100 * R101 - L110 * R111;
            this.$M010 = L000 * R010 + L001 * R011 + L100 * R110 - L101 * R111;
            this.$M011 = L000 * R011 - L100 * R111;
            this.$M100 = L000 * R100 + L001 * R101 - L010 * R110 + L011 * R111;
            this.$M101 = L000 * R101 + L010 * R111;
            this.$M110 = L000 * R110 + L001 * R111;
            this.$M111 = L000 * R111;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    mul(rhs: Spacetime2): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().mul(rhs).permlock();
        }
        else {
            const L000 = this.$M000;
            const L001 = this.$M001;
            const L010 = this.$M010;
            const L011 = this.$M011;
            const L100 = this.$M100;
            const L101 = this.$M101;
            const L110 = this.$M110;
            const L111 = this.$M111;

            const R000 = rhs.$M000;
            const R001 = rhs.$M001;
            const R010 = rhs.$M010;
            const R011 = rhs.$M011;
            const R100 = rhs.$M100;
            const R101 = rhs.$M101;
            const R110 = rhs.$M110;
            const R111 = rhs.$M111;

            this.$M000 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011 - L100 * R100 + L101 * R101 - L110 * R110 - L111 * R111;
            this.$M001 = L000 * R001 + L001 * R000 + L010 * R011 - L011 * R010 + L100 * R101 - L101 * R100 - L110 * R111 - L111 * R110;
            this.$M010 = L000 * R010 + L010 * R000 + L001 * R011 - L011 * R001 + L100 * R110 - L101 * R111 - L110 * R100 - L111 * R101;
            this.$M011 = L000 * R011 + L001 * R010 - L010 * R001 + L011 * R000 - L100 * R111 + L101 * R110 - L110 * R101 - L111 * R100;
            this.$M100 = L000 * R100 + L001 * R101 - L010 * R110 + L011 * R111 + L100 * R000 - L101 * R001 + L110 * R010 + L111 * R011;
            this.$M101 = L000 * R101 + L001 * R100 + L010 * R111 - L011 * R110 - L100 * R001 + L101 * R000 + L110 * R011 + L111 * R010;
            this.$M110 = L000 * R110 + L001 * R111 + L010 * R100 - L011 * R101 - L100 * R010 + L101 * R011 + L110 * R000 + L111 * R001;
            this.$M111 = L000 * R111 + L001 * R110 - L010 * R101 + L011 * R100 + L100 * R011 - L101 * R010 + L110 * R001 + L111 * R000;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    /**
     * @hidden
     */
    mulByNumber(a: number): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().mulByNumber(a).permlock();
        }
        else {
            this.$M000 *= a;
            this.$M001 *= a;
            this.$M010 *= a;
            this.$M011 *= a;
            this.$M100 *= a;
            this.$M101 *= a;
            this.$M110 *= a;
            this.$M111 *= a;
            return this;
        }
    }
    mulByScalar(a: number, uom: Unit): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().mulByScalar(a, uom).permlock();
        }
        else {
            this.$M000 *= a;
            this.$M001 *= a;
            this.$M010 *= a;
            this.$M011 *= a;
            this.$M100 *= a;
            this.$M101 *= a;
            this.$M110 *= a;
            this.$M111 *= a;
            this.uom = Unit.mul(this.uom, uom);
            return this;
        }
    }
    mulByVector(v: Vector): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().mulByVector(v).permlock();
        }
        else {
            const L000 = this.$M000;
            const L001 = this.$M001;
            const L010 = this.$M010;
            const L011 = this.$M011;
            const L100 = this.$M100;
            const L101 = this.$M101;
            const L110 = this.$M110;
            const L111 = this.$M111;

            const R001 = v.t;
            const R010 = v.x;
            const R100 = v.y;

            this.$M000 = L001 * R001 - L010 * R010 - L100 * R100;
            this.$M001 = L000 * R001 - L011 * R010 - L101 * R100;
            this.$M010 = L000 * R010 - L011 * R001 - L110 * R100;
            this.$M011 = L001 * R010 - L010 * R001 - L111 * R100;
            this.$M100 = L000 * R100 - L101 * R001 + L110 * R010;
            this.$M101 = L001 * R100 - L100 * R001 + L111 * R010;
            this.$M110 = L010 * R100 - L100 * R010 + L111 * R001;
            this.$M111 = L011 * R100 - L101 * R010 + L110 * R001;
            this.uom = Unit.mul(this.uom, v.uom);
            return this;
        }
    }
    neg(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().neg().permlock();
        }
        else {
            this.a = -this.a;
            this.t = -this.t;
            this.x = -this.x;
            this.tx = -this.tx;
            this.y = -this.y;
            this.ty = -this.ty;
            this.xy = -this.xy;
            this.b = -this.b;
            return this;
        }
    }

    /**
     * @hidden
     */
    quaditude(): Spacetime2 {
        return this.squaredNorm();
    }

    /**
     * @hidden
     */
    quaditudeNoUnits(): number {
        const a = this.$M000;
        const t = this.$M001;
        const x = this.$M010;
        const y = this.$M100;
        const tx = this.$M011;
        const ty = this.$M101;
        const xy = this.$M110;
        const b = this.$M111;
        return a * a + t * t - x * x - y * y - tx * tx - ty * ty + xy * xy + b * b;
    }
    rco(rhs: Spacetime2): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().rco(rhs).permlock();
        }
        else {
            const L000 = this.$M000;
            const L001 = this.$M001;
            const L010 = this.$M010;
            const L011 = this.$M011;
            const L100 = this.$M100;
            const L101 = this.$M101;
            const L110 = this.$M110;
            const L111 = this.$M111;

            const R000 = rhs.$M000;
            const R001 = rhs.$M001;
            const R010 = rhs.$M010;
            const R011 = rhs.$M011;
            const R100 = rhs.$M100;
            const R101 = rhs.$M101;
            const R110 = rhs.$M110;
            const R111 = rhs.$M111;

            this.$M000 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011 - L100 * R100 + L101 * R101 - L110 * R110 - L111 * R111;
            this.$M001 = L001 * R000 - L011 * R010 - L101 * R100 - L111 * R110;
            this.$M010 = L010 * R000 - L011 * R001 - L110 * R100 - L111 * R101;
            this.$M011 = L011 * R000 - L111 * R100;
            this.$M100 = L100 * R000 - L101 * R001 + L110 * R010 + L111 * R011;
            this.$M101 = L101 * R000 + L111 * R010;
            this.$M110 = L110 * R000 + L111 * R001;
            this.$M111 = L111 * R000;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    reflect(n: Vector): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().reflect(n).permlock();
        }
        else {
            const t = n.t;
            const t2 = t * t;
            const x = n.x;
            const x2 = x * x;
            const y = n.y;
            const y2 = y * y;
            this.$M000 = this.$M000 * (x2 + y2 - t2);
            this.$M001 = -this.$M001 * (t2 + x2 + y2);
            this.$M010 = this.$M010 * (t2 + x2 - y2);
            this.$M100 = this.$M100 * (t2 - x2 + y2);
            this.$M011 = -this.$M011 * (t2 + x2 - y2);
            this.$M101 = -this.$M101 * (t2 - x2 + y2);
            this.$M110 = +this.$M110 * (t2 - x2 - y2);
            this.$M111 = this.$M111 * (x2 + y2 - t2);
            return this;
        }
    }
    rev(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().rev().permlock();
        }
        else {
            // this.$M000 = +this.$M000;
            // this.$M001 = +this.$M001;
            // this.$M010 = +this.$M010;
            // this.$M100 = +this.$M100;
            this.$M011 = -this.$M011;
            this.$M101 = -this.$M101;
            this.$M110 = -this.$M110;
            this.$M111 = -this.$M111;
            return this;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rotate(rotor: Spinor): Spacetime2 {
        throw new Error("Method not implemented.");
    }

    /**
     * @hidden
     */
    scale(α: number): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().scale(α).permlock();
        }
        else {
            this.$M000 = this.$M000 * α;
            this.$M001 = this.$M001 * α;
            this.$M010 = this.$M010 * α;
            this.$M011 = this.$M011 * α;
            this.$M100 = this.$M100 * α;
            this.$M101 = this.$M101 * α;
            this.$M110 = this.$M110 * α;
            this.$M111 = this.$M111 * α;
            return this;
        }
    }
    scp(rhs: Spacetime2): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().scp(rhs).permlock();
        }
        else {
            const L000 = this.$M000;
            const L001 = this.$M001;
            const L010 = this.$M010;
            const L011 = this.$M011;
            const L100 = this.$M100;
            const L101 = this.$M101;
            const L110 = this.$M110;
            const L111 = this.$M111;

            const R000 = rhs.$M000;
            const R001 = rhs.$M001;
            const R010 = rhs.$M010;
            const R011 = rhs.$M011;
            const R100 = rhs.$M100;
            const R101 = rhs.$M101;
            const R110 = rhs.$M110;
            const R111 = rhs.$M111;

            this.$M000 = L000 * R000 + L001 * R001 - L010 * R010 + L011 * R011 - L100 * R100 + L101 * R101 - L110 * R110 - L111 * R111;
            this.$M001 = 0;
            this.$M010 = 0;
            this.$M011 = 0;
            this.$M100 = 0;
            this.$M101 = 0;
            this.$M110 = 0;
            this.$M111 = 0;
            this.uom = Unit.mul(this.uom, rhs.uom);
            return this;
        }
    }
    sqrt(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().sqrt().permlock();
        }
        else {
            if (this.isScalar()) {
                this.$M000 = Math.sqrt(this.$M000);
                this.$M001 = 0;
                this.$M010 = 0;
                this.$M011 = 0;
                this.$M100 = 0;
                this.$M101 = 0;
                this.$M110 = 0;
                this.$M111 = 0;
                this.uom = Unit.sqrt(this.uom);
                return this;
            }
            else {
                throw new Error(`Target of sqrt() method must be a scalar, but was ${this}`);
            }
        }
    }
    squaredNorm(): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().squaredNorm().permlock();
        }
        else {
            const a = this.$M000;
            const t = this.$M001;
            const x = this.$M010;
            const y = this.$M100;
            const tx = this.$M011;
            const ty = this.$M101;
            const xy = this.$M110;
            const b = this.$M111;
            this.$M000 = a * a + t * t - x * x - y * y - tx * tx - ty * ty + xy * xy + b * b;
            this.$M001 = 0;
            this.$M010 = 0;
            this.$M011 = 0;
            this.$M100 = 0;
            this.$M101 = 0;
            this.$M110 = 0;
            this.$M111 = 0;
            this.uom = Unit.mul(this.uom, this.uom);
            return this;
        }
    }
    sub(rhs: Spacetime2, α = 1): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().sub(rhs, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.a = -rhs.a * α;
                this.t = -rhs.t * α;
                this.x = -rhs.x * α;
                this.tx = -rhs.tx * α;
                this.y = -rhs.y * α;
                this.ty = -rhs.ty * α;
                this.xy = -rhs.xy * α;
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
                this.tx -= rhs.tx * α;
                this.y -= rhs.y * α;
                this.ty -= rhs.ty * α;
                this.xy -= rhs.xy * α;
                this.b -= rhs.b * α;
                this.uom = Unit.compatible(this.uom, rhs.uom);
                return this;
            }
        }
    }
    subScalar(a: number, uom?: Unit, α = 1): Spacetime2 {
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
    subVector(v: Vector, α = 1): Spacetime2 {
        if (this.isLocked()) {
            return this.clone().subVector(v, α).permlock();
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (v.t === 0 && v.x === 0 && v.y === 0) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.t -= v.t * α;
            this.x -= v.x * α;
            this.y -= v.y * α;
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
    __div__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
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
    __rdiv__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
            return lhs.clone().div(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime2.scalar(lhs).div(this).permlock();
        }
        else if (lhs instanceof Unit) {
            return Spacetime2.scalar(1, lhs).div(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __vbar__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
            return this.clone().scp(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().scp(Spacetime2.scalar(rhs)).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rvbar__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
            return lhs.clone().scp(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime2.scalar(lhs).scp(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __wedge__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
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
    __rwedge__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
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
    __lshift__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
            return this.clone().lco(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().lco(Spacetime2.scalar(rhs)).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rlshift__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
            return lhs.clone().lco(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime2.scalar(lhs).lco(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rshift__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
            return this.clone().rco(rhs).permlock();
        }
        else if (typeof rhs === 'number') {
            return this.clone().rco(Spacetime2.scalar(rhs)).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rrshift__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
            return lhs.clone().rco(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime2.scalar(lhs).rco(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __bang__(): Spacetime2 {
        return this.clone().inv().permlock();
    }
    /**
     * @hidden
     */
    __eq__(rhs: number | Spacetime2 | Unit): boolean {
        if (rhs instanceof Spacetime2) {
            return this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return this.equals(Spacetime2.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return this.equals(Spacetime2.scalar(1, rhs));
        }
        else {
            return false;
        }
    }
    /**
     * @hidden
     */
    __ne__(rhs: number | Spacetime2 | Unit): boolean {
        if (rhs instanceof Spacetime2) {
            return !this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return !this.equals(Spacetime2.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return !this.equals(Spacetime2.scalar(1, rhs));
        }
        else {
            return true;
        }
    }
    /**
     * @hidden
     */
    __tilde__(): Spacetime2 {
        return this.clone().rev().permlock();
    }
    /**
     * @hidden
     */
    __add__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
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
    __radd__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
            return lhs.clone().add(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime2.scalar(lhs).add(this).permlock();
        }
        else if (lhs instanceof Unit) {
            return Spacetime2.scalar(1, lhs).add(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __sub__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
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
    __rsub__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
            return lhs.clone().sub(this).permlock();
        }
        else if (typeof lhs === 'number') {
            return Spacetime2.scalar(lhs).sub(this).permlock();
        }
        else if (lhs instanceof Unit) {
            return Spacetime2.scalar(1, lhs).sub(this).permlock();
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __pos__(): Spacetime2 {
        return this.clone().permlock();
    }
    /**
     * @hidden
     */
    __neg__(): Spacetime2 {
        return this.clone().neg().permlock();
    }
    /**
     * @hidden
     */
    __mul__(rhs: number | Spacetime2 | Unit): Spacetime2 {
        if (rhs instanceof Spacetime2) {
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
    __rmul__(lhs: number | Spacetime2 | Unit): Spacetime2 {
        if (lhs instanceof Spacetime2) {
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
