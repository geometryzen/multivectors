import { readOnly } from "../i18n/readOnly";
import { AbstractMeasure } from "./AbstractMeasure";
import { arraysEQ2 } from "./arraysEQ";
import { gauss } from "./gauss";
import { GeometricE1 as Geometric } from "./GeometricE1";
import { GeometricNumber } from "./GeometricNumber";
import { GeometricOperators } from "./GeometricOperators";
import { GradeMasked } from "./GradeMasked";
import { SpinorE1 as Spinor } from "./SpinorE1";
import { stringFromCoordinates } from "./stringFromCoordinates";
import { Unit } from "./Unit";
import { VectorE1 as Vector } from "./VectorE1";

/**
 * @hidden
 */
const zero = function (): [a: number, x: number] {
    return [0, 0];
};

/**
 * @hidden
 */
const scalar = function scalar(a: number): [a: number, x: number] {
    const coords = zero();
    coords[COORD_A] = a;
    return coords;
};

/**
 * @hidden
 */
const vector = function vector(x: number): [a: number, x: number] {
    const coords = zero();
    coords[COORD_X] = x;
    return coords;
};

/**
 * @hidden
 */
function copy(mv: Geometric1): Geometric1 {
    return new Geometric1([mv.a, mv.x], mv.uom);
}

/**
 * @hidden
 */
export function lock(mv: Geometric1): Geometric1 {
    mv.lock();
    return mv;
}

/**
 * Coordinates corresponding to basis labels.
 * @hidden
 */
const coordinates = function coordinates(m: Geometric): [a: number, x: number] {
    const coords = zero();
    coords[COORD_A] = m.a;
    coords[COORD_X] = m.x;
    return coords;
};

/**
 * @hidden
 */
function isScalar(m: Geometric): boolean {
    return m.x === 0;
}

/**
 * @hidden
 */
const COORD_A = 0;
/**
 * @hidden
 */
const COORD_X = 1;

/**
 * @hidden
 */
const BASIS_LABELS: [string, string] = ["1", "e1"];
BASIS_LABELS[COORD_A] = '1';
BASIS_LABELS[COORD_X] = 'e1';

/**
 * @hidden
 */
const BASIS_LABELS_LaTeX: [string, string] = ["1", "e_{1}"];
BASIS_LABELS_LaTeX[COORD_A] = '1';
BASIS_LABELS_LaTeX[COORD_X] = 'e_{1}';

/**
 * A mutable and lockable multivector in 1D with a Euclidean metric and optional unit of measure.
 */
export class Geometric1 extends AbstractMeasure implements GradeMasked, Geometric, GeometricNumber<Geometric1, Geometric1, Spinor, Vector, number>, GeometricOperators<Geometric1> {
    static scalar(a: number, uom?: Unit): Geometric1 {
        return new Geometric1([a, 0], uom);
    }
    static vector(x: number, uom?: Unit): Geometric1 {
        return new Geometric1([0, x], uom);
    }

    /**
     * Constructs a Geometric1 representing the number zero.
     * The identity element for addition, <b>0</b>.
     * The returned multivector is locked.
     */
    static readonly zero = lock(new Geometric1(zero(), void 0));

    /**
     * Constructs a Geometric1 representing the number one.
     * The identity element for multiplication, <b>1</b>.
     * The returned multivector is locked.
     */
    static readonly one = lock(new Geometric1(scalar(1), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>x</code> coordinate.
     * The returned multivector is locked.
     */
    static readonly e1 = lock(new Geometric1(vector(1), void 0));

    /**
     * SI base unit of length.
     * The meter is the length of the path travelled by light in vacuum during a time interval of 1 / 299 792 458 of a second.
     */
    static readonly meter = lock(new Geometric1(scalar(1), Unit.METER));

    /**
     * SI base unit of mass.
     * The kilogram is the unit of mass; it is equal to the mass of the international prototype of the kilogram.
     */
    static readonly kilogram = lock(new Geometric1(scalar(1), Unit.KILOGRAM));

    /**
     * SI base unit of time.
     * The second is the duration of 9 192 631 770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium 133 atom.
     */
    static readonly second = lock(new Geometric1(scalar(1), Unit.SECOND));

    /**
     * SI base unit of electric current.
     * The ampere is that constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, and placed 1 meter apart in vacuum, would produce between these conductors a force equal to 2 x 10<sup>-7</sup> newton per meter of length.
     */
    static readonly ampere = lock(new Geometric1(scalar(1), Unit.AMPERE));

    /**
     * SI base unit of thermodynamic temperature.
     * The kelvin, unit of thermodynamic temperature, is the fraction 1 / 273.16 of the thermodynamic temperature of the triple point of water.
     */
    static readonly kelvin = lock(new Geometric1(scalar(1), Unit.KELVIN));

    /**
     * SI base unit of amount of substance.
     * 1. The mole is the amount of substance of a system which contains as many elementary entities as there are atoms in 0.012 kilogram of carbon 12; its symbol is "mol."
     * 
     * 2. When the mole is used, the elementary entities must be specified and may be atoms, molecules, ions, electrons, other particles, or specified groups of such particles.
     */
    static readonly mole = lock(new Geometric1(scalar(1), Unit.MOLE));

    /**
     * SI base unit of luminous intensity.
     * The candela is the luminous intensity, in a given direction, of a source that emits monochromatic radiation of frequency 540 x 10<sup>12</sup> hertz and that has a radiant intensity in that direction of 1 / 683 watt per steradian.
     */
    static readonly candela = lock(new Geometric1(scalar(1), Unit.CANDELA));

    /**
     * SI derived unit of electric charge, quantity of electricity.
     */
    static readonly coulomb = lock(new Geometric1(scalar(1), Unit.COULOMB));

    /**
     * SI derived unit of force.
     */
    static readonly newton = lock(new Geometric1(scalar(1), Unit.NEWTON));

    /**
     * SI derived unit of energy, work, quantity of heat.
     */
    static readonly joule = lock(new Geometric1(scalar(1), Unit.JOULE));

    private readonly coords: [a: number, x: number];

    /**
     * Constructs a mutable instance of Geometric1 from coordinates and an optional unit of measure.
     * @param coords The 2 coordinates are in the order [a, x]. 
     * @param uom The optional unit of measure.
     */
    constructor(coords: [a: number, x: number] = zero(), uom?: Unit) {
        super(uom);
        if (coords.length !== 2) {
            throw new Error("coords.length must be 2.");
        }
        this.coords = coords;
    }
    /**
     * A bitmask describing the non-zero grades that are present in this multivector.
     * 
     * 0x1 = scalar
     * 0x2 = vector
     */
    get grades(): number {
        const coords = this.coords;
        const a = coords[COORD_A];
        const x = coords[COORD_X];
        let mask = 0x0;
        if (a !== 0) {
            mask += 0x1;
        }
        if (x !== 0) {
            mask += 0x2;
        }
        return mask;
    }

    add(M: Geometric1, α = 1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().add(M, α));
        }
        else {
            if (this.isZero()) {
                this.a = M.a * α;
                this.x = M.x * α;
                this.uom = M.uom;
                return this;
            }
            else if (M.isZero()) {
                // α has no effect because M is zero.
                return this;
            }
            else {
                this.a += M.a * α;
                this.x += M.x * α;
                this.uom = Unit.compatible(this.uom, M.uom);
                return this;
            }
        }
    }

    /**
     * @hidden 
     */
    addVector(v: Vector, α = 1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().addVector(v, α));
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (v.x === 0) {
                // α has no effect because v is zero.
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.x += v.x * α;
            return this;
        }
    }

    /**
     * Adds a multiple of a scalar to this multivector.
     * @param a The scalar value to be added to this multivector.
     * @param uom The optional unit of measure.
     * @param α The fraction of (a * uom) to be added. Default is 1.
     * @returns this + (a * uom) * α
     */
    addScalar(a: number, uom?: Unit, α = 1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().addScalar(a, uom, α));
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

    clone(): Geometric1 {
        return copy(this);
    }

    conj(): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().conj());
        }
        else {
            this.x = -this.x;
            return this;
        }
    }

    copy(rhs: Geometric1): Geometric1 {
        if (this.isMutable()) {
            this.a = rhs.a;
            this.x = rhs.x;
            this.uom = rhs.uom;
            return this;
        }
        else {
            return lock(copy(this).copy(rhs));
        }
    }
    copyVector(vector: Vector): Geometric1 {
        if (this.isMutable()) {
            this.a = 0;
            this.x = vector.x;
            this.uom = vector.uom;
            return this;
        }
        else {
            return this.clone().copyVector(vector).permlock();
        }
    }
    dual(): Geometric1 {
        if (this.isLocked()) {
            return this.clone().dual().permlock();
        }
        else {
            const a = this.b;
            const b = this.a;

            this.a = a;
            this.b = b;
            return this;
        }
    }
    equals(other: unknown): boolean {
        if (other === this) {
            return true;
        }
        else if (other instanceof Geometric1) {
            return arraysEQ2(this.coords, other.coords) && Unit.isCompatible(this.uom, other.uom);
        }
        else {
            return false;
        }
    }
    lco(rhs: Geometric1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().lco(rhs));
        }
        else {
            return this.lco2(this, rhs);
        }
    }
    /**
     * @hidden
     */
    lco2(lhs: Geometric, rhs: Geometric): this {
        const a0 = lhs.a;
        const a1 = lhs.x;
        const b0 = rhs.a;
        const b1 = rhs.x;
        this.a = a0 * b0 + a1 * b1;
        this.x = a0 * b1;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }
    div(rhs: Geometric1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().div(rhs));
        }
        else {
            if (isScalar(rhs)) {
                return this.divByScalar(rhs.a, rhs.uom);
            }
            else {
                return this.mul(copy(rhs).inv());
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    divByVector(rhs: Vector): Geometric1 {
        throw new Error("Method not implemented.");
    }
    ext(m: Geometric1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().ext(m));
        }
        else {
            const a0 = this.a;
            const a1 = this.x;
            const b0 = m.a;
            const b1 = m.x;
            this.a = a0 * b0;
            this.x = a0 * b1 + a1 * b0;
            this.uom = Unit.mul(this.uom, m.uom);
            return this;
        }
    }
    grade(n: number): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().grade(n));
        }
        else {
            // There is no change to the unit of measure.
            switch (n) {
                case 0: {
                    this.x = 0;
                    break;
                }
                case 1: {
                    this.a = 0;
                    break;
                }
                default: {
                    this.a = 0;
                    this.x = 0;
                }
            }
            return this;
        }
    }
    isBivector(): boolean {
        return this.coords[COORD_A] === 0 && this.coords[COORD_X] === 0;
    }
    isOne(): boolean {
        return this.coords[COORD_A] === 1 && this.coords[COORD_X] === 0 && Unit.isOne(this.uom);
    }
    isScalar(): boolean {
        return this.coords[COORD_X] === 0;
    }
    isSpinor(): boolean {
        if (Unit.isOne(this.uom)) {
            return this.coords[COORD_X] === 0;
        }
        else {
            return false;
        }
    }
    isVector(): boolean {
        return this.coords[COORD_A] === 0;
    }
    magnitude(): Geometric1 {
        if (this.isMutable()) {
            this.a = this.magnitudeNoUnits();
            this.x = 0;
            // There is no change to the unit of measure.
            return this;
        }
        else {
            return lock(this.clone().magnitude());
        }
    }
    magnitudeNoUnits(): number {
        return Math.sqrt(this.quaditudeNoUnits());
    }
    mul(rhs: Geometric1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().mul(rhs));
        }
        else {
            return this.mul2(this, rhs);
        }
    }
    /**
     * @hidden
     */
    mul2(lhs: Geometric, rhs: Geometric): this {
        const a0 = lhs.a;
        const a1 = lhs.x;
        const b0 = rhs.a;
        const b1 = rhs.x;
        this.a = a0 * b0 + a1 * b1;
        this.x = a0 * b1 + a1 * b0;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }

    /**
     * @hidden
     */
    mulByNumber(α: number): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().mulByNumber(α));
        }
        else {
            this.a *= α;
            this.x *= α;
            // There is no change in the unit of measure.
            return this;
        }
    }
    mulByVector(v: Vector): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().mulByVector(v));
        }
        else {
            const a0 = this.a;
            const a1 = this.x;
            const b1 = v.x;
            this.a = a1 * b1;
            this.x = a0 * b1;
            this.uom = Unit.mul(this.uom, v.uom);
            return this;
        }
    }
    rco(m: Geometric1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().rco(m));
        }
        else {
            return this.rco2(this, m);
        }
    }
    /**
     * @hidden
     */
    rco2(lhs: Geometric, rhs: Geometric): this {
        const a0 = lhs.a;
        const a1 = lhs.x;
        const b0 = rhs.a;
        const b1 = rhs.x;
        this.a = a0 * b0 + a1 * b1;
        this.x = a1 * b0;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }
    rev(): Geometric1 {
        if (this.isMutable()) {
            // reverse has a ++-- structure on the grades.
            this.a = +this.a;
            this.x = +this.x;
            // The unit of measure is unchanged.
            return this;
        }
        else {
            return lock(this.clone().rev());
        }
    }
    /**
     * @hidden
     */
    quaditude(): Geometric1 {
        if (this.isMutable()) {
            this.a = this.quaditudeNoUnits();
            this.x = 0;
            this.uom = Unit.mul(this.uom, this.uom);
            return this;
        }
        else {
            return lock(this.clone().quaditude());
        }
    }

    /**
     * @hidden
     */
    quaditudeNoUnits(): number {
        const a = this.a;
        const x = this.x;
        return a * a + x * x;
    }

    /**
     * Subtracts a multiple of a scalar from this multivector.
     * @param a The scalar value to be subtracted from this multivector.
     * @param uom The optional unit of measure.
     * @param α The fraction of (a * uom) to be subtracted. Default is 1.
     * @returns this - (a * uom) * α
     */
    subScalar(a: number, uom?: Unit, α = 1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().subScalar(a, uom, α));
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
    scp(m: Geometric1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().scp(m));
        }
        else {
            return this.scp2(this, m);
        }
    }
    /**
     * @hidden
     */
    scp2(a: Geometric, b: Geometric): this {
        const a0 = a.a;
        const a1 = a.x;

        const b0 = b.a;
        const b1 = b.x;

        const s = a0 * b0 + a1 * b1;

        this.a = s;
        this.x = 0;
        this.uom = Unit.mul(a.uom, b.uom);

        return this;
    }

    sqrt(): Geometric1 {
        if (this.isLocked()) {
            return this.clone().sqrt().permlock();
        }
        else {
            this.a = Math.sqrt(this.a);
            this.x = 0;
            this.uom = Unit.sqrt(this.uom);
            return this;
        }
    }

    squaredNorm(): Geometric1 {
        if (this.isMutable()) {
            this.a = this.quaditudeNoUnits();
            this.x = 0;
            this.uom = Unit.mul(this.uom, this.uom);
            return this;
        }
        else {
            return lock(this.clone().quaditude());
        }
    }
    /**
     * @hidden
     */
    subVector(v: Vector, α = 1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().subVector(v, α));
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (v.x === 0) {
                // α has no effect because v is zero.
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.x -= v.x * α;
            return this;
        }
    }
    divByScalar(a: number, uom?: Unit): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().divByScalar(a, uom));
        }
        else {
            this.uom = Unit.div(this.uom, uom);
            this.a /= a;
            this.x /= a;
            return this;
        }
    }
    scale(a: number): Geometric1 {
        if (this.isMutable()) {
            this.a = this.a * a;
            this.x = this.x * a;
            return this;
        }
        else {
            return lock(copy(this).scale(a));
        }
    }
    reflect(n: Vector): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().reflect(n));
        }
        else {
            const nx = n.x;
            const nu = n.uom;
            const a = this.a;
            const x = this.x;
            const u = this.uom;

            const nx2 = nx * nx;
            const μ = nx2;
            const β = nx2;

            // The scalar component picks up a minus sign and the factor |n||n|.
            this.a = -β * a;
            this.x = - μ * x;
            // In most cases, n SHOULD be dimensionless.
            this.uom = Unit.mul(nu, Unit.mul(u, nu));
            return this;
        }
    }
    rotate(spinor: Spinor): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().rotate(spinor));
        }
        else {
            // We are assuming that R is dimensionless.
            Unit.assertDimensionless(spinor.uom);
            const a = this.a;
            const x = this.x;
            const α = spinor.a;
            const α2 = α * α;
            const p = α2;
            const s = α2;
            this.a = s * a;
            this.x = p * x;
            return this;
        }
    }
    sub(M: Geometric1, α = 1): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().sub(M, α));
        }
        else {
            if (this.isZero()) {
                this.a = -M.a * α;
                this.x = -M.x * α;
                this.uom = M.uom;
            }
            else if (M.isZero()) {
                return this;
            }
            else {
                this.a -= M.a * α;
                this.x -= M.x * α;
                this.uom = Unit.compatible(this.uom, M.uom);
            }
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
    zero(): Geometric1 {
        if (this.isMutable()) {
            this.a = 0;
            this.x = 0;
            this.uom = Unit.ONE;
            return this;
        }
        else {
            return lock(copy(this).zero());
        }
    }
    /**
     * @hidden 
     */
    __div__(rhs: unknown): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(this.clone().div(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(this.clone().divByNumber(rhs));
        }
        else if (rhs instanceof Unit) {
            return lock(this.clone().divByScalar(1, rhs));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    divByNumber(α: number): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().divByNumber(α));
        }
        else {
            this.a /= α;
            this.x /= α;
            return this;
        }
    }
    /**
     * @hidden 
     */
    __rdiv__(lhs: unknown): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).div(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric1.scalar(lhs, void 0).div(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __vbar__(rhs: unknown): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(copy(this).scp(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(copy(this).scp(Geometric1.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rvbar__(lhs: unknown): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).scp(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric1.scalar(lhs).scp(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __wedge__(rhs: unknown): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(copy(this).ext(rhs));
        }
        else if (typeof rhs === 'number') {
            // The outer product with a scalar is scalar multiplication.
            return lock(copy(this).mulByNumber(rhs));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rwedge__(lhs: Geometric1 | number): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).ext(this));
        }
        else if (typeof lhs === 'number') {
            // The outer product with a scalar is scalar multiplication, and commutes.
            return lock(copy(this).mulByNumber(lhs));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __lshift__(rhs: Geometric1 | number): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(copy(this).lco(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(copy(this).lco(Geometric1.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rlshift__(lhs: Geometric1 | number): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).lco(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric1.scalar(lhs).lco(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rshift__(rhs: Geometric1 | number): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(copy(this).rco(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(copy(this).rco(Geometric1.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rrshift__(lhs: Geometric1 | number): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).rco(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric1.scalar(lhs).rco(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __bang__(): Geometric1 {
        return lock(copy(this).inv());
    }
    inv(): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().inv());
        }
        else {
            const x0 = this.a;
            const x1 = this.x;

            const A = [
                [x0, x1],
                [x1, x0]
            ];

            const b = [1, 0];

            const X = gauss(A, b);

            this.a = X[0];
            this.x = X[1];

            this.uom = Unit.inv(this.uom);

            return this;
        }
    }
    /**
     * @hidden 
     */
    __eq__(rhs: Geometric1 | number | Unit): boolean {
        if (rhs instanceof Geometric1) {
            return this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return this.equals(Geometric1.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return this.equals(Geometric1.scalar(1, rhs));
        }
        else {
            return false;
        }
    }
    /**
     * @hidden 
     */
    __ne__(rhs: Geometric1 | number | Unit): boolean {
        if (rhs instanceof Geometric1) {
            return !this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return !this.equals(Geometric1.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return !this.equals(Geometric1.scalar(1, rhs));
        }
        else {
            return true;
        }
    }
    /**
     * @hidden 
     */
    __tilde__(): Geometric1 {
        return lock(copy(this).rev());
    }
    /**
     * @hidden 
     */
    __add__(rhs: Geometric1 | number | Unit): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(this.clone().add(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(this.clone().addScalar(rhs, void 0, 1));
        }
        else if (rhs instanceof Unit) {
            return lock(this.clone().addScalar(1, rhs, 1));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __radd__(lhs: Geometric1 | number | Unit): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).add(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric1.scalar(lhs).add(this));
        }
        else if (lhs instanceof Unit) {
            return lock(Geometric1.scalar(1, lhs).add(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __sub__(rhs: Geometric1 | number | Unit): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(this.clone().sub(rhs));
        }
        else if (typeof rhs === 'number') {

            return lock(this.clone().subScalar(rhs, void 0, 1));
        }
        else if (rhs instanceof Unit) {
            return lock(this.clone().subScalar(1, rhs, 1));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rsub__(lhs: Geometric1 | number | Unit): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).sub(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric1.scalar(lhs).sub(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __pos__(): Geometric1 {
        return lock(copy(this));
    }
    /**
     * @hidden 
     */
    __neg__(): Geometric1 {
        return lock(copy(this).neg());
    }
    neg(): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().neg());
        }
        else {
            this.a = -this.a;
            this.x = -this.x;
            // There is no change in the unit of measure.
            return this;
        }
    }
    isZero(): boolean {
        return this.coords[COORD_A] === 0 && this.coords[COORD_X] === 0;
    }
    /**
     * @hidden 
     */
    __mul__(rhs: Geometric1 | number | Unit): Geometric1 {
        if (rhs instanceof Geometric1) {
            return lock(this.clone().mul(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(this.clone().mulByNumber(rhs));
        }
        else if (rhs instanceof Unit) {
            return lock(this.clone().mulByScalar(1, rhs));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden 
     */
    __rmul__(lhs: Geometric1 | number | Unit): Geometric1 {
        if (lhs instanceof Geometric1) {
            return lock(copy(lhs).mul(this));
        }
        else if (typeof lhs === 'number') {
            // The ordering of operands is not important for scalar multiplication.
            return lock(copy(this).mulByNumber(lhs));
        }
        else {
            return void 0;
        }
    }
    mulByScalar(α: number, uom?: Unit): Geometric1 {
        if (this.isLocked()) {
            return lock(this.clone().mulByScalar(α, uom));
        }
        else {
            this.a *= α;
            this.x *= α;
            this.uom = Unit.mul(this.uom, uom);
            return this;
        }
    }

    get a(): number {
        return this.coords[COORD_A];
    }
    set a(a: number) {
        if (this.isMutable()) {
            this.coords[COORD_A] = a;
        }
        else {
            throw new Error(readOnly('a').message);
        }
    }

    get x(): number {
        return this.coords[COORD_X];
    }
    set x(x: number) {
        if (this.isMutable()) {
            this.coords[COORD_X] = x;
        }
        else {
            throw new Error(readOnly('x').message);
        }
    }

    get b(): number {
        return this.coords[COORD_X];
    }
    set b(b: number) {
        if (this.isMutable()) {
            this.coords[COORD_X] = b;
        }
        else {
            throw new Error(readOnly('b').message);
        }
    }
}
