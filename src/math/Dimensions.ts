import { QQ } from './QQ';
import detectDimensions from './detectDimensions';
import { DimensionsSummary } from './DimensionsSummary';

const entries: Dimensions[] = [];

/**
 * @hidden
 */
const R0 = QQ.valueOf(0, 1);
/**
 * @hidden
 */
const R1 = QQ.valueOf(1, 1);
/**
 * @hidden
 */
const R2 = QQ.valueOf(2, 1);
/**
 * @hidden
 */
const R3 = QQ.valueOf(3, 1);
/**
 * @hidden
 */
const M1 = QQ.valueOf(-1, 1);
/**
 * @hidden
 */
const M2 = QQ.valueOf(-2, 1);

/**
 * @hidden
 * @param name 
 * @param arg 
 * @returns 
 */
function assertArgRational(name: string, arg: QQ): QQ {
    if (arg instanceof QQ) {
        return arg;
    }
    else {
        throw new Error(`Argument ${name} => ${arg} must be a QQ`);
    }
}

/**
 * The type of the argument os the `setDimensionsChecking` function.
 */
export type DimensionsChecking = 'none' | 'strict';

/**
 * @hidden
 */
let dimsChecking: DimensionsChecking = 'strict';

/**
 * @param mode 
 */
export function setDimensionsChecking(mode: DimensionsChecking): void {
    switch (mode) {
        case 'strict':
        case 'none': {
            dimsChecking = mode;
            break;
        }
        default: {
            throw new Error(`mode must be 'none' or 'strict'.`);
        }
    }
}

/**
 * @hidden 
 */
export function getDimensionsChecking(): DimensionsChecking {
    return dimsChecking;
}

/**
 * Keeps track of the dimensions of a physical quantity using seven rational exponents.
 * Each of the exponents corresponds to a dimension in the S.I. system of units.
 */
export class Dimensions {

    /**
     * All exponents are zero, a dimensionless quantity.
     */
    public static readonly ONE = new Dimensions(R0, R0, R0, R0, R0, R0, R0, DimensionsSummary.ONE);

    /**
     * M<sup>1</sup>
     */
    public static readonly MASS = new Dimensions(R1, R0, R0, R0, R0, R0, R0, DimensionsSummary.MASS);

    /**
     * L<sup>1</sup>
     */
    public static readonly LENGTH = new Dimensions(R0, R1, R0, R0, R0, R0, R0, DimensionsSummary.LENGTH);
    /**
     * L<sup>2</sup>
     */
    public static readonly AREA = new Dimensions(R0, R2, R0, R0, R0, R0, R0, DimensionsSummary.AREA);
    /**
     * L<sup>3</sup>
     */
    public static readonly VOLUME = new Dimensions(R0, R3, R0, R0, R0, R0, R0, DimensionsSummary.VOLUME);
    /**
     * Inverse Length.
     */
    public static readonly INV_LENGTH = new Dimensions(R0, M1, R0, R0, R0, R0, R0, DimensionsSummary.INV_LENGTH);

    /**
     * T<sup>1</sup>
     */
    public static readonly TIME = new Dimensions(R0, R0, R1, R0, R0, R0, R0, DimensionsSummary.TIME);

    /**
     * Q<sup>1</sup>
     */
    public static readonly ELECTRIC_CHARGE = new Dimensions(R0, R0, R0, R1, R0, R0, R0, DimensionsSummary.ELECTRIC_CHARGE);

    /**
     * Q<sup>1</sup>T<sup>-1<sup>
     */
    public static readonly ELECTRIC_CURRENT = new Dimensions(R0, R0, M1, R1, R0, R0, R0, DimensionsSummary.ELECTRIC_CURRENT);

    /**
     *
     */
    public static readonly THERMODYNAMIC_TEMPERATURE = new Dimensions(R0, R0, R0, R0, R1, R0, R0, DimensionsSummary.THERMODYNAMIC_TEMPERATURE);

    /**
     *
     */
    public static readonly AMOUNT_OF_SUBSTANCE = new Dimensions(R0, R0, R0, R0, R0, R1, R0, DimensionsSummary.AMOUNT_OF_SUBSTANCE);

    /**
     *
     */
    public static readonly LUMINOUS_INTENSITY = new Dimensions(R0, R0, R0, R0, R0, R0, R1, DimensionsSummary.LUMINOUS_INTENSITY);

    /**
     * Angular Momentum.
     */
    public static readonly ANGULAR_MOMENTUM = new Dimensions(R1, R2, M1, R0, R0, R0, R0, DimensionsSummary.ANGULAR_MOMENTUM);

    /**
     * Rate of change of Area.
     */
    public static readonly RATE_OF_CHANGE_OF_AREA = new Dimensions(R0, R2, M1, R0, R0, R0, R0, DimensionsSummary.RATE_OF_CHANGE_OF_AREA);

    /**
     * Electric Field.
     */
    public static readonly ELECTRIC_FIELD = new Dimensions(R1, R1, M2, M1, R0, R0, R0, DimensionsSummary.ELECTRIC_FIELD);

    /**
     * Electric Permittivity times Area.
     */
    public static readonly ELECTRIC_PERMITTIVITY_TIMES_AREA = new Dimensions(M1, M1, R2, R2, R0, R0, R0, DimensionsSummary.ELECTRIC_PERMITTIVITY_TIMES_AREA);

    /**
     * Energy or Torque.
     */
    public static readonly ENERGY_OR_TORQUE = new Dimensions(R1, R2, M2, R0, R0, R0, R0, DimensionsSummary.ENERGY_OR_TORQUE);

    /**
     * Force.
     */
    public static readonly FORCE = new Dimensions(R1, R1, M2, R0, R0, R0, R0, DimensionsSummary.FORCE);

    /**
     * Inverse Mass.
     */
    public static readonly INV_MASS = new Dimensions(M1, R0, R0, R0, R0, R0, R0, DimensionsSummary.INV_MASS);

    /**
     * Inverse Moment of Inertia.
     */
    public static readonly INV_MOMENT_OF_INERTIA = new Dimensions(M1, M2, R0, R0, R0, R0, R0, DimensionsSummary.INV_MOMENT_OF_INERTIA);

    /**
     * Inverse Time.
     */
    public static readonly INV_TIME = new Dimensions(R0, R0, M1, R0, R0, R0, R0, DimensionsSummary.INV_TIME);

    /**
     * Moment of Inertia.
     */
    public static readonly MOMENT_OF_INERTIA = new Dimensions(R1, R2, R0, R0, R0, R0, R0, DimensionsSummary.MOMENT_OF_INERTIA);

    /**
     * Momentum.
     */
    public static readonly MOMENTUM = new Dimensions(R1, R1, M1, R0, R0, R0, R0, DimensionsSummary.MOMENTUM);

    /**
     * Momentum squared.
     */
    public static readonly MOMENTUM_SQUARED = new Dimensions(R2, R2, M2, R0, R0, R0, R0, DimensionsSummary.MOMENTUM_SQUARED);

    /**
     * Stiffness.
     */
    public static readonly STIFFNESS = new Dimensions(R1, R0, M2, R0, R0, R0, R0, DimensionsSummary.STIFFNESS);

    /**
     * Friction.
     */
    public static readonly FRICTION_COEFFICIENT = new Dimensions(R1, R0, M1, R0, R0, R0, R0, DimensionsSummary.FRICTION_COEFFICIENT);

    /**
     * Time squared.
     */
    public static readonly TIME_SQUARED = new Dimensions(R0, R0, R2, R0, R0, R0, R0, DimensionsSummary.TIME_SQUARED);

    /**
     * Velocity
     */
    public static readonly VELOCITY = new Dimensions(R0, R1, M1, R0, R0, R0, R0, DimensionsSummary.VELOCITY);

    /**
     * Velocity squared
     */
    public static readonly VELOCITY_SQUARED = new Dimensions(R0, R2, M2, R0, R0, R0, R0, DimensionsSummary.VELOCITY_SQUARED);

    /**
     * The exponent of the mass dimension.
     */
    public readonly M: QQ;
    /**
     * The exponent of the length dimension.
     */
    public readonly L: QQ;
    /**
     * The exponent of the time dimension.
     */
    public readonly T: QQ;
    /**
     * The exponent of the electric charge dimension.
     */
    public readonly Q: QQ;
    /**
     * The exponent of the temperature dimension.
     */
    public readonly temperature: QQ;
    /**
     * The exponent of the amount dimension.
     */
    public readonly amount: QQ;
    /**
     * The exponent of the intensity dimension.
     */
    public readonly intensity: QQ;

    private readonly summary_: DimensionsSummary;

    /**
     * The Dimensions class captures the physical dimensions associated with a unit of measure.
     *
     * @param M The mass component of the dimensions object.
     * @param L The length component of the dimensions object.
     * @param T The time component of the dimensions object.
     * @param Q The charge component of the dimensions object.
     * @param temperature The temperature component of the dimensions object.
     * @param amount The amount component of the dimensions object.
     * @param intensity The intensity component of the dimensions object.
     */
    private constructor(M: QQ, L: QQ, T: QQ, Q: QQ, temperature: QQ, amount: QQ, intensity: QQ, summary: DimensionsSummary) {
        this.M = assertArgRational('M', M);
        this.L = assertArgRational('L', L);
        this.T = assertArgRational('T', T);
        this.Q = assertArgRational('Q', Q);
        this.temperature = assertArgRational('temperature', temperature);
        this.amount = assertArgRational('amount', amount);
        this.intensity = assertArgRational('intensity', intensity);
        this.summary_ = summary;
    }

    public get summary(): number {
        return this.summary_;
    }

    /**
     * Returns the dimensions if they are all equal, otherwise throws an <code>Error</code>
     */
    compatible(rhs: Dimensions): Dimensions {
        if (typeof this.summary_ === 'number' && this.summary_ === rhs.summary_) {
            return this;
        }
        else if (this.M.equals(rhs.M) && this.L.equals(rhs.L) && this.T.equals(rhs.T) && this.Q.equals(rhs.Q) && this.temperature.equals(rhs.temperature) && this.amount.equals(rhs.amount) && this.intensity.equals(rhs.intensity)) {
            return this;
        }
        else {
            if (this.isOne()) {
                if (rhs.isOne()) {
                    throw new Error();
                }
                else {
                    const msg = `Dimensions must be equal (dimensionless, ${rhs})`;
                    switch (dimsChecking) {
                        case 'none': {
                            return rhs;
                        }
                        default: {
                            throw new Error(msg);
                        }
                    }
                }
            }
            else {
                if (rhs.isOne()) {
                    const msg = `Dimensions must be equal (${this}, dimensionless)`;
                    switch (dimsChecking) {
                        case 'none': {
                            return this;
                        }
                        default: {
                            throw new Error(msg);
                        }
                    }
                }
                else {
                    const msg = `Dimensions must be equal (${this}, ${rhs})`;
                    switch (dimsChecking) {
                        case 'none': {
                            return this;
                        }
                        default: {
                            throw new Error(msg);
                        }
                    }
                }
            }
        }
    }

    equals(rhs: Dimensions): boolean {
        if (this === rhs) {
            return true;
        }
        else {
            return this.M.equals(rhs.M) && this.L.equals(rhs.L) && this.T.equals(rhs.T) && this.Q.equals(rhs.Q) && this.temperature.equals(rhs.temperature) && this.amount.equals(rhs.amount) && this.intensity.equals(rhs.intensity);
        }
    }

    /**
     * Multiplies dimensions by adding rational exponents.
     *
     * @param rhs
     * @returns <code>this * rhs</code>
     */
    mul(rhs: Dimensions): Dimensions {
        return Dimensions.valueOf(this.M.add(rhs.M), this.L.add(rhs.L), this.T.add(rhs.T), this.Q.add(rhs.Q), this.temperature.add(rhs.temperature), this.amount.add(rhs.amount), this.intensity.add(rhs.intensity));
    }

    /**
     * Divides dimensions by subtracting rational exponents.
     *
     * @param rhs
     * @returns <code>this / rhs</code>
     */
    div(rhs: Dimensions): Dimensions {
        return Dimensions.valueOf(this.M.sub(rhs.M), this.L.sub(rhs.L), this.T.sub(rhs.T), this.Q.sub(rhs.Q), this.temperature.sub(rhs.temperature), this.amount.sub(rhs.amount), this.intensity.sub(rhs.intensity));
    }

    /**
     * Computes the power function by multiplying rational exponents.
     *
     * @param rhs
     * @returns <code>pow(this, rhs)</code>
     */
    pow(exponent: QQ): Dimensions {
        return Dimensions.valueOf(this.M.mul(exponent), this.L.mul(exponent), this.T.mul(exponent), this.Q.mul(exponent), this.temperature.mul(exponent), this.amount.mul(exponent), this.intensity.mul(exponent));
    }

    /**
     * Computes the square root by dividing each rational component by two.
     *
     * @returns
     */
    sqrt(): Dimensions {
        return Dimensions.valueOf(this.M.div(R2), this.L.div(R2), this.T.div(R2), this.Q.div(R2), this.temperature.div(R2), this.amount.div(R2), this.intensity.div(R2));
    }

    /**
     * Determines whether all the exponents of this dimensions number are zero.
     * This implies a dimensionless quantity. 
     *
     * @returns <code>true</code> if all the exponents are zero, otherwise <code>false</code>.
     */
    isOne(): boolean {
        if (this === Dimensions.ONE) {
            return true;
        }
        else {
            return this.M.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        }
    }

    /**
     * Computes the multiplicative inverse of this dimensions number.
     * This is achived by changing the signs of all the exponent quantities.
     *
     * @returns The multiplicative inverse of this dimensions number.
     */
    inv(): Dimensions {
        return Dimensions.valueOf(this.M.neg(), this.L.neg(), this.T.neg(), this.Q.neg(), this.temperature.neg(), this.amount.neg(), this.intensity.neg());
    }

    /**
     * Creates a representation of this <code>Dimensions</code> instance.
     *
     * @returns
     */
    toString(): string {
        const stringify = function (rational: QQ, label: string): string {
            if (rational.numer === 0) {
                return null;
            }
            else if (rational.denom === 1) {
                if (rational.numer === 1) {
                    return "" + label;
                }
                else {
                    return "" + label + " ** " + rational.numer;
                }
            }
            return "" + label + " ** " + rational;
        };

        return [stringify(this.M, 'mass'), stringify(this.L, 'length'), stringify(this.T, 'time'), stringify(this.Q, 'charge'), stringify(this.temperature, 'thermodynamic temperature'), stringify(this.amount, 'amount of substance'), stringify(this.intensity, 'luminous intensity')].filter(function (x) {
            return typeof x === 'string';
        }).join(" * ");
    }

    /**
     * @hidden
     * @returns this + rhs
     */
    __add__(rhs: Dimensions): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.compatible(rhs);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @returns lhs + this
     */
    __radd__(lhs: Dimensions): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.compatible(this);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @param rhs
     * @returns
     */
    __sub__(rhs: Dimensions): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.compatible(rhs);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @param lhs
     * @returns
     */
    __rsub__(lhs: Dimensions): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.compatible(this);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @param rhs
     * @returns
     */
    __mul__(rhs: Dimensions): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.mul(rhs);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @param lhs
     * @returns
     */
    __rmul__(lhs: Dimensions): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.mul(this);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @param rhs
     * @returns
     */
    __div__(rhs: Dimensions): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.div(rhs);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @param lhs
     * @returns
     */
    __rdiv__(lhs: Dimensions): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.div(this);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @returns
     */
    __pos__(): Dimensions {
        return this;
    }

    /**
     * @hidden
     * @returns
     */
    __neg__(): Dimensions {
        return this;
    }

    /**
     * Constructor function for Dimensions.
     * @param M The mass component of the dimensions object.
     * @param L The length component of the dimensions object.
     * @param T The time component of the dimensions object.
     * @param Q The charge component of the dimensions object.
     * @param temperature The temperature component of the dimensions object.
     * @param amount The amount component of the dimensions object.
     * @param intensity The intensity component of the dimensions object.
     */
    public static valueOf(M: QQ, L: QQ, T: QQ, Q: QQ, temperature: QQ, amount: QQ, intensity: QQ) {
        // This function is optimized to minimize the need for object creation.
        const summary = detectDimensions(M, L, T, Q, temperature, amount, intensity);
        switch (summary) {
            case DimensionsSummary.AMOUNT_OF_SUBSTANCE: return Dimensions.AMOUNT_OF_SUBSTANCE;
            case DimensionsSummary.ANGULAR_MOMENTUM: return Dimensions.ANGULAR_MOMENTUM;
            case DimensionsSummary.AREA: return Dimensions.AREA;
            case DimensionsSummary.ELECTRIC_CHARGE: return Dimensions.ELECTRIC_CHARGE;
            case DimensionsSummary.ELECTRIC_CURRENT: return Dimensions.ELECTRIC_CURRENT;
            case DimensionsSummary.ELECTRIC_FIELD: return Dimensions.ELECTRIC_FIELD;
            case DimensionsSummary.ELECTRIC_PERMITTIVITY_TIMES_AREA: return Dimensions.ELECTRIC_PERMITTIVITY_TIMES_AREA;
            case DimensionsSummary.ENERGY_OR_TORQUE: return Dimensions.ENERGY_OR_TORQUE;
            case DimensionsSummary.FORCE: return Dimensions.FORCE;
            case DimensionsSummary.LUMINOUS_INTENSITY: return Dimensions.LUMINOUS_INTENSITY;
            case DimensionsSummary.INV_LENGTH: return Dimensions.INV_LENGTH;
            case DimensionsSummary.INV_MASS: return Dimensions.INV_MASS;
            case DimensionsSummary.INV_MOMENT_OF_INERTIA: return Dimensions.INV_MOMENT_OF_INERTIA;
            case DimensionsSummary.INV_TIME: return Dimensions.INV_TIME;
            case DimensionsSummary.LENGTH: return Dimensions.LENGTH;
            case DimensionsSummary.MASS: return Dimensions.MASS;
            case DimensionsSummary.MOMENT_OF_INERTIA: return Dimensions.MOMENT_OF_INERTIA;
            case DimensionsSummary.MOMENTUM: return Dimensions.MOMENTUM;
            case DimensionsSummary.MOMENTUM_SQUARED: return Dimensions.MOMENTUM_SQUARED;
            case DimensionsSummary.ONE: return Dimensions.ONE;
            case DimensionsSummary.RATE_OF_CHANGE_OF_AREA: return Dimensions.RATE_OF_CHANGE_OF_AREA;
            case DimensionsSummary.STIFFNESS: return Dimensions.STIFFNESS;
            case DimensionsSummary.THERMODYNAMIC_TEMPERATURE: return Dimensions.THERMODYNAMIC_TEMPERATURE;
            case DimensionsSummary.TIME: return Dimensions.TIME;
            case DimensionsSummary.TIME_SQUARED: return Dimensions.TIME_SQUARED;
            case DimensionsSummary.VELOCITY: return Dimensions.VELOCITY;
            case DimensionsSummary.VELOCITY_SQUARED: return Dimensions.VELOCITY_SQUARED;
            case DimensionsSummary.VOLUME: return Dimensions.VOLUME;
            default: {
                // console.warn(`Dimensions.valueOf(M=${M}, L=${L}, T=${T}, Q=${Q}, temperature=${temperature}, amount=${amount}, intensity=${intensity}) is not cached.`);
                for (const entry of entries) {
                    if (entry.M.equals(M) && entry.L.equals(L) && entry.T.equals(T) && entry.Q.equals(Q) && entry.temperature.equals(temperature) && entry.amount.equals(amount) && entry.intensity.equals(intensity)) {
                        return entry;
                    }
                }
                const value = new Dimensions(M, L, T, Q, temperature, amount, intensity, summary);
                entries.push(value);
                // console.warn(`Dimensions cache size = ${entries.length}`);
                return value;
            }
        }
    }
}
