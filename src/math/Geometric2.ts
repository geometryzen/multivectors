import { mustBeNumber } from '../checks/mustBeNumber';
import { notImplemented } from '../i18n/notImplemented';
import { readOnly } from "../i18n/readOnly";
import { AbstractMeasure } from './AbstractMeasure';
import { approx } from "./approx";
import { arraysEQ4 } from "./arraysEQ";
import { BivectorE2 as Bivector } from "./BivectorE2";
import { gauss } from "./gauss";
import { GeometricE2 as Geometric } from "./GeometricE2";
import { GeometricNumber } from './GeometricNumber';
import { GeometricOperators } from './GeometricOperators';
import { GradeMasked } from "./GradeMasked";
import { isZeroGeometricE2 as isZeroGeometric } from "./isZeroGeometricE2";
import { isZeroVectorE2 as isZeroVector } from "./isZeroVectorE2";
import { QQ } from "./QQ";
import { rotorFromDirectionsE2 as rotorFromDirections } from './rotorFromDirectionsE2';
import { Scalar } from "./Scalar";
import { SpinorE2 as Spinor } from "./SpinorE2";
import { stringFromCoordinates } from "./stringFromCoordinates";
import { Unit } from "./Unit";
import { VectorE2 as Vector } from "./VectorE2";

// Symbolic constants for the coordinate indices into the data array.
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
const COORD_Y = 2;
/**
 * @hidden
 */
const COORD_B = 3;

/**
 * @hidden
 */
const BASIS_LABELS = ["1", "e1", "e2", "e12"];
BASIS_LABELS[COORD_A] = '1';
BASIS_LABELS[COORD_X] = 'e1';
BASIS_LABELS[COORD_Y] = 'e2';
BASIS_LABELS[COORD_B] = 'e12';

/**
 * @hidden
 */
const BASIS_LABELS_LaTeX = ["1", "e_{1}", "e_{2}", "I"];
BASIS_LABELS_LaTeX[COORD_A] = '1';
BASIS_LABELS_LaTeX[COORD_X] = 'e_{1}';
BASIS_LABELS_LaTeX[COORD_Y] = 'e_{2}';
BASIS_LABELS_LaTeX[COORD_B] = 'I';

/**
 * @hidden
 */
const zero = function (): [a: number, x: number, y: number, b: number] {
    return [0, 0, 0, 0];
};

/**
 * @hidden
 */
const scalar = function scalar(a: number): [a: number, x: number, y: number, b: number] {
    const coords = zero();
    coords[COORD_A] = a;
    return coords;
};

/**
 * @hidden
 */
const vector = function vector(x: number, y: number): [a: number, x: number, y: number, b: number] {
    const coords = zero();
    coords[COORD_X] = x;
    coords[COORD_Y] = y;
    return coords;
};

/**
 * @hidden
 */
const bivector = function bivector(b: number): [a: number, x: number, y: number, b: number] {
    const coords = zero();
    coords[COORD_B] = b;
    return coords;
};

/**
 * @hidden
 */
const pseudo = function pseudo(b: number): [a: number, x: number, y: number, b: number] {
    const coords = zero();
    coords[COORD_B] = b;
    return coords;
};

/**
 * @hidden
 */
const spinor = function spinor(a: number, b: number): [a: number, x: number, y: number, b: number] {
    const coords = zero();
    coords[COORD_A] = a;
    coords[COORD_B] = b;
    return coords;
};

/**
 * Coordinates corresponding to basis labels.
 * @hidden
 */
const coordinates = function coordinates(m: Geometric): [a: number, x: number, y: number, b: number] {
    const coords = zero();
    coords[COORD_A] = m.a;
    coords[COORD_X] = m.x;
    coords[COORD_Y] = m.y;
    coords[COORD_B] = m.b;
    return coords;
};

/**
 * @hidden
 */
function isScalar(m: Geometric): boolean {
    return m.x === 0 && m.y === 0 && m.b === 0;
}

/**
 * Sets the lock on the multivector argument and returns the same argument.
 * This is a convenience function for the dunder (double underscore) methods.
 * All dunder methods should return locked values.
 * @hidden
 */
function lock(m: Geometric2): Geometric2 {
    m.lock();
    return m;
}

/**
 * A mutable and lockable multivector in 2D with a Euclidean metric and optional unit of measure.
 */
export class Geometric2 extends AbstractMeasure implements GradeMasked, Geometric, GeometricNumber<Geometric2, Geometric2, Spinor, Vector, number>, GeometricOperators<Geometric2> {

    /**
     * Creates a grade 0 (scalar) multivector with value `alpha * uom`.
     * The scalar returned is in the unlocked (mutable) state.
     * @param a The scaling factor for the unit of measure.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static scalar(a: number, uom?: Unit): Geometric2 {
        return new Geometric2(scalar(a), uom);
    }

    /**
     * Creates a grade 2 (bivector) multivector from the specified cartesian coordinates.
     * The bivector returned is in the unlocked (mutable) state.
     * @param b The coordinate corresponding to the e1e2 basis bivector.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static bivector(b: number, uom?: Unit): Geometric2 {
        return Geometric2.spinor(0, b, uom);
    }


    /**
     * Creates a spinor valued multivector from the specified cartesian coordinates.
     * The spinor returned is in the unlocked (mutable) state.
     * @param a The scalar coordinate.
     * @param b The pseudoscalar coordinate.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static spinor(a: number, b: number, uom?: Unit): Geometric2 {
        return new Geometric2(spinor(a, b), uom);
    }

    /**
     * Creates a grade 1 (vector) multivector from the specified cartesian coordinates.
     * @param x The coordinate corresponding to the e1 basis vector.
     * @param y The coordinate corresponding to the e2 basis vector.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static vector(x: number, y: number, uom?: Unit): Geometric2 {
        const contextBuilder = () => "Geometric2.vector(x: number, y: number, uom?: Unit): Geometric2";
        mustBeNumber('x', x, contextBuilder);
        mustBeNumber('y', y, contextBuilder);
        return new Geometric2(vector(x, y), uom);
    }

    static copy(mv: Geometric): Geometric2 {
        return new Geometric2(coordinates(mv), mv.uom);
    }

    static fromBivector(B: Bivector): Geometric2 {
        return new Geometric2(bivector(B.xy), B.uom);
    }

    static fromScalar(alpha: Scalar): Geometric2 {
        return new Geometric2(scalar(alpha.a), alpha.uom);
    }

    static fromSpinor(R: Spinor): Geometric2 {
        return new Geometric2(spinor(R.a, R.xy), R.uom);
    }

    static fromVector(v: Vector): Geometric2 {
        return new Geometric2(vector(v.x, v.y), v.uom);
    }

    static rotorFromDirections(a: Vector, b: Vector): Geometric2 {
        return new Geometric2([0, 0, 0, 0]).rotorFromDirections(a, b);
    }

    static rotorFromVectorToVector(a: Vector, b: Vector): Geometric2 {
        return new Geometric2([0, 0, 0, 0]).rotorFromVectorToVector(a, b);
    }

    /**
     * Constructs a Geometric2 representing the number zero.
     * The identity element for addition, <b>0</b>.
     * The returned multivector is locked.
     */
    static readonly zero = lock(new Geometric2(zero(), void 0));

    /**
     * Constructs a Geometric2 representing the number one.
     * The identity element for multiplication, <b>1</b>.
     * The returned multivector is locked.
     */
    static readonly one = lock(new Geometric2(scalar(1), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>x</code> coordinate.
     * The returned multivector is locked.
     */
    static readonly e1 = lock(new Geometric2(vector(1, 0), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>y</code> coordinate.
     * The returned multivector is locked.
     */
    static readonly e2 = lock(new Geometric2(vector(0, 1), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>β</code> coordinate.
     * The returned multivector is locked.
     */
    static readonly I = lock(new Geometric2(pseudo(1), void 0));

    /**
     * SI base unit of length.
     * The meter is the length of the path travelled by light in vacuum during a time interval of 1 / 299 792 458 of a second.
     */
    static readonly meter = lock(new Geometric2(scalar(1), Unit.METER));

    /**
     * SI base unit of mass.
     * The kilogram is the unit of mass; it is equal to the mass of the international prototype of the kilogram.
     */
    static readonly kilogram = lock(new Geometric2(scalar(1), Unit.KILOGRAM));

    /**
     * SI base unit of time.
     * The second is the duration of 9 192 631 770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium 133 atom.
     */
    static readonly second = lock(new Geometric2(scalar(1), Unit.SECOND));

    /**
     * SI base unit of electric current.
     * The ampere is that constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, and placed 1 meter apart in vacuum, would produce between these conductors a force equal to 2 x 10<sup>-7</sup> newton per meter of length.
     */
    static readonly ampere = lock(new Geometric2(scalar(1), Unit.AMPERE));

    /**
     * SI base unit of thermodynamic temperature.
     * The kelvin, unit of thermodynamic temperature, is the fraction 1 / 273.16 of the thermodynamic temperature of the triple point of water.
     */
    static readonly kelvin = lock(new Geometric2(scalar(1), Unit.KELVIN));

    /**
     * SI base unit of amount of substance.
     * 1. The mole is the amount of substance of a system which contains as many elementary entities as there are atoms in 0.012 kilogram of carbon 12; its symbol is "mol."
     * 
     * 2. When the mole is used, the elementary entities must be specified and may be atoms, molecules, ions, electrons, other particles, or specified groups of such particles.
     */
    static readonly mole = lock(new Geometric2(scalar(1), Unit.MOLE));

    /**
     * SI base unit of luminous intensity.
     * The candela is the luminous intensity, in a given direction, of a source that emits monochromatic radiation of frequency 540 x 10<sup>12</sup> hertz and that has a radiant intensity in that direction of 1 / 683 watt per steradian.
     */
    static readonly candela = lock(new Geometric2(scalar(1), Unit.CANDELA));

    /**
     * SI derived unit of electric charge, quantity of electricity.
     */
    static readonly coulomb = lock(new Geometric2(scalar(1), Unit.COULOMB));

    /**
     * SI derived unit of force.
     */
    static readonly newton = lock(new Geometric2(scalar(1), Unit.NEWTON));

    /**
     * SI derived unit of energy, work, quantity of heat.
     */
    static readonly joule = lock(new Geometric2(scalar(1), Unit.JOULE));

    /**
     * 
     */
    private readonly coords_: [number, number, number, number];

    /**
     * Constructs a mutable instance of Geometric2 from coordinates and an optional unit of measure.
     * @param coords The 4 coordinates are in the order [a, x, y, b]. 
     * @param uom The optional unit of measure.
     */
    constructor(coords: [a: number, x: number, y: number, b: number] = zero(), uom?: Unit) {
        super(uom);
        if (coords.length !== 4) {
            throw new Error("coords.length must be 4");
        }
        this.coords_ = coords;
    }
    scale(α: number): Geometric2 {
        return this.mulByNumber(α);
    }
    /**
     * @hidden
     */
    __div__(rhs: Geometric2 | number | Unit): Geometric2 {
        if (rhs instanceof Geometric2) {
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
    __rdiv__(lhs: number | Geometric2): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).div(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric2.scalar(lhs, void 0).div(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __vbar__(rhs: number | Geometric2): Geometric2 {
        if (rhs instanceof Geometric2) {
            return lock(Geometric2.copy(this).scp(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(Geometric2.copy(this).scp(Geometric2.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rvbar__(lhs: number | Geometric2): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).scp(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric2.scalar(lhs).scp(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __wedge__(rhs: number | Geometric2): Geometric2 {
        if (rhs instanceof Geometric2) {
            return lock(Geometric2.copy(this).ext(rhs));
        }
        else if (typeof rhs === 'number') {
            // The outer product with a scalar is scalar multiplication.
            return lock(Geometric2.copy(this).mulByNumber(rhs));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rwedge__(lhs: number | Geometric2): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).ext(this));
        }
        else if (typeof lhs === 'number') {
            // The outer product with a scalar is scalar multiplication, and commutes.
            return lock(Geometric2.copy(this).mulByNumber(lhs));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __lshift__(rhs: number | Geometric2): Geometric2 {
        if (rhs instanceof Geometric2) {
            return lock(Geometric2.copy(this).lco(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(Geometric2.copy(this).lco(Geometric2.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rlshift__(lhs: number | Geometric2): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).lco(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric2.scalar(lhs).lco(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rshift__(rhs: number | Geometric2): Geometric2 {
        if (rhs instanceof Geometric2) {
            return lock(Geometric2.copy(this).rco(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(Geometric2.copy(this).rco(Geometric2.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __rrshift__(lhs: number | Geometric2): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).rco(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric2.scalar(lhs).rco(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __bang__(): Geometric2 {
        return lock(Geometric2.copy(this).inv());
    }
    /**
     * @hidden
     */
    __eq__(rhs: Geometric2 | number | Unit): boolean {
        if (rhs instanceof Geometric2) {
            return this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return this.equals(Geometric2.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return this.equals(Geometric2.scalar(1, rhs));
        }
        else {
            return false;
        }
    }
    /**
     * @hidden
     */
    __ne__(rhs: Geometric2 | number | Unit): boolean {
        if (rhs instanceof Geometric2) {
            return !this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return !this.equals(Geometric2.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return !this.equals(Geometric2.scalar(1, rhs));
        }
        else {
            return true;
        }
    }
    /**
     * @hidden
     */
    __tilde__(): Geometric2 {
        return lock(Geometric2.copy(this).rev());
    }
    /**
     * @hidden
     */
    __add__(rhs: Geometric2 | number | Unit): Geometric2 {
        if (rhs instanceof Geometric2) {
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
    __radd__(lhs: Geometric2 | number | Unit): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).add(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric2.scalar(lhs).add(this));
        }
        else if (lhs instanceof Unit) {
            return lock(Geometric2.scalar(1, lhs).add(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __sub__(rhs: Geometric2 | number | Unit): Geometric2 {
        if (rhs instanceof Geometric2) {
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
    __rsub__(lhs: Geometric2 | number): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).sub(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric2.scalar(lhs).sub(this));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    __pos__(): Geometric2 {
        return lock(Geometric2.copy(this));
    }
    /**
     * @hidden
     */
    __neg__(): Geometric2 {
        return lock(Geometric2.copy(this).neg());
    }
    /**
     * @hidden
     */
    __mul__(rhs: Geometric2 | number | Unit): Geometric2 {
        if (rhs instanceof Geometric2) {
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
    __rmul__(lhs: Geometric2 | number): Geometric2 {
        if (lhs instanceof Geometric2) {
            return lock(Geometric2.copy(lhs).mul(this));
        }
        else if (typeof lhs === 'number') {
            // The ordering of operands is not important for scalar multiplication.
            return lock(Geometric2.copy(this).mulByNumber(lhs));
        }
        else {
            return void 0;
        }
    }
    /**
     * @hidden
     */
    add2(a: Geometric, b: Geometric): Geometric2 {
        if (isZeroGeometric(a)) {
            this.uom = b.uom;
        }
        else if (isZeroGeometric(b)) {
            this.uom = a.uom;
        }
        else {
            this.uom = Unit.compatible(a.uom, b.uom);
        }
        this.a = a.a + b.a;
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.b = a.b + b.b;
        return this;
    }
    addPseudo(β: number, uom?: Unit): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().addPseudo(β, uom));
        }
        else {
            if (this.isZero()) {
                this.uom = uom;
            }
            else if (β === 0) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, uom);
            }
            this.b += β;
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
    addScalar(a: number, uom?: Unit, α = 1): Geometric2 {
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

    /**
     * @hidden
     */
    approx(n: number): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().approx(n));
        }
        else {
            approx(this.coords_, n);
            return this;
        }
    }
    conj(): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().conj());
        }
        else {
            this.x = -this.x;
            this.y = -this.y;
            this.b = -this.b;
            return this;
        }
    }
    copySpinor(spinor: Spinor): Geometric2 {
        const a = spinor.a;
        const b = spinor.xy;
        this.setCoordinate(COORD_A, a, 'a');
        this.setCoordinate(COORD_X, 0, 'x');
        this.setCoordinate(COORD_Y, 0, 'y');
        this.setCoordinate(COORD_B, b, 'b');
        this.uom = spinor.uom;
        return this;
    }
    /**
     * @param rhs The multivector dividend.
     * @returns this / m;
     */
    div(rhs: Geometric): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().div(rhs));
        }
        else {
            if (isScalar(rhs)) {
                return this.divByScalar(rhs.a, rhs.uom);
            }
            else {
                return this.mul(Geometric2.copy(rhs).inv());
            }
        }
    }

    /**
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    div2(a: Spinor, b: Spinor): Geometric2 {
        throw new Error(notImplemented('div2').message);
    }

    divByNumber(α: number): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().divByNumber(α));
        }
        else {
            this.a /= α;
            this.x /= α;
            this.y /= α;
            this.b /= α;
            return this;
        }
    }
    divByVector(v: Vector): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().divByVector(v));
        }
        else {
            const x = v.x;
            const y = v.y;
            return this.mulByVector(v).divByScalar(x * x + y * y, Unit.pow(v.uom, QQ.valueOf(2, 1)));
        }
    }
    dual(): Geometric2 {
        if (this.isLocked()) {
            return this.clone().dual().permlock();
        }
        else {
            const a = this.b;
            const y = -this.x;
            const x = this.y;
            const b = -this.a;

            this.a = a;
            this.x = x;
            this.y = y;
            this.b = b;
            return this;
        }
    }
    equals(other: unknown): boolean {
        if (other === this) {
            return true;
        }
        else if (other instanceof Geometric2) {
            return arraysEQ4(this.coords_, other.coords_) && Unit.isCompatible(this.uom, other.uom);
        }
        else {
            return false;
        }
    }

    /**
     * @hidden
     */
    ext2(lhs: Geometric, rhs: Geometric): this {
        const a0 = lhs.a;
        const a1 = lhs.x;
        const a2 = lhs.y;
        const a3 = lhs.b;
        const b0 = rhs.a;
        const b1 = rhs.x;
        const b2 = rhs.y;
        const b3 = rhs.b;
        this.a = a0 * b0;
        this.x = a0 * b1 + a1 * b0;
        this.y = a0 * b2 + a2 * b0;
        this.b = a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }
    grade(n: number): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().grade(n));
        }
        else {
            // There is no change to the unit of measure.
            switch (n) {
                case 0: {
                    this.x = 0;
                    this.y = 0;
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
                    this.x = 0;
                    this.y = 0;
                    break;
                }
                default: {
                    this.a = 0;
                    this.x = 0;
                    this.y = 0;
                    this.b = 0;
                }
            }
            return this;
        }
    }
    I(): Geometric2 {
        this.a = 0;
        this.x = 0;
        this.y = 0;
        this.b = 1;
        this.uom = void 0;
        return this;
    }
    lco(rhs: Geometric): Geometric2 {
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
        const La = lhs.a;
        const Lx = lhs.x;
        const Ly = lhs.y;
        const Lb = lhs.b;
        const Ra = rhs.a;
        const Rx = rhs.x;
        const Ry = rhs.y;
        const Rb = rhs.b;
        this.a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
        this.x = La * Rx - Ly * Rb;
        this.y = La * Ry + Lx * Rb;
        this.b = La * Rb;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }
    one(): Geometric2 {
        this.a = 1;
        this.x = 0;
        this.y = 0;
        this.b = 0;
        this.uom = void 0;
        return this;
    }
    rco(m: Geometric): Geometric2 {
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
        const La = lhs.a;
        const Lx = lhs.x;
        const Ly = lhs.y;
        const Lb = lhs.b;
        const Ra = rhs.a;
        const Rx = rhs.x;
        const Ry = rhs.y;
        const Rb = rhs.b;
        this.a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
        this.x = Lx * Ra + Lb * Ry;
        this.y = Ly * Ra - Lb * Rx;
        this.b = Lb * Ra;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }

    /**
     * If `this` is mutable, then sets `this` multivector to its reflection in the plane orthogonal to vector n. The result is mutable.
     * If `this` is immutable (locked), a copy of `this` is made, which is then reflected. The result is immutable (locked).
     * 
     * i.e. The result is mutable (unlocked) iff `this` is mutable (unlocked). 
     *
     * Mathematically,
     *
     * this ⟼ - n * this * n
     *
     * Geometrically,
     *
     * Reflects this multivector in the plane orthogonal to the unit vector, n.
     * This implementation does assume that n is a vector, but does not assume that it is normalized to unity.
     *
     * If n is not a unit vector then the result is scaled by n squared.
     * The scalar component gets an extra minus sign. The pseudoscalar component does not change sign.
     * The units of measure are carried through but in most cases n SHOULD be dimensionless.
     *
     * @param n The unit vector that defines the reflection plane.
     */
    reflect(n: Readonly<Vector>): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().reflect(n));
        }
        else {
            const nx = n.x;
            const ny = n.y;
            const nu = n.uom;
            const a = this.a;
            const x = this.x;
            const y = this.y;
            const b = this.b;
            const u = this.uom;

            const nx2 = nx * nx;
            const ny2 = ny * ny;
            const μ = nx2 - ny2;
            const λ = -2 * nx * ny;
            const β = nx2 + ny2;

            // The scalar component picks up a minus sign and the factor |n||n|.
            this.a = -β * a;
            this.x = λ * y - μ * x;
            this.y = λ * x + μ * y;
            // The pseudoscalar component does not change sign but still picks up the |n||n| factor.
            this.b = β * b;
            // In most cases, n SHOULD be dimensionless.
            this.uom = Unit.mul(nu, Unit.mul(u, nu));
            return this;
        }
    }
    /**
     * <p>
     * Computes a rotor, R, from two unit vectors, where
     * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     * </p>
     * 
     * The result is independent of the magnitudes of a and b.
     *
     * @param a The starting vector
     * @param b The ending vector
     * @returns The rotor representing a rotation from a to b.
     */
    rotorFromDirections(a: Vector, b: Vector): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().rotorFromDirections(a, b));
        }
        else {
            rotorFromDirections(a, b, this);
            return this;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rotorFromFrameToFrame(es: Vector[], fs: Vector[]): Geometric2 {
        throw new Error(notImplemented('rotorFromFrameToFrame').message);
    }
    /**
     * Sets this multivector to a rotor that rotates through angle θ in the oriented plane defined by B.
     *
     * @param B The (unit) bivector generating the rotation.
     * @param θ The rotation angle in radians when the rotor is applied on both sides as R * M * ~R
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rotorFromGeneratorAngle(B: Bivector, θ: number): Geometric2 {
        throw new Error(notImplemented('rotorFromGeneratorAngle').message);
    }
    /**
     * R = sqrt(|b|/|a|) * (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     *
     * The result is depends  on the magnitudes of a and b. 
     */
    rotorFromVectorToVector(a: Vector, b: Vector): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().rotorFromVectorToVector(a, b));
        }
        else {
            const ax = a.x;
            const ay = a.y;
            const bx = b.x;
            const by = b.y;
            const mb = Math.sqrt(bx * bx + by * by);
            const ma = Math.sqrt(ax * ax + ay * ay);
            /**
             * s = |b||a|
             */
            const s = mb * ma;
            /**
             * p = b.a or b << a
             */
            const p = bx * ax + by * ay;
            /**
             * q = b ^ a
             */
            const q = bx * ay - by * ax;
            const d = Math.sqrt(2 * s * (s + p));
            const f = Math.sqrt(mb) / (Math.sqrt(ma) * d);

            this.a = f * (s + p);
            this.x = 0;
            this.y = 0;
            this.b = f * q;
            this.uom = Unit.sqrt(Unit.div(b.uom, a.uom));

            return this;
        }
    }

    sqrt(): Geometric2 {
        if (this.isLocked()) {
            return this.clone().sqrt().permlock();
        }
        else {
            this.a = Math.sqrt(this.a);
            this.x = 0;
            this.y = 0;
            this.b = 0;
            this.uom = Unit.sqrt(this.uom);
            return this;
        }
    }

    squaredNorm(): Geometric2 {
        return this.quaditude();
    }

    /**
     * @hidden
     */
    sub2(a: Geometric, b: Geometric): Geometric2 {
        if (isZeroGeometric(a)) {
            this.a = -b.a;
            this.x = -b.x;
            this.y = -b.y;
            this.b = -b.b;
            this.uom = b.uom;
        }
        else if (isZeroGeometric(b)) {
            this.a = a.a;
            this.x = a.x;
            this.y = a.y;
            this.b = a.b;
            this.uom = a.uom;
        }
        else {
            this.a = a.a - b.a;
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.b = a.b - b.b;
            this.uom = Unit.compatible(a.uom, b.uom);
        }
        return this;
    }
    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * Sets this Geometric2 to the geometric product a * b of the vector arguments.
     */
    versor(a: Vector, b: Vector): this {
        this.a = a.x * b.x + a.y * b.y;
        this.x = 0;
        this.y = 0;
        this.b = a.x * b.y - a.y * b.x;
        this.uom = Unit.mul(a.uom, b.uom);
        return this;
    }

    /**
     * Consistently set a coordinate value in the most optimized way.
     * Permits mutation only when the lock status is UNLOCKED.
     * It is safe to use this as an alternative to the named property accessors.
     */
    private setCoordinate(index: number, newValue: number, name: string) {
        if (this.isMutable()) {
            const coords = this.coords_;
            const previous = coords[index];
            if (newValue !== previous) {
                coords[index] = newValue;
            }
        }
        else {
            throw new Error(readOnly(name).message);
        }
    }

    /**
     * The scalar part of this multivector.
     */
    get a(): number {
        return this.coords_[COORD_A];
    }
    set a(a: number) {
        this.setCoordinate(COORD_A, a, 'a');
    }

    /**
     * The pseudoscalar part of this multivector.
     */
    get b(): number {
        return this.coords_[COORD_B];
    }
    set b(b: number) {
        this.setCoordinate(COORD_B, b, 'b');
    }
    get xy(): number {
        return this.coords_[COORD_B];
    }
    set xy(xy: number) {
        this.setCoordinate(COORD_B, xy, 'xy');
    }

    /**
     * A bitmask describing the grades.
     *
     * 0x0 = zero
     * 0x1 = scalar
     * 0x2 = vector
     * 0x4 = bivector
     * 0x8 = pseudoscalar
     */
    get grades(): number {
        const coords = this.coords_;
        const α = coords[COORD_A];
        const x = coords[COORD_X];
        const y = coords[COORD_Y];
        const β = coords[COORD_B];
        let mask = 0x0;
        if (α !== 0) {
            mask += 0x1;
        }
        if (x !== 0 || y !== 0) {
            mask += 0x2;
        }
        if (β !== 0) {
            mask += 0x4;
        }
        return mask;
    }

    /**
     * The coordinate corresponding to the <b>e</b><sub>1</sub> standard basis vector.
     */
    get x(): number {
        return this.coords_[COORD_X];
    }
    set x(x: number) {
        this.setCoordinate(COORD_X, x, 'x');
    }

    /**
     * The coordinate corresponding to the <b>e</b><sub>2</sub> standard basis vector.
     */
    get y(): number {
        return this.coords_[COORD_Y];
    }
    set y(y: number) {
        this.setCoordinate(COORD_Y, y, 'y');
    }

    /**
     * Adds a multivector value to this multivector with optional scaling.
     *
     * @param M The multivector to be added to this multivector.
     * @param α An optional scale factor that multiplies the multivector argument.
     * @returns this + M * α
     */
    add(M: Geometric, α = 1): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().add(M, α));
        }
        else {
            if (this.isZero()) {
                this.a = M.a * α;
                this.x = M.x * α;
                this.y = M.y * α;
                this.b = M.b * α;
                this.uom = M.uom;
                return this;
            }
            else if (isZeroGeometric(M)) {
                // α has no effect because M is zero.
                return this;
            }
            else {
                this.a += M.a * α;
                this.x += M.x * α;
                this.y += M.y * α;
                this.b += M.b * α;
                this.uom = Unit.compatible(this.uom, M.uom);
                return this;
            }
        }
    }

    /**
     * @param v The vector to be added to this multivector.
     * @param α An optional scale factor that multiplies the vector argument.
     * @returns this + v * α
     */
    addVector(v: Vector, α = 1): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().addVector(v, α));
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (isZeroVector(v)) {
                // α has no effect because v is zero.
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.x += v.x * α;
            this.y += v.y * α;
            return this;
        }
    }

    /**
     * @returns copy(this)
     */
    clone(): Geometric2 {
        return Geometric2.copy(this);
    }

    /**
     * <p>
     * <code>this ⟼ copy(M)</code>
     * </p>
     *
     * @param M The multivector to be copied.
     */
    copy(M: Geometric): this {
        this.a = M.a;
        this.x = M.x;
        this.y = M.y;
        this.b = M.b;
        this.uom = M.uom;
        return this;
    }

    /**
     * <p>
     * <code>this ⟼ copy(B)</code>
     * </p>
     *
     * @param B The bivector to be copied.
     */
    copyBivector(B: Bivector): this {
        const b = B.xy;
        this.setCoordinate(COORD_A, 0, 'a');
        this.setCoordinate(COORD_X, 0, 'x');
        this.setCoordinate(COORD_Y, 0, 'y');
        this.setCoordinate(COORD_B, b, 'b');
        this.uom = B.uom;
        return this;
    }

    /**
     * Sets this multivector to the value of the scalar, α.
     * The non-scalar components are set to zero.
     *
     * @param α The scalar to be copied.
     * @param uom The unit of measure.
     */
    copyScalar(α: number, uom: Unit): this {
        this.setCoordinate(COORD_A, α, 'a');
        this.setCoordinate(COORD_X, 0, 'x');
        this.setCoordinate(COORD_Y, 0, 'y');
        this.setCoordinate(COORD_B, 0, 'b');
        this.uom = uom;
        return this;
    }

    /**
     * Copies the vector argument value into this multivector.
     * The non-vector components are set to zero.
     *
     * @param vector The vector to be copied.
     */
    copyVector(vector: Vector): this {
        const x = vector.x;
        const y = vector.y;
        this.setCoordinate(COORD_A, 0, 'a');
        this.setCoordinate(COORD_X, x, 'x');
        this.setCoordinate(COORD_Y, y, 'y');
        this.setCoordinate(COORD_B, 0, 'b');
        this.uom = vector.uom;
        return this;
    }

    /**
     * @returns this / magnitude(this)
     */
    direction(): Geometric2 {
        if (this.isMutable()) {
            const norm: number = this.magnitudeNoUnits();
            if (norm !== 0) {
                this.a = this.a / norm;
                this.x = this.x / norm;
                this.y = this.y / norm;
                this.b = this.b / norm;
            }
            this.uom = void 0;
            return this;
        }
        else {
            return lock(this.clone().direction());
        }
    }

    divByPseudo(β: number, uom?: Unit): Geometric2 {
        if (this.isMutable()) {
            const a = this.a;
            const x = this.x;
            const y = this.y;
            const b = this.b;
            this.a = b / β;
            this.x = y / β;
            this.y = -x / β;
            this.b = -a / β;
            this.uom = Unit.div(this.uom, uom);
            return this;
        }
        else {
            return lock(this.clone().divByPseudo(β, uom));
        }
    }

    /**
     * <p>
     * <code>this ⟼ this / (α * uom)</code>
     * </p>
     *
     * @param a The scalar dividend.
     * @param uom The unit of measure.
     */
    divByScalar(a: number, uom: Unit): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().divByScalar(a, uom));
        }
        else {
            this.uom = Unit.div(this.uom, uom);
            this.a /= a;
            this.x /= a;
            this.y /= a;
            this.b /= a;
            return this;
        }
    }

    /**
     * @param m
     * @returns this ^ m
     */
    ext(m: Geometric): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().ext(m));
        }
        else {
            const La = this.a;
            const Lx = this.x;
            const Ly = this.y;
            const Lb = this.b;
            const Ra = m.a;
            const Rx = m.x;
            const Ry = m.y;
            const Rb = m.b;
            this.a = La * Ra;
            this.x = La * Rx + Lx * Ra;
            this.y = La * Ry + Ly * Ra;
            this.b = La * Rb + Lx * Ry - Ly * Rx + Lb * Ra;
            this.uom = Unit.mul(this.uom, m.uom);
            return this;
        }
    }

    /**
     * Computes the right inverse of this multivector.
     * inv(X) satisfies X * inv(X) = 1.
     * @returns inverse(this)
     */
    inv(): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().inv());
        }
        else {
            const x0 = this.a;
            const x1 = this.x;
            const x2 = this.y;
            const x3 = this.b;

            const A = [
                [+x0, +x1, +x2, -x3],
                [+x1, +x0, -x3, +x2],
                [+x2, +x3, +x0, -x1],
                [+x3, +x2, -x1, +x0]
            ];

            const b = [1, 0, 0, 0];

            const X = gauss(A, b);

            this.a = X[0];
            this.x = X[1];
            this.y = X[2];
            this.b = X[3];

            this.uom = Unit.inv(this.uom);

            return this;
        }
    }

    isBivector(): boolean {
        return this.a === 0 && this.x === 0 && this.y === 0;
    }

    isOne(): boolean {
        if (Unit.isOne(this.uom)) {
            return this.a === 1 && this.x === 0 && this.y === 0 && this.b === 0;
        }
        else {
            return false;
        }
    }

    isScalar(): boolean {
        return isScalar(this);
    }

    isSpinor(): boolean {
        if (Unit.isOne(this.uom)) {
            return this.x === 0 && this.y === 0;
        }
        else {
            return false;
        }
    }

    isVector(): boolean {
        return this.a === 0 && this.b === 0;
    }

    /**
     * Determines whether this multivector is exactly 0 (zero).
     */
    isZero(): boolean {
        // It does not matter what the unit of measure is if all the coordinates are zero.
        return this.a === 0 && this.x === 0 && this.y === 0 && this.b === 0;
    }

    /**
     * <p>
     * Computes the <em>square root</em> of the <em>squared norm</em>.
     * </p>
     */
    magnitude(): Geometric2 {
        if (this.isMutable()) {
            this.a = this.magnitudeNoUnits();
            this.x = 0;
            this.y = 0;
            this.b = 0;
            // The unit of measure is unchanged.
            return this;
        }
        else {
            return lock(this.clone().magnitude());
        }
    }

    /**
     * @hidden
     */
    magnitudeNoUnits(): number {
        return Math.sqrt(this.quaditudeNoUnits());
    }

    /**
     * @param rhs
     * @returns this * m
     */
    mul(rhs: Geometric): Geometric2 {
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
        const La = lhs.a;
        const Lx = lhs.x;
        const Ly = lhs.y;
        const Lb = lhs.b;
        const Ra = rhs.a;
        const Rx = rhs.x;
        const Ry = rhs.y;
        const Rb = rhs.b;
        this.a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
        this.x = La * Rx + Lx * Ra - Ly * Rb + Lb * Ry;
        this.y = La * Ry + Lx * Rb + Ly * Ra - Lb * Rx;
        this.b = La * Rb + Lx * Ry - Ly * Rx + Lb * Ra;
        this.uom = Unit.mul(this.uom, rhs.uom);
        return this;
    }

    mulByBivector(B: Bivector): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().mulByBivector(B));
        }
        else {
            this.uom = Unit.mul(this.uom, B.uom);

            const a = this.a;
            const x = this.x;
            const y = this.y;
            const b = this.b;

            const β = B.xy;

            this.a = - b * β;
            this.x = - y * β;
            this.y = + x * β;
            this.b = a * β;

            return this;
        }
    }

    /**
     * @param α
     * @returns this * α
     */
    mulByNumber(α: number): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().mulByNumber(α));
        }
        else {
            this.a *= α;
            this.x *= α;
            this.y *= α;
            this.b *= α;
            // There is no change in the unit of measure.
            return this;
        }
    }

    /**
     * @param α
     * @param uom
     * @returns this * (α * uom)
     */
    mulByScalar(α: number, uom: Unit): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().mulByScalar(α, uom));
        }
        else {
            this.a *= α;
            this.x *= α;
            this.y *= α;
            this.b *= α;
            this.uom = Unit.mul(this.uom, uom);
            return this;
        }
    }

    mulByVector(v: Vector): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().mulByVector(v));
        }
        else {
            this.uom = Unit.mul(this.uom, v.uom);

            const a0 = this.a;
            const a1 = this.x;
            const a2 = this.y;
            const a4 = this.xy;

            const b1 = v.x;
            const b2 = v.y;

            this.a = a1 * b1 + a2 * b2;
            this.x = a0 * b1 + a4 * b2;
            this.y = a0 * b2 - a4 * b1;
            this.b = a1 * b2 - a2 * b1;

            return this;
        }
    }

    /**
     * @returns this * -1
     */
    neg(): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().neg());
        }
        else {
            this.a = -this.a;
            this.x = -this.x;
            this.y = -this.y;
            this.b = -this.b;
            // There is no change in the unit of measure.
            return this;
        }
    }

    /**
     * @hidden
     * The quad of a multivector is defined in terms of the scalar products
     * of its blades.
     * this ⟼ scp(this, rev(this)) = this | ~this
     */
    quaditude(): Geometric2 {
        if (this.isMutable()) {
            this.a = this.quaditudeNoUnits();
            this.x = 0;
            this.y = 0;
            this.b = 0;
            this.uom = Unit.mul(this.uom, this.uom);
            return this;
        }
        else {
            return lock(this.clone().quaditude());
        }
    }

    /**
     * reverse has a ++-- structure on the grades.
     * The scalar component, a, will not change.
     * The vector components, x and y, will not change.
     * The bivector component, b, will change sign.
     */
    rev(): Geometric2 {
        if (this.isMutable()) {
            // reverse has a ++-- structure on the grades.
            this.a = +this.a;
            this.x = +this.x;
            this.y = +this.y;
            this.b = -this.b;
            // The unit of measure is unchanged.
            return this;
        }
        else {
            return lock(this.clone().rev());
        }
    }

    /**
     * (α + βI)(a + x.e1 + y.e2 + b.I)(α - β.I)
     * 
     * @param spinor the spinor that rotates this multivector.
     * @returns R * this * reverse(R)
     */
    rotate(spinor: Spinor): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().rotate(spinor));
        }
        else {
            // We are assuming that R is dimensionless.
            Unit.assertDimensionless(spinor.uom);
            const a = this.a;
            const x = this.x;
            const y = this.y;
            const b = this.b;
            const α = spinor.a;
            const β = spinor.xy;
            const α2 = α * α;
            const β2 = β * β;
            const p = α2 - β2;
            const q = 2 * α * β;
            const s = α2 + β2;
            this.a = s * a;
            this.x = p * x + q * y;
            this.y = p * y - q * x;
            this.b = s * b;
            return this;
        }
    }

    /**
     * @param m
     * @returns this | m
     */
    scp(m: Geometric): Geometric2 {
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
    scp2(lhs: Geometric, rhs: Geometric): this {
        const La = lhs.a;
        const Lx = lhs.x;
        const Ly = lhs.y;
        const Lb = lhs.b;

        const Ra = rhs.a;
        const Rx = rhs.x;
        const Ry = rhs.y;
        const Rb = rhs.b;

        const a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;

        this.a = a;
        this.x = 0;
        this.y = 0;
        this.b = 0;
        this.uom = Unit.mul(lhs.uom, rhs.uom);

        return this;
    }

    /**
     * @hidden
     */
    quaditudeNoUnits(): number {
        const a = this.a;
        const x = this.x;
        const y = this.y;
        const b = this.b;
        return a * a + x * x + y * y + b * b;
    }

    /**
     * @param M
     * @param α
     * @returns this - M * α
     */
    sub(M: Geometric, α = 1): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().sub(M, α));
        }
        else {
            if (this.isZero()) {
                this.uom = M.uom;
            }
            else if (isZeroGeometric(M)) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, M.uom);
            }
            this.a -= M.a * α;
            this.x -= M.x * α;
            this.y -= M.y * α;
            this.b -= M.b * α;
            return this;
        }
    }

    /**
     * Subtracts a multiple of a scalar from this multivector.
     * @param a The scalar value to be subtracted from this multivector.
     * @param uom The optional unit of measure.
     * @param α The fraction of (a * uom) to be subtracted. Default is 1.
     * @returns this - (a * uom) * α
     */
    subScalar(a: number, uom?: Unit, α = 1): Geometric2 {
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

    /**
     * @param v The vector to subtract from this multivector.
     * @param α The multiplier for the amount of the vector to subtract.
     * @returns this - v * α
     */
    subVector(v: Vector, α = 1): Geometric2 {
        if (this.isLocked()) {
            return lock(this.clone().subVector(v, α));
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (isZeroVector(v)) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.x -= v.x * α;
            this.y -= v.y * α;
            return this;
        }
    }

    /**
     * Returns a string representing the number in exponential notation.
     *
     * @param fractionDigits
     * @returns
     */
    toExponential(fractionDigits?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toExponential(fractionDigits);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }

    /**
     * Returns a string representing the number in fixed-point notation.
     *
     * @param fractionDigits
     * @returns
     */
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

    /**
     * @param precision
     * @returns
     */
    toPrecision(precision?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toPrecision(precision);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }

    /**
     * Returns a string representation of the number.
     *
     * @param radix
     * @returns
     */
    toString(radix?: number): string {
        const coordToString = function (coord: number): string {
            return coord.toString(radix);
        };
        return stringFromCoordinates(coordinates(this), coordToString, BASIS_LABELS, this.uom);
    }

    write(mv: Geometric): void {
        mv.a = this.a;
        mv.x = this.x;
        mv.y = this.y;
        mv.b = this.b;
        mv.uom = this.uom;
    }

    /**
     * Sets this Geometric2 to have the specified cartesian coordinates and unit of measure.
     * 
     * this.a   ⟼ 0,
     * this.x   ⟼ x,
     * this.y   ⟼ y,
     * this.b   ⟼ 0,
     * this.uom ⟼ uom
     * 
     * @param x The cartesian x coordinate corresponding to the e1 basis vector.
     * @param y The cartesian y coordinate corresponding to the e2 basis vector.
     * @param uom The optional unit of measure.
     * @returns this Geometric2.
     * @throws An Error if this Geometric2 is not mutable.
     */
    vectorFromCoords(x: number, y: number, uom?: Unit): this | never {
        const contextBuilder = () => "vectorFromCoords(x: number, y: number, uom?: Unit): this";
        mustBeNumber('x', x, contextBuilder);
        mustBeNumber('y', y, contextBuilder);
        if (this.isMutable()) {
            this.a = 0;
            this.x = x;
            this.y = y;
            this.b = 0;
            this.uom = uom;
            return this;
        }
        else {
            throw new Error("Unable to mutate this locked Geometric2.");
        }
    }

    writeVector(v: Vector): void {
        v.x = this.x;
        v.y = this.y;
        v.uom = this.uom;
    }

    writeBivector(B: Bivector): void {
        B.xy = this.xy;
        B.uom = this.uom;
    }

    /**
     * Sets this multivector to the identity element for addition, 0.
     */
    zero(): this {
        this.a = 0;
        this.x = 0;
        this.y = 0;
        this.b = 0;
        this.uom = void 0;
        return this;
    }
}
