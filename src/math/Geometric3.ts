import { readOnly } from '../i18n/readOnly';
import { AbstractMeasure } from './AbstractMeasure';
import { approx } from './approx';
import { arraysEQ8 } from './arraysEQ';
import { BivectorE3 } from './BivectorE3';
import { dotVectorE3 as dotVector } from './dotVectorE3';
import extG3 from './extG3';
import { gauss } from './gauss';
import { GeometricE3 } from './GeometricE3';
import { GeometricNumber } from './GeometricNumber';
import { GeometricOperators } from './GeometricOperators';
import { GradeMasked } from './GradeMasked';
import isScalarG3 from './isScalarG3';
import isVectorG3 from './isVectorG3';
import { isZeroGeometricE3 } from './isZeroGeometricE3';
import isZeroVectorE3 from './isZeroVectorE3';
import { lcoG3 } from './lcoG3';
import { maskG3 } from './maskG3';
import { MatrixLike } from './MatrixLike';
import { mulE3 } from './mulE3';
import { QQ } from './QQ';
import randomRange from './randomRange';
import rcoG3 from './rcoG3';
import rotorFromDirections from './rotorFromDirectionsE3';
import { Scalar } from './Scalar';
import scpG3 from './scpG3';
import { SpinorE3 as Spinor, SpinorE3 } from './SpinorE3';
import { squaredNormG3 } from './squaredNormG3';
import { stringFromCoordinates } from './stringFromCoordinates';
import { Unit } from './Unit';
import { VectorE3 as Vector, VectorE3 } from './VectorE3';
import { wedgeXY } from './wedgeXY';
import { wedgeYZ } from './wedgeYZ';
import { wedgeZX } from './wedgeZX';

// Symbolic constants for the coordinate indices into the data array.
/**
 * @hidden
 */
const COORD_SCALAR = 0;
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
const COORD_Z = 3;
/**
 * @hidden
 */
const COORD_XY = 4;
/**
 * @hidden
 */
const COORD_YZ = 5;
/**
 * @hidden
 */
const COORD_ZX = 6;
/**
 * @hidden
 */
const COORD_PSEUDO = 7;

/**
 * @hidden
 */
const BASIS_LABELS = ["1", "e1", "e2", "e3", "e12", "e23", "e31", "e123"];
BASIS_LABELS[COORD_SCALAR] = '1';
BASIS_LABELS[COORD_X] = 'e1';
BASIS_LABELS[COORD_Y] = 'e2';
BASIS_LABELS[COORD_Z] = 'e3';

/**
 * @hidden
 */
const BASIS_LABELS_LaTeX = ["1", "e_{1}", "e_{2}", "e_{3}", "e_{12}", "e_{23}", "e_{31}", "e_{123}"];
BASIS_LABELS_LaTeX[COORD_SCALAR] = '1';
BASIS_LABELS_LaTeX[COORD_X] = 'e_{1}';
BASIS_LABELS_LaTeX[COORD_Y] = 'e_{2}';
BASIS_LABELS_LaTeX[COORD_Z] = 'e_{3}';

/**
 * @hidden
 */
const zero = function zero(): [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] {
    return [0, 0, 0, 0, 0, 0, 0, 0];
};

/**
 * @hidden
 */
const scalar = function scalar(a: number): [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] {
    const coords = zero();
    coords[COORD_SCALAR] = a;
    return coords;
};

/**
 * @hidden
 */
const vector = function vector(x: number, y: number, z: number): [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] {
    const coords = zero();
    coords[COORD_X] = x;
    coords[COORD_Y] = y;
    coords[COORD_Z] = z;
    return coords;
};

/**
 * @hidden
 */
const bivector = function bivector(yz: number, zx: number, xy: number): [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] {
    const coords = zero();
    coords[COORD_YZ] = yz;
    coords[COORD_ZX] = zx;
    coords[COORD_XY] = xy;
    return coords;
};

/**
 * @hidden
 */
const spinor = function spinor(a: number, yz: number, zx: number, xy: number): [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] {
    const coords = zero();
    coords[COORD_SCALAR] = a;
    coords[COORD_YZ] = yz;
    coords[COORD_ZX] = zx;
    coords[COORD_XY] = xy;
    return coords;
};

/**
 * @hidden
 */
const multivector = function multivector(a: number, x: number, y: number, z: number, yz: number, zx: number, xy: number, b: number): [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] {
    const coords = zero();
    coords[COORD_SCALAR] = a;
    coords[COORD_X] = x;
    coords[COORD_Y] = y;
    coords[COORD_Z] = z;
    coords[COORD_YZ] = yz;
    coords[COORD_ZX] = zx;
    coords[COORD_XY] = xy;
    coords[COORD_PSEUDO] = b;
    return coords;
};

/**
 * @hidden
 */
const pseudo = function pseudo(b: number): [number, number, number, number, number, number, number, number] {
    const coords = zero();
    coords[COORD_PSEUDO] = b;
    return coords;
};

/**
 * Coordinates corresponding to basis labels.
 * @hidden
 */
const coordinates = function coordinates(m: GeometricE3): [number, number, number, number, number, number, number, number] {
    const coords = zero();
    coords[COORD_SCALAR] = m.a;
    coords[COORD_X] = m.x;
    coords[COORD_Y] = m.y;
    coords[COORD_Z] = m.z;
    coords[COORD_YZ] = m.yz;
    coords[COORD_ZX] = m.zx;
    coords[COORD_XY] = m.xy;
    coords[COORD_PSEUDO] = m.b;
    return coords;
};

/**
 * Computes the cosine of the angle between two vectors.
 * cos(a, b) = (a | b) / |a||b|
 * This is dimensionless, so we are justified in simply returning a number.
 * @hidden
 */
function cosVectorVector(a: VectorE3, b: VectorE3): number {
    function scp(a: VectorE3, b: VectorE3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    function norm(v: VectorE3): number {
        return Math.sqrt(scp(v, v));
    }
    return scp(a, b) / (norm(a) * norm(b));
}

/**
 * Sets the lock on the multivector argument and returns the same argument.
 * This is a convenience function for the dunder (double underscore) methods.
 * All dunder methods should return locked values.
 * @hidden
 */
function lock(m: Geometric3): Geometric3 {
    m.lock();
    return m;
}

/**
 * Scratch variable for holding cosines.
 * @hidden
 */
const cosines: number[] = [];

/**
 * A mutable and lockable multivector in 3D with a Euclidean metric and optional unit of measure.
 */
export class Geometric3 extends AbstractMeasure implements GradeMasked, GeometricE3, GeometricNumber<Geometric3, Geometric3, Spinor, Vector, number>, GeometricOperators<Geometric3> {

    /**
     * 
     */
    private readonly coords_: [number, number, number, number, number, number, number, number];

    /**
     * Constructs a mutable instance of Geometric3 from coordinates and an optional unit of measure.
     * @param coords The 8 coordinates are in the order [a, x, y, z, xy, yz, zx, b]. 
     * @param uom The optional unit of measure.
     */
    constructor(coords: [a: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, b: number] = zero(), uom?: Unit) {
        super(uom);
        if (coords.length !== 8) {
            throw new Error("coords.length must be 8");
        }
        this.coords_ = coords;
    }

    /**
     * @hidden
     */
    __eq__(rhs: Geometric3 | number | Unit): boolean {
        if (rhs instanceof Geometric3) {
            return this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return this.equals(Geometric3.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return this.equals(Geometric3.scalar(1, rhs));
        }
        else {
            return false;
        }
    }

    /**
     * @hidden
     */
    __ne__(rhs: Geometric3 | number | Unit): boolean {
        if (rhs instanceof Geometric3) {
            return !this.equals(rhs);
        }
        else if (typeof rhs === 'number') {
            return !this.equals(Geometric3.scalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return !this.equals(Geometric3.scalar(1, rhs));
        }
        else {
            return true;
        }
    }

    scale(α: number): Geometric3 {
        return this.mulByNumber(α);
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
        return this.coords_[COORD_SCALAR];
    }
    set a(a: number) {
        this.setCoordinate(COORD_SCALAR, a, 'a');
    }

    /**
     * The pseudoscalar part of this multivector.
     */
    get b(): number {
        return this.coords_[COORD_PSEUDO];
    }
    set b(b: number) {
        this.setCoordinate(COORD_PSEUDO, b, 'b');
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
        const α = coords[COORD_SCALAR];
        const x = coords[COORD_X];
        const y = coords[COORD_Y];
        const z = coords[COORD_Z];
        const yz = coords[COORD_YZ];
        const zx = coords[COORD_ZX];
        const xy = coords[COORD_XY];
        const β = coords[COORD_PSEUDO];
        let mask = 0x0;
        if (α !== 0) {
            mask += 0x1;
        }
        if (x !== 0 || y !== 0 || z !== 0) {
            mask += 0x2;
        }
        if (yz !== 0 || zx !== 0 || xy !== 0) {
            mask += 0x4;
        }
        if (β !== 0) {
            mask += 0x8;
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
     * The coordinate corresponding to the <b>e</b><sub>3</sub> standard basis vector.
     */
    get z(): number {
        return this.coords_[COORD_Z];
    }
    set z(z: number) {
        this.setCoordinate(COORD_Z, z, 'z');
    }

    /**
     * The coordinate corresponding to the <b>e</b><sub>2</sub><b>e</b><sub>3</sub> standard basis bivector.
     */
    get yz(): number {
        return this.coords_[COORD_YZ];
    }
    set yz(yz: number) {
        this.setCoordinate(COORD_YZ, yz, 'yz');
    }

    /**
     * The coordinate corresponding to the <b>e</b><sub>3</sub><b>e</b><sub>1</sub> standard basis bivector.
     */
    get zx(): number {
        return this.coords_[COORD_ZX];
    }
    set zx(zx: number) {
        this.setCoordinate(COORD_ZX, zx, 'zx');
    }

    /**
     * The coordinate corresponding to the <b>e</b><sub>1</sub><b>e</b><sub>2</sub> standard basis bivector.
     */
    get xy(): number {
        return this.coords_[COORD_XY];
    }
    set xy(xy: number) {
        this.setCoordinate(COORD_XY, xy, 'xy');
    }

    /**
     * Adds a multivector value to this multivector with optional scaling.
     *
     * @param M The multivector to be added to this multivector.
     * @param α An optional scale factor that multiplies the multivector argument.
     * @returns this + M * α
     */
    add(M: GeometricE3, α = 1): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().add(M, α));
        }
        else {
            if (this.isZero()) {
                this.a = M.a * α;
                this.x = M.x * α;
                this.y = M.y * α;
                this.z = M.z * α;
                this.yz = M.yz * α;
                this.zx = M.zx * α;
                this.xy = M.xy * α;
                this.b = M.b * α;
                this.uom = M.uom;
                return this;
            }
            else if (isZeroGeometricE3(M)) {
                return this;
            }
            else {
                this.a += M.a * α;
                this.x += M.x * α;
                this.y += M.y * α;
                this.z += M.z * α;
                this.yz += M.yz * α;
                this.zx += M.zx * α;
                this.xy += M.xy * α;
                this.b += M.b * α;
                this.uom = Unit.compatible(this.uom, M.uom);
                return this;
            }
        }
    }

    /**
     * @hidden
     */
    add2(a: GeometricE3, b: GeometricE3): this {
        if (isZeroGeometricE3(a)) {
            this.uom = b.uom;
        }
        else if (isZeroGeometricE3(b)) {
            this.uom = a.uom;
        }
        else {
            this.uom = Unit.compatible(a.uom, b.uom);
        }
        this.a = a.a + b.a;
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.yz = a.yz + b.yz;
        this.zx = a.zx + b.zx;
        this.xy = a.xy + b.xy;
        this.b = a.b + b.b;
        return this;
    }

    /**
     * Adds a pseudoscalar value to this multivector.
     *
     * @param β The pseudoscalar value to be added to this multivector.
     * @param uom The optional unit of measure.
     * @returns this + (Iβ * uom)
     */
    addPseudo(β: number, uom?: Unit): Geometric3 {
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
     * Adds a scalar value to this multivector.
     *
     * @param α The scalar value to be added to this multivector.
     * @param uom The optional unit of measure.
     * @returns this + (α * uom)
     */
    addScalar(a: number, uom?: Unit, α = 1): Geometric3 {
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
     * @param v The vector to be added to this multivector.
     * @param α An optional scale factor that multiplies the vector argument.
     * @returns this + v * α
     */
    addVector(v: VectorE3, α = 1): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().addVector(v, α));
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (isZeroVectorE3(v)) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.x += v.x * α;
            this.y += v.y * α;
            this.z += v.z * α;
            return this;
        }
    }

    /**
     * @hidden
     * Pre-multiplies the column vector corresponding to this vector by the matrix.
     * The result is applied to this vector.
     *
     * @param σ The 3x3 matrix that pre-multiplies this column vector.
     */
    applyMatrix(σ: MatrixLike): this {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const yz = this.yz;
        const zx = this.zx;
        const xy = this.xy;

        const n11 = σ.getElement(0, 0), n12 = σ.getElement(0, 1), n13 = σ.getElement(0, 2);
        const n21 = σ.getElement(1, 0), n22 = σ.getElement(1, 1), n23 = σ.getElement(1, 2);
        const n31 = σ.getElement(2, 0), n32 = σ.getElement(2, 1), n33 = σ.getElement(2, 2);

        this.x = n11 * x + n12 * y + n13 * z;
        this.y = n21 * x + n22 * y + n23 * z;
        this.z = n31 * x + n32 * y + n33 * z;
        this.yz = n11 * yz + n12 * zx + n13 * xy;
        this.zx = n21 * yz + n22 * zx + n23 * xy;
        this.xy = n31 * yz + n32 * zx + n33 * xy;

        this.uom = Unit.mul(this.uom, σ.uom);
        return this;
    }

    /**
     * @hidden
     */
    approx(n: number): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().approx(n));
        }
        else {
            approx(this.coords_, n);
            return this;
        }
    }

    /**
     * @returns copy(this)
     */
    clone(): Geometric3 {
        return Geometric3.copy(this);
    }

    /**
     * Clifford conjugation
     */
    conj(): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().conj());
        }
        else {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.yz = -this.yz;
            this.zx = -this.zx;
            this.xy = -this.xy;
            return this;
        }
    }

    /**
     * <p>
     * <code>this ⟼ copy(M)</code>
     * </p>
     *
     * @param M The multivector to be copied.
     */
    copy(M: GeometricE3): this {
        this.a = M.a;
        this.x = M.x;
        this.y = M.y;
        this.z = M.z;
        this.yz = M.yz;
        this.zx = M.zx;
        this.xy = M.xy;
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
    copyBivector(B: BivectorE3): this {
        this.setCoordinate(COORD_SCALAR, 0, 'a');
        this.setCoordinate(COORD_X, 0, 'x');
        this.setCoordinate(COORD_Y, 0, 'y');
        this.setCoordinate(COORD_Z, 0, 'z');
        this.setCoordinate(COORD_YZ, B.yz, 'yz');
        this.setCoordinate(COORD_ZX, B.zx, 'zx');
        this.setCoordinate(COORD_XY, B.xy, 'xy');
        this.setCoordinate(COORD_PSEUDO, 0, 'b');
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
        this.setCoordinate(COORD_SCALAR, α, 'a');
        this.setCoordinate(COORD_X, 0, 'x');
        this.setCoordinate(COORD_Y, 0, 'y');
        this.setCoordinate(COORD_Z, 0, 'z');
        this.setCoordinate(COORD_YZ, 0, 'yz');
        this.setCoordinate(COORD_ZX, 0, 'zx');
        this.setCoordinate(COORD_XY, 0, 'xy');
        this.setCoordinate(COORD_PSEUDO, 0, 'b');
        this.uom = uom;
        return this;
    }

    /**
     * Copies the spinor argument value into this multivector.
     * The non-spinor components are set to zero.
     *
     * @param spinor The spinor to be copied.
     */
    copySpinor(spinor: SpinorE3): this {
        this.setCoordinate(COORD_SCALAR, spinor.a, 'a');
        this.setCoordinate(COORD_X, 0, 'x');
        this.setCoordinate(COORD_Y, 0, 'y');
        this.setCoordinate(COORD_Z, 0, 'z');
        this.setCoordinate(COORD_YZ, spinor.yz, 'yz');
        this.setCoordinate(COORD_ZX, spinor.zx, 'zx');
        this.setCoordinate(COORD_XY, spinor.xy, 'xy');
        this.setCoordinate(COORD_PSEUDO, 0, 'b');
        this.uom = spinor.uom;
        return this;
    }

    /**
     * Copies the vector argument value into this multivector.
     * The non-vector components are set to zero.
     *
     * @param vector The vector to be copied.
     */
    copyVector(vector: VectorE3): this {
        this.setCoordinate(COORD_SCALAR, 0, 'a');
        this.setCoordinate(COORD_X, vector.x, 'x');
        this.setCoordinate(COORD_Y, vector.y, 'y');
        this.setCoordinate(COORD_Z, vector.z, 'z');
        this.setCoordinate(COORD_YZ, 0, 'yz');
        this.setCoordinate(COORD_ZX, 0, 'zx');
        this.setCoordinate(COORD_XY, 0, 'xy');
        this.setCoordinate(COORD_PSEUDO, 0, 'b');
        this.uom = vector.uom;
        return this;
    }

    /**
     * Sets this multivector to the generalized vector cross product with another multivector.
     *
     * @returns -I * (this ^ m)
     */
    cross(m: GeometricE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().cross(m));
        }
        else {
            return this.ext(m).dual();
        }
    }

    /**
     * @returns this / magnitude(this)
     */
    direction(): Geometric3 {
        if (this.isMutable()) {
            const norm: number = this.magnitudeNoUnits();
            if (norm !== 0) {
                this.a = this.a / norm;
                this.x = this.x / norm;
                this.y = this.y / norm;
                this.z = this.z / norm;
                this.yz = this.yz / norm;
                this.zx = this.zx / norm;
                this.xy = this.xy / norm;
                this.b = this.b / norm;
            }
            this.uom = void 0;
            return this;
        }
        else {
            return lock(this.clone().direction());
        }
    }

    /**
     * @param m The multivector dividend.
     * @returns this / m;
     */
    div(m: GeometricE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().div(m));
        }
        else {
            if (isScalarG3(m)) {
                this.divByScalar(m.a, m.uom);
                return this;
            }
            else if (isVectorG3(m)) {
                return this.divByVector(m);
            }
            else {
                this.uom = Unit.div(this.uom, m.uom);

                const α = m.a;
                const x = m.x;
                const y = m.y;
                const z = m.z;
                const xy = m.xy;
                const yz = m.yz;
                const zx = m.zx;
                const β = m.b;

                const A = [
                    [α, x, y, z, -xy, -yz, -zx, -β],
                    [x, α, xy, -zx, -y, -β, z, -yz],
                    [y, -xy, α, yz, x, -z, -β, -zx],
                    [z, zx, -yz, α, -β, y, -x, -xy],
                    [xy, -y, x, β, α, zx, -yz, z],
                    [yz, β, -z, y, -zx, α, xy, x],
                    [zx, z, β, -x, yz, -xy, α, y],
                    [β, yz, zx, xy, z, x, y, α]
                ];

                const b = [1, 0, 0, 0, 0, 0, 0, 0];

                const X = gauss(A, b);

                const a0 = this.a;
                const a1 = this.x;
                const a2 = this.y;
                const a3 = this.z;
                const a4 = this.xy;
                const a5 = this.yz;
                const a6 = this.zx;
                const a7 = this.b;

                const b0 = X[0];
                const b1 = X[1];
                const b2 = X[2];
                const b3 = X[3];
                const b4 = X[4];
                const b5 = X[5];
                const b6 = X[6];
                const b7 = X[7];

                const c0 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 0);
                const c1 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 1);
                const c2 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 2);
                const c3 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 3);
                const c4 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 4);
                const c5 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 5);
                const c6 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 6);
                const c7 = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 7);

                this.a = c0;
                this.x = c1;
                this.y = c2;
                this.z = c3;
                this.xy = c4;
                this.yz = c5;
                this.zx = c6;
                this.b = c7;
            }
            return this;
        }
    }

    /**
     * @hidden
     */
    divByNumber(α: number): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().divByNumber(α));
        }
        else {
            this.a /= α;
            this.x /= α;
            this.y /= α;
            this.z /= α;
            this.yz /= α;
            this.zx /= α;
            this.xy /= α;
            this.b /= α;
            return this;
        }
    }

    /**
     * <p>
     * <code>this ⟼ this / (a * uom)</code>
     * </p>
     *
     * @param a The scalar dividend.
     * @param uom The unit of measure.
     */
    divByScalar(a: number, uom?: Unit): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().divByScalar(a, uom));
        }
        else {
            this.uom = Unit.div(this.uom, uom);
            this.a /= a;
            this.x /= a;
            this.y /= a;
            this.z /= a;
            this.yz /= a;
            this.zx /= a;
            this.xy /= a;
            this.b /= a;
            return this;
        }
    }

    divByVector(v: VectorE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().divByVector(v));
        }
        else {
            const x = v.x;
            const y = v.y;
            const z = v.z;
            return this.mulByVector(v).divByScalar(x * x + y * y + z * z, Unit.pow(v.uom, QQ.valueOf(2, 1)));
        }
    }

    /**
     * @hidden
     */
    div2(a: SpinorE3, b: SpinorE3): this {
        this.uom = Unit.div(a.uom, b.uom);
        // FIXME: Generalize
        const a0 = a.a;
        const a1 = a.yz;
        const a2 = a.zx;
        const a3 = a.xy;
        const b0 = b.a;
        const b1 = b.yz;
        const b2 = b.zx;
        const b3 = b.xy;
        // Compare this to the product for Quaternions
        // It would be interesting to DRY this out.
        this.a = a0 * b0 - a1 * b1 - a2 * b2 - a3 * b3;
        // this.a = a0 * b0 - dotVectorCartesianE3(a1, a2, a3, b1, b2, b3)
        this.yz = a0 * b1 + a1 * b0 - a2 * b3 + a3 * b2;
        this.zx = a0 * b2 + a1 * b3 + a2 * b0 - a3 * b1;
        this.xy = a0 * b3 - a1 * b2 + a2 * b1 + a3 * b0;
        return this;
    }

    /**
     * dualization: dual(Ak) = Ak << inv(I)
     * 
     * In an n-dimensional Euclidean space, the inverse is the reverse.
     */
    dual(): Geometric3 {
        if (this.isLocked()) {
            return this.clone().dual().permlock();
        }
        else {
            const a = this.b;
            const x = this.yz;
            const y = this.zx;
            const z = this.xy;
            const yz = -this.x;
            const zx = -this.y;
            const xy = -this.z;
            const b = -this.a;

            this.a = a;
            this.x = x;
            this.y = y;
            this.z = z;
            this.yz = yz;
            this.zx = zx;
            this.xy = xy;
            this.b = b;
            return this;
        }
    }

    /**
     * @param other
     * @returns
     */
    equals(other: unknown): boolean {
        if (other === this) {
            return true;
        }
        else if (other instanceof Geometric3) {
            return arraysEQ8(this.coords_, other.coords_) && Unit.isCompatible(this.uom, other.uom);
        }
        else {
            return false;
        }
    }

    /**
     * Computes the inverse of this multivector. 
     * @returns inverse(this)
     */
    inv(): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().inv());
        }
        else {
            const x0 = this.a;
            const x1 = this.x;
            const x2 = this.y;
            const x3 = this.z;
            const x4 = this.xy;
            const x5 = this.yz;
            const x6 = this.zx;
            const x7 = this.b;

            const A = [
                [+x0, +x1, +x2, +x3, -x4, -x5, -x6, -x7],
                [+x1, +x0, -x4, +x6, +x2, -x7, -x3, -x5],
                [+x2, +x4, +x0, -x5, -x1, +x3, -x7, -x6],
                [+x3, -x6, +x5, +x0, -x7, -x2, +x1, -x4],
                [+x4, +x2, -x1, +x7, +x0, -x6, +x5, +x3],
                [+x5, +x7, +x3, -x2, +x6, +x0, -x4, +x1],
                [+x6, -x3, +x7, +x1, -x5, +x4, +x0, +x2],
                [+x7, +x5, +x6, +x4, +x3, +x1, +x2, +x0]
            ];

            const b = [1, 0, 0, 0, 0, 0, 0, 0];

            const X = gauss(A, b);

            this.a = X[0];
            this.x = X[1];
            this.y = X[2];
            this.z = X[3];
            this.xy = X[4];
            this.yz = X[5];
            this.zx = X[6];
            this.b = X[7];

            this.uom = Unit.inv(this.uom);

            return this;
        }
    }

    isBivector(): boolean {
        return this.a === 0 && this.x === 0 && this.y === 0 && this.z === 0 && this.b === 0;
    }

    /**
     * Determines whether this multivector is exactly 1 (one).
     */
    isOne(): boolean {
        if (Unit.isOne(this.uom)) {
            return this.a === 1 && this.x === 0 && this.y === 0 && this.z === 0 && this.yz === 0 && this.zx === 0 && this.xy === 0 && this.b === 0;
        }
        else {
            return false;
        }
    }

    isScalar(): boolean {
        return this.x === 0 && this.y === 0 && this.z === 0 && this.xy === 0 && this.yz === 0 && this.zx === 0 && this.b === 0;
    }

    isSpinor(): boolean {
        if (Unit.isOne(this.uom)) {
            return this.x === 0 && this.y === 0 && this.z === 0 && this.b === 0;
        }
        else {
            return false;
        }
    }

    isVector(): boolean {
        return this.a === 0 && this.xy === 0 && this.yz === 0 && this.zx === 0 && this.b === 0;
    }

    /**
     * Determines whether this multivector is exactly 0 (zero).
     */
    isZero(): boolean {
        // It does not matter what the unit of measure is if all the coordinates are zero.
        return this.a === 0 && this.x === 0 && this.y === 0 && this.z === 0 && this.yz === 0 && this.zx === 0 && this.xy === 0 && this.b === 0;
    }

    /**
     * @param m
     * @returns this << m
     */
    lco(m: GeometricE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().lco(m));
        }
        else {
            return this.lco2(this, m);
        }
    }

    /**
     * @hidden
     */
    lco2(a: GeometricE3, b: GeometricE3): this {
        return lcoG3(a, b, this);
    }

    /**
     * <p>
     * Computes the <em>square root</em> of the <em>squared norm</em>.
     * </p>
     */
    magnitude(): Geometric3 {
        if (this.isMutable()) {
            this.a = Math.sqrt(this.quaditudeNoUnits());
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.xy = 0;
            this.yz = 0;
            this.zx = 0;
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
     * Returns the geometric product of this multivector with the rhs multivector.
     * @param rhs The operand on the right hand side of the * operator.
     * @return this * rhs
     */
    mul(rhs: GeometricE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().mul(rhs));
        }
        else {
            return this.mul2(this, rhs);
        }
    }

    public mulByBivector(B: BivectorE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().mulByBivector(B));
        }
        else {
            this.uom = Unit.mul(this.uom, B.uom);

            const a0 = this.a;
            const a1 = this.x;
            const a2 = this.y;
            const a3 = this.z;
            const a4 = this.xy;
            const a5 = this.yz;
            const a6 = this.zx;
            const a7 = this.b;

            const b4 = B.xy;
            const b5 = B.yz;
            const b6 = B.zx;

            this.a = - a4 * b4 - a5 * b5 - a6 * b6;
            this.x = - a2 * b4 + a3 * b6 - a7 * b5;
            this.y = + a1 * b4 - a3 * b5 - a7 * b6;
            this.z = - a1 * b6 + a2 * b5 - a7 * b4;
            this.xy = a0 * b4 - a5 * b6 + a6 * b5;
            this.yz = a0 * b5 + a4 * b6 - a6 * b4;
            this.zx = a0 * b6 - a4 * b5 + a5 * b4;
            this.b = + a1 * b5 + a2 * b6 + a3 * b4;

            return this;
        }
    }

    public mulByVector(v: VectorE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().mulByVector(v));
        }
        else {
            this.uom = Unit.mul(this.uom, v.uom);

            const a0 = this.a;
            const a1 = this.x;
            const a2 = this.y;
            const a3 = this.z;
            const a4 = this.xy;
            const a5 = this.yz;
            const a6 = this.zx;
            const a7 = this.b;

            const b1 = v.x;
            const b2 = v.y;
            const b3 = v.z;

            this.a = a1 * b1 + a2 * b2 + a3 * b3;
            this.x = a0 * b1 + a4 * b2 - a6 * b3;
            this.y = a0 * b2 - a4 * b1 + a5 * b3;
            this.z = a0 * b3 - a5 * b2 + a6 * b1;
            this.xy = a1 * b2 - a2 * b1 + a7 * b3;
            this.yz = a2 * b3 - a3 * b2 + a7 * b1;
            this.zx = - a1 * b3 + a3 * b1 + a7 * b2;
            this.b = a4 * b3 + a5 * b1 + a6 * b2;

            return this;
        }
    }

    /**
     * @hidden
     */
    mul2(a: GeometricE3, b: GeometricE3): this {
        if (this.isLocked()) {
            throw new Error("TODO");
        }
        const a0 = a.a;
        const a1 = a.x;
        const a2 = a.y;
        const a3 = a.z;
        const a4 = a.xy;
        const a5 = a.yz;
        const a6 = a.zx;
        const a7 = a.b;

        const b0 = b.a;
        const b1 = b.x;
        const b2 = b.y;
        const b3 = b.z;
        const b4 = b.xy;
        const b5 = b.yz;
        const b6 = b.zx;
        const b7 = b.b;

        this.a = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 0);
        this.x = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 1);
        this.y = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 2);
        this.z = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 3);
        this.xy = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 4);
        this.yz = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 5);
        this.zx = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 6);
        this.b = mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 7);

        this.uom = Unit.mul(a.uom, b.uom);

        return this;
    }

    /**
     * @returns this * -1
     */
    neg(): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().neg());
        }
        else {
            this.a = -this.a;
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.yz = -this.yz;
            this.zx = -this.zx;
            this.xy = -this.xy;
            this.b = -this.b;
            // There is no change in the unit of measure.
            return this;
        }
    }

    /**
     * Sets this multivector to the identity element for multiplication, <b>1</b>.
     */
    one(): this {
        this.a = 1;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.yz = 0;
        this.zx = 0;
        this.xy = 0;
        this.b = 0;
        this.uom = void 0;
        return this;
    }

    /**
     * @hidden
     * The quaditude of a multivector is defined in terms of the scalar products
     * of its blades.
     * this ⟼ scp(this, rev(this)) = this | ~this
     */
    quaditude(): Geometric3 {
        if (this.isMutable()) {
            this.a = this.quaditudeNoUnits();
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.yz = 0;
            this.zx = 0;
            this.xy = 0;
            this.b = 0;
            this.uom = Unit.mul(this.uom, this.uom);
            return this;
        }
        else {
            return lock(this.clone().quaditude());
        }
    }

    /**
     * @param m
     * @returns this >> m
     */
    rco(m: GeometricE3): Geometric3 {
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
    rco2(a: GeometricE3, b: GeometricE3): this {
        return rcoG3(a, b, this);
    }

    /**
     * Computes the <em>squared norm</em> of this multivector.
     *
     * This is an alias for the `quaditude` method.
     */
    squaredNorm(): Geometric3 {
        return this.quaditude();
    }

    /**
     * @hidden
     */
    quaditudeNoUnits(): number {
        return squaredNormG3(this);
    }

    /**
     * Sets this multivector to its reflection in the plane orthogonal to vector n.
     *
     * Mathematically,
     *
     * this ⟼ - n * this * n
     *
     * Geometrically,
     *
     * Reflects this multivector in the plane orthogonal to the unit vector, n.
     *
     * If n is not a unit vector then the result is scaled by n squared.
     *
     * @param n The unit vector that defines the reflection plane.
     */
    reflect(n: VectorE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().reflect(n));
        }
        else {
            // We are assuming that n is dimensionless, so that our unit of measure does not change.
            Unit.assertDimensionless(n.uom);
            const n1 = n.x;
            const n2 = n.y;
            const n3 = n.z;
            const n11 = n1 * n1;
            const n22 = n2 * n2;
            const n33 = n3 * n3;
            const nn = n11 + n22 + n33;
            const f1 = 2 * n2 * n3;
            const f2 = 2 * n3 * n1;
            const f3 = 2 * n1 * n2;
            const t1 = n22 + n33 - n11;
            const t2 = n33 + n11 - n22;
            const t3 = n11 + n22 - n33;
            const cs = this.coords_;
            const a = cs[COORD_SCALAR];
            const x1 = cs[COORD_X];
            const x2 = cs[COORD_Y];
            const x3 = cs[COORD_Z];
            const B3 = cs[COORD_XY];
            const B1 = cs[COORD_YZ];
            const B2 = cs[COORD_ZX];
            const b = cs[COORD_PSEUDO];
            this.setCoordinate(COORD_SCALAR, -nn * a, 'a');
            this.setCoordinate(COORD_X, x1 * t1 - x2 * f3 - x3 * f2, 'x');
            this.setCoordinate(COORD_Y, x2 * t2 - x3 * f1 - x1 * f3, 'y');
            this.setCoordinate(COORD_Z, x3 * t3 - x1 * f2 - x2 * f1, 'z');
            this.setCoordinate(COORD_XY, B3 * t3 - B1 * f2 - B2 * f1, 'xy');
            this.setCoordinate(COORD_YZ, B1 * t1 - B2 * f3 - B3 * f2, 'yz');
            this.setCoordinate(COORD_ZX, B2 * t2 - B3 * f1 - B1 * f3, 'zx');
            this.setCoordinate(COORD_PSEUDO, -nn * b, 'b');
            return this;
        }
    }

    /**
     * @returns reverse(this)
     */
    rev(): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().rev());
        }
        else {
            // reverse has a ++-- structure on the grades.
            this.a = +this.a;
            this.x = +this.x;
            this.y = +this.y;
            this.z = +this.z;
            this.yz = -this.yz;
            this.zx = -this.zx;
            this.xy = -this.xy;
            this.b = -this.b;
            // The unit of measure is unchanged.
            return this;
        }
    }

    /**
     * @param R the spinor that rotates this multivector.
     * @returns R * this * reverse(R)
     */
    rotate(R: SpinorE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().rotate(R));
        }
        else {
            // We are assuming that R is dimensionless.
            Unit.assertDimensionless(R.uom);
            // FIXME: This only rotates the vector components.
            if (R.a === 1 && R.xy === 0 && R.yz === 0 && R.zx === 0) {
                return this;
            }
            else {
                const x = this.x;
                const y = this.y;
                const z = this.z;
                const yz = this.yz;
                const zx = this.zx;
                const xy = this.xy;

                const Rxy = R.xy;
                const Ryz = R.yz;
                const Rzx = R.zx;
                const Ra = R.a;

                const ix = Ra * x - Rzx * z + Rxy * y;
                const iy = Ra * y - Rxy * x + Ryz * z;
                const iz = Ra * z - Ryz * y + Rzx * x;
                const iα = Ryz * x + Rzx * y + Rxy * z;
                const Syz = Ra * yz - Rzx * xy + Rxy * zx;
                const Szx = Ra * zx - Rxy * yz + Ryz * xy;
                const Sxy = Ra * xy - Ryz * zx + Rzx * yz;
                const Sa = Ryz * yz + Rzx * zx + Rxy * xy;

                this.x = ix * Ra + iα * Ryz + iy * Rxy - iz * Rzx;
                this.y = iy * Ra + iα * Rzx + iz * Ryz - ix * Rxy;
                this.z = iz * Ra + iα * Rxy + ix * Rzx - iy * Ryz;
                this.yz = Syz * Ra + Sa * Ryz + Szx * Rxy - Sxy * Rzx;
                this.zx = Szx * Ra + Sa * Rzx + Sxy * Ryz - Syz * Rxy;
                this.xy = Sxy * Ra + Sa * Rxy + Syz * Rzx - Szx * Ryz;

                return this;
            }
        }
    }

    /**
     * Sets this multivector to a rotor that rotates through angle θ around the specified axis.
     *
     * @param axis The (unit) vector defining the rotation aspect and orientation.
     * @param θ The rotation angle in radians when the rotor is applied on both sides as R * M * ~R
     */
    rotorFromAxisAngle(axis: VectorE3, θ: number): this {
        Unit.assertDimensionless(axis.uom);
        // Compute the dual of the axis to obtain the corresponding bivector.
        const x = axis.x;
        const y = axis.y;
        const z = axis.z;
        const squaredNorm = x * x + y * y + z * z;
        if (squaredNorm === 1) {
            return this.rotorFromGeneratorAngle({ yz: x, zx: y, xy: z, uom: void 0 }, θ);
        }
        else {
            const norm = Math.sqrt(squaredNorm);
            const yz = x / norm;
            const zx = y / norm;
            const xy = z / norm;
            return this.rotorFromGeneratorAngle({ yz, zx, xy, uom: void 0 }, θ);
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
    rotorFromDirections(a: VectorE3, b: VectorE3): this {
        const B: BivectorE3 = void 0;
        return this.rotorFromVectorToVector(a, b, B);
    }

    /**
     * Helper function for rotorFromFrameToFrame.
     */
    private rotorFromTwoVectors(e1: VectorE3, f1: VectorE3, e2: VectorE3, f2: VectorE3): this {
        // FIXME: This creates a lot of temporary objects.
        // Compute the rotor that takes e1 to f1.
        // There is no concern that the two vectors are anti-parallel.
        const R1 = Geometric3.rotorFromDirections(e1, f1);
        // Compute the image of e2 under the first rotation in order to calculate R2.
        const f = Geometric3.fromVector(e2).rotate(R1);
        // In case of rotation for antipodal vectors, define the fallback rotation bivector.
        const B = Geometric3.dualOfVector(f1);
        // Compute R2
        const R2 = Geometric3.rotorFromVectorToVector(f, f2, B);
        // The total rotor, R, is the composition of R1 followed by R2.
        return this.mul2(R2, R1);
    }

    /**
     * 
     */
    rotorFromFrameToFrame(es: VectorE3[], fs: VectorE3[]): this {
        // There is instability when the rotation angle is near 180 degrees.
        // So we don't use the lovely formula based upon reciprocal frames.
        // Our algorithm is to first pick the vector that stays most aligned with itself.
        // This allows for the possibility that the other two vectors may become anti-aligned.
        // Observe that all three vectors can't be anti-aligned because that would be a reflection!
        // We then compute the rotor R1 that maps this first vector to its image.
        // Allowing then for the possibility that the remaining vectors may have ambiguous rotors,
        // we compute the dual of this image vector as the default rotation plane for one of the
        // other vectors. We only need to calculate the rotor R2 for one more vector because our
        // frames are orthogonal and so R1 and R2 determine R.
        //
        let biggestValue = -1;
        let firstVector: number;
        for (let i = 0; i < 3; i++) {
            cosines[i] = cosVectorVector(es[i], fs[i]);
            if (cosines[i] > biggestValue) {
                firstVector = i;
                biggestValue = cosines[i];
            }
        }
        const secondVector = (firstVector + 1) % 3;
        return this.rotorFromTwoVectors(es[firstVector], fs[firstVector], es[secondVector], fs[secondVector]);
    }

    /**
     * Sets this multivector to a rotor that rotates through angle θ in the oriented plane defined by B.
     *
     * @param B The (unit) bivector generating the rotation.
     * @param θ The rotation angle in radians when the rotor is applied on both sides as R * M * ~R
     */
    rotorFromGeneratorAngle(B: BivectorE3, θ: number): this {
        Unit.assertDimensionless(B.uom);
        const φ = θ / 2;
        const yz = B.yz;
        const zx = B.zx;
        const xy = B.xy;
        const absB = Math.sqrt(yz * yz + zx * zx + xy * xy);
        const mφ = absB * φ;
        const sinDivAbsB = Math.sin(mφ) / absB;

        this.a = Math.cos(mφ);
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.yz = -yz * sinDivAbsB;
        this.zx = -zx * sinDivAbsB;
        this.xy = -xy * sinDivAbsB;
        this.b = 0;
        return this;
    }

    /**
     * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     *
     * The result is independent of the magnitudes of a and b. 
     */
    rotorFromVectorToVector(a: VectorE3, b: VectorE3, B: BivectorE3): this {
        rotorFromDirections(a, b, B, this);
        return this;
    }

    /**
     * @param m
     * @returns this | m
     */
    scp(m: GeometricE3): Geometric3 {
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
    scp2(a: GeometricE3, b: GeometricE3): this {
        return scpG3(a, b, this);
    }

    /**
     * Currently limited to taking the square root of a positive scalar quantity.
     */
    sqrt(): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().sqrt());
        }
        else {
            this.a = Math.sqrt(this.a);
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.yz = 0;
            this.zx = 0;
            this.xy = 0;
            this.b = 0;
            this.uom = Unit.sqrt(this.uom);
            return this;
        }
    }

    /**
     * @hidden
     */
    mulByNumber(α: number): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().mulByNumber(α));
        }
        else {
            this.a *= α;
            this.x *= α;
            this.y *= α;
            this.z *= α;
            this.yz *= α;
            this.zx *= α;
            this.xy *= α;
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
    mulByScalar(α: number, uom?: Unit): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().mulByScalar(α, uom));
        }
        else {
            this.a *= α;
            this.x *= α;
            this.y *= α;
            this.z *= α;
            this.yz *= α;
            this.zx *= α;
            this.xy *= α;
            this.b *= α;
            this.uom = Unit.mul(this.uom, uom);
            return this;
        }
    }

    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * Sets this Geometric3 to the geometric product a * b of the vector arguments.
     *
     * @param a
     * @param b
     */
    versor(a: VectorE3, b: VectorE3): this {
        this.uom = Unit.mul(a.uom, b.uom);

        const ax = a.x;
        const ay = a.y;
        const az = a.z;
        const bx = b.x;
        const by = b.y;
        const bz = b.z;

        this.zero();
        this.a = dotVector(a, b);
        this.yz = wedgeYZ(ax, ay, az, bx, by, bz);
        this.zx = wedgeZX(ax, ay, az, bx, by, bz);
        this.xy = wedgeXY(ax, ay, az, bx, by, bz);

        return this;
    }

    write(mv: GeometricE3): void {
        mv.a = this.a;
        mv.x = this.x;
        mv.y = this.y;
        mv.z = this.z;
        mv.xy = this.xy;
        mv.yz = this.yz;
        mv.zx = this.zx;
        mv.b = this.b;
        mv.uom = this.uom;
    }

    writeVector(v: VectorE3): void {
        v.x = this.x;
        v.y = this.y;
        v.z = this.z;
        v.uom = this.uom;
    }

    writeBivector(B: BivectorE3): void {
        B.xy = this.xy;
        B.yz = this.yz;
        B.zx = this.zx;
        B.uom = this.uom;
    }

    /**
     * @param M
     * @param α
     * @returns this - M * α
     */
    sub(M: GeometricE3, α = 1): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().sub(M, α));
        }
        else {
            if (this.isZero()) {
                this.uom = M.uom;
            }
            else if (isZeroGeometricE3(M)) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, M.uom);
            }
            this.a -= M.a * α;
            this.x -= M.x * α;
            this.y -= M.y * α;
            this.z -= M.z * α;
            this.yz -= M.yz * α;
            this.zx -= M.zx * α;
            this.xy -= M.xy * α;
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
    subScalar(a: number, uom?: Unit, α = 1): Geometric3 {
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
     * @hidden
     * @param v The vector to subtract from this multivector.
     * @param α The multiplier for the amount of the vector to subtract.
     * @returns this - v * α
     */
    subVector(v: VectorE3, α = 1): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().subVector(v, α));
        }
        else {
            if (this.isZero()) {
                this.uom = v.uom;
            }
            else if (isZeroVectorE3(v)) {
                return this;
            }
            else {
                this.uom = Unit.compatible(this.uom, v.uom);
            }
            this.x -= v.x * α;
            this.y -= v.y * α;
            this.z -= v.z * α;
            return this;
        }
    }

    /**
     * @hidden
     */
    sub2(a: GeometricE3, b: GeometricE3): this {
        if (isZeroGeometricE3(a)) {
            this.a = -b.a;
            this.x = -b.x;
            this.y = -b.y;
            this.z = -b.z;
            this.yz = -b.yz;
            this.zx = -b.zx;
            this.xy = -b.xy;
            this.b = -b.b;
            this.uom = b.uom;
        }
        else if (isZeroGeometricE3(b)) {
            this.a = a.a;
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            this.yz = a.yz;
            this.zx = a.zx;
            this.xy = a.xy;
            this.b = a.b;
            this.uom = a.uom;
        }
        else {
            this.a = a.a - b.a;
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            this.yz = a.yz - b.yz;
            this.zx = a.zx - b.zx;
            this.xy = a.xy - b.xy;
            this.b = a.b - b.b;
            this.uom = Unit.compatible(a.uom, b.uom);
        }
        return this;
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

    /**
     * Sets this multivector to the result of keeping only the specified grade.
     * This is the grade extraction operation.
     * 
     * @param n the grade to be retained.
     * @returns grade(this, n)
     */
    grade(n: number): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().grade(n));
        }
        else {
            // There is no change to the unit of measure.
            switch (n) {
                case 0: {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.yz = 0;
                    this.zx = 0;
                    this.xy = 0;
                    this.b = 0;
                    break;
                }
                case 1: {
                    this.a = 0;
                    this.yz = 0;
                    this.zx = 0;
                    this.xy = 0;
                    this.b = 0;
                    break;
                }
                case 2: {
                    this.a = 0;
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.b = 0;
                    break;
                }
                case 3: {
                    this.a = 0;
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.yz = 0;
                    this.zx = 0;
                    this.xy = 0;
                    break;
                }
                default: {
                    this.a = 0;
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.yz = 0;
                    this.zx = 0;
                    this.xy = 0;
                    this.b = 0;
                }
            }
            return this;
        }
    }

    /**
     * @param m
     * @return this ^ m
     */
    ext(m: GeometricE3): Geometric3 {
        if (this.isLocked()) {
            return lock(this.clone().ext(m));
        }
        else {
            return this.ext2(this, m);
        }
    }

    /**
     * @hidden
     */
    ext2(a: GeometricE3, b: GeometricE3): this {
        return extG3(a, b, this);
    }

    /**
     * Sets this multivector to the identity element for addition, 0.
     */
    zero(): this {
        this.a = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.yz = 0;
        this.zx = 0;
        this.xy = 0;
        this.b = 0;
        // The unit of measure does not matter if all the coordinates are zero.
        return this;
    }

    /**
     * @hidden
     */
    __add__(rhs: Geometric3 | number | Unit): Geometric3 {
        if (rhs instanceof Geometric3) {
            return lock(this.clone().add(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(this.clone().addScalar(rhs));
        }
        else if (rhs instanceof Unit) {
            return lock(this.clone().addScalar(1, rhs));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __div__(rhs: number | Geometric3) {
        const duckR = maskG3(rhs);
        if (duckR) {
            return lock(this.clone().div(duckR));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rdiv__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).div(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.scalar(lhs, void 0).div(this));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __mul__(rhs: number | Geometric3) {
        const duckR = maskG3(rhs);
        if (duckR) {
            return lock(this.clone().mul(duckR));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rmul__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).mul(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.copy(this).mulByNumber(lhs));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __radd__(lhs: Geometric3 | number | Unit) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).add(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.scalar(lhs).add(this));
        }
        else if (lhs instanceof Unit) {
            return Geometric3.scalar(1, lhs).add(this).permlock();
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __sub__(rhs: number | Geometric3) {
        const duckR = maskG3(rhs);
        if (duckR) {
            return lock(this.clone().sub(duckR));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rsub__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).sub(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.scalar(lhs).sub(this));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __tilde__(): Geometric3 {
        return lock(Geometric3.copy(this).rev());
    }

    /**
     * @hidden
     */
    __wedge__(rhs: number | Geometric3) {
        if (rhs instanceof Geometric3) {
            return lock(Geometric3.copy(this).ext(rhs));
        }
        else if (typeof rhs === 'number') {
            // The outer product with a scalar is scalar multiplication.
            return lock(Geometric3.copy(this).mulByNumber(rhs));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rwedge__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).ext(this));
        }
        else if (typeof lhs === 'number') {
            // The outer product with a scalar is scalar multiplication, and commutes.
            return lock(Geometric3.copy(this).mulByNumber(lhs));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __lshift__(rhs: number | Geometric3) {
        if (rhs instanceof Geometric3) {
            return lock(Geometric3.copy(this).lco(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(Geometric3.copy(this).lco(Geometric3.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rlshift__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).lco(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.scalar(lhs).lco(this));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rshift__(rhs: number | Geometric3) {
        if (rhs instanceof Geometric3) {
            return lock(Geometric3.copy(this).rco(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(Geometric3.copy(this).rco(Geometric3.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rrshift__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).rco(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.scalar(lhs).rco(this));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __vbar__(rhs: number | Geometric3) {
        if (rhs instanceof Geometric3) {
            return lock(Geometric3.copy(this).scp(rhs));
        }
        else if (typeof rhs === 'number') {
            return lock(Geometric3.copy(this).scp(Geometric3.scalar(rhs)));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __rvbar__(lhs: number | Geometric3) {
        if (lhs instanceof Geometric3) {
            return lock(Geometric3.copy(lhs).scp(this));
        }
        else if (typeof lhs === 'number') {
            return lock(Geometric3.scalar(lhs).scp(this));
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     */
    __bang__(): Geometric3 {
        return lock(Geometric3.copy(this).inv());
    }

    /**
     * @hidden
     */
    __pos__(): Geometric3 {
        return lock(Geometric3.copy(this));
    }

    /**
     * @hidden
     */
    __neg__(): Geometric3 {
        return lock(Geometric3.copy(this).neg());
    }

    /**
     * Constructs a Geometric3 representing the number zero.
     * The identity element for addition, <b>0</b>.
     * The returned multivector is locked.
     */
    public static readonly zero = lock(new Geometric3(zero(), void 0));

    /**
     * Constructs a Geometric3 representing the number one.
     * The identity element for multiplication, <b>1</b>.
     * The returned multivector is locked.
     */
    public static readonly one = lock(new Geometric3(scalar(1), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>x</code> coordinate.
     * The returned multivector is locked.
     */
    public static readonly e1 = lock(new Geometric3(vector(1, 0, 0), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>y</code> coordinate.
     * The returned multivector is locked.
     */
    public static readonly e2 = lock(new Geometric3(vector(0, 1, 0), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>z</code> coordinate.
     * The returned multivector is locked.
     */
    public static readonly e3 = lock(new Geometric3(vector(0, 0, 1), void 0));

    /**
     * Constructs a basis vector corresponding to the <code>β</code> coordinate.
     * The returned multivector is locked.
     */
    public static readonly I = lock(new Geometric3(pseudo(1), void 0));

    /**
     * SI base unit of length.
     * The meter is the length of the path travelled by light in vacuum during a time interval of 1 / 299 792 458 of a second.
     */
    public static readonly meter = lock(new Geometric3(scalar(1), Unit.METER));

    /**
     * SI base unit of mass.
     * The kilogram is the unit of mass; it is equal to the mass of the international prototype of the kilogram.
     */
    public static readonly kilogram = lock(new Geometric3(scalar(1), Unit.KILOGRAM));

    /**
     * SI base unit of time.
     * The second is the duration of 9 192 631 770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium 133 atom.
     */
    public static readonly second = lock(new Geometric3(scalar(1), Unit.SECOND));

    /**
     * SI base unit of electric current.
     * The ampere is that constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, and placed 1 meter apart in vacuum, would produce between these conductors a force equal to 2 x 10<sup>-7</sup> newton per meter of length.
     */
    public static readonly ampere = lock(new Geometric3(scalar(1), Unit.AMPERE));

    /**
     * SI base unit of thermodynamic temperature.
     * The kelvin, unit of thermodynamic temperature, is the fraction 1 / 273.16 of the thermodynamic temperature of the triple point of water.
     */
    public static readonly kelvin = lock(new Geometric3(scalar(1), Unit.KELVIN));

    /**
     * SI base unit of amount of substance.
     * 1. The mole is the amount of substance of a system which contains as many elementary entities as there are atoms in 0.012 kilogram of carbon 12; its symbol is "mol."
     * 
     * 2. When the mole is used, the elementary entities must be specified and may be atoms, molecules, ions, electrons, other particles, or specified groups of such particles.
     */
    public static readonly mole = lock(new Geometric3(scalar(1), Unit.MOLE));

    /**
     * SI base unit of luminous intensity.
     * The candela is the luminous intensity, in a given direction, of a source that emits monochromatic radiation of frequency 540 x 10<sup>12</sup> hertz and that has a radiant intensity in that direction of 1 / 683 watt per steradian.
     */
    public static readonly candela = lock(new Geometric3(scalar(1), Unit.CANDELA));

    /**
     * SI derived unit of electric charge, quantity of electricity.
     */
    public static readonly coulomb = lock(new Geometric3(scalar(1), Unit.COULOMB));

    /**
     * SI derived unit of force.
     */
    public static readonly newton = lock(new Geometric3(scalar(1), Unit.NEWTON));

    /**
     * SI derived unit of energy, work, quantity of heat.
     */
    public static readonly joule = lock(new Geometric3(scalar(1), Unit.JOULE));

    /**
     * Creates a grade 2 (bivector) multivector from the specified cartesian coordinates.
     * The bivector returned is in the unlocked (mutable) state.
     * @param yz The coordinate corresponding to the e2e3 basis bivector.
     * @param zx The coordinate corresponding to the e3e1 basis bivector.
     * @param xy The coordinate corresponding to the e1e2 basis bivector.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static bivector(yz: number, zx: number, xy: number, uom?: Unit): Geometric3 {
        return Geometric3.spinor(0, yz, zx, xy, uom);
    }

    /**
     * @param mv The multivector to be copied.
     */
    static copy(mv: GeometricE3): Geometric3 {
        return new Geometric3(coordinates(mv), mv.uom);
    }

    static dual(m: Geometric3): Geometric3 {
        return Geometric3.copy(m).dual();
    }

    static dualOfBivector(B: BivectorE3): Geometric3 {
        return new Geometric3(vector(-B.yz, -B.zx, -B.xy), B.uom);
    }

    static dualOfVector(v: VectorE3): Geometric3 {
        return new Geometric3(bivector(v.x, v.y, v.z), v.uom);
    }

    static fromBivector(B: BivectorE3): Geometric3 {
        return new Geometric3(bivector(B.yz, B.zx, B.xy), B.uom);
    }

    /**
     * @param alpha
     */
    static fromScalar(alpha: Scalar): Geometric3 {
        return new Geometric3(scalar(alpha.a), alpha.uom);
    }

    /**
     * @param s
     */
    static fromSpinor(R: SpinorE3): Geometric3 {
        return new Geometric3(spinor(R.a, R.yz, R.zx, R.xy), R.uom);
    }

    /**
     * @param v
     * @returns
     */
    static fromVector(v: VectorE3): Geometric3 {
        return new Geometric3(vector(v.x, v.y, v.z), v.uom);
    }

    static pseudo(b: number, uom?: Unit): Geometric3 {
        return new Geometric3(pseudo(b), uom);
    }

    /**
     * <p>
     * Computes a multivector with random components.
     * </p>
     */
    static random() {
        const lowerBound = -1;
        const upperBound = +1;
        const a = randomRange(lowerBound, upperBound);
        const x = randomRange(lowerBound, upperBound);
        const y = randomRange(lowerBound, upperBound);
        const z = randomRange(lowerBound, upperBound);
        const yz = randomRange(lowerBound, upperBound);
        const zx = randomRange(lowerBound, upperBound);
        const xy = randomRange(lowerBound, upperBound);
        const b = randomRange(lowerBound, upperBound);
        return new Geometric3(multivector(a, x, y, z, yz, zx, xy, b), void 0);
    }

    /**
     * Computes the rotor that rotates vector <code>a</code> to vector <code>b</code>.
     *
     * @param a The <em>from</em> vector.
     * @param b The <em>to</em> vector.
     */
    static rotorFromDirections(a: VectorE3, b: VectorE3): Geometric3 {
        return new Geometric3(zero(), void 0).rotorFromDirections(a, b);
    }

    static rotorFromFrameToFrame(es: VectorE3[], fs: VectorE3[]): Geometric3 {
        return new Geometric3(zero(), void 0).rotorFromFrameToFrame(es, fs);
    }

    static rotorFromVectorToVector(a: VectorE3, b: VectorE3, B: BivectorE3): Geometric3 {
        return new Geometric3(zero(), void 0).rotorFromVectorToVector(a, b, B);
    }

    /**
     * Creates a grade 0 (scalar) multivector with value `alpha * uom`.
     * The scalar returned is in the unlocked (mutable) state.
     * @param a The scaling factor for the unit of measure.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static scalar(a: number, uom?: Unit): Geometric3 {
        return new Geometric3(scalar(a), uom);
    }

    /**
     * Creates a spinor valued multivector from the specified cartesian coordinates.
     * The spinor returned is in the unlocked (mutable) state.
     * @param a The scalar coordinate.
     * @param yz The coordinate corresponding to the e2e3 basis bivector.
     * @param zx The coordinate corresponding to the e3e1 basis bivector.
     * @param xy The coordinate corresponding to the e1e2 basis bivector.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static spinor(a: number, yz: number, zx: number, xy: number, uom?: Unit): Geometric3 {
        return new Geometric3(spinor(a, yz, zx, xy), uom);
    }

    /**
     * Creates a grade 1 (vector) multivector from the specified cartesian coordinates.
     * @param x The coordinate corresponding to the e1 basis vector.
     * @param y The coordinate corresponding to the e2 basis vector.
     * @param z The coordinate corresponding to the e3 basis vector.
     * @param uom The optional unit of measure. Equivalent to 1 if omitted.
     */
    static vector(x: number, y: number, z: number, uom?: Unit): Geometric3 {
        return new Geometric3(vector(x, y, z), uom);
    }

    /**
     * @param a
     * @param b
     */
    static wedge(a: Geometric3, b: Geometric3): Geometric3 {

        const ax = a.x;
        const ay = a.y;
        const az = a.z;
        const bx = b.x;
        const by = b.y;
        const bz = b.z;

        const yz = wedgeYZ(ax, ay, az, bx, by, bz);
        const zx = wedgeZX(ax, ay, az, bx, by, bz);
        const xy = wedgeXY(ax, ay, az, bx, by, bz);

        return Geometric3.spinor(0, yz, zx, xy, Unit.mul(a.uom, b.uom));
    }
}
