import isUndefined from '../checks/isUndefined';
import { Dimensions } from './Dimensions';
import { DimensionsSummary } from './DimensionsSummary';
import { QQ } from './QQ';

const entries: Unit[] = [];

// const NAMES_SI = ['kilogram', 'meter', 'second', 'coulomb', 'kelvin', 'mole', 'candela'];
/**
 * @hidden
 */
const SYMBOLS_SI = ['kg', 'm', 's', 'C', 'K', 'mol', 'cd'];

/**
 * The numerator, denominator values for each dimension (M, L, T, Q, temperature, amount, intensity).
 * @hidden
 */
const patterns =
    [
        [-1, 1, -3, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1],  // F/m or C**2/N·m**2
        [-1, 1, -2, 1, 1, 1, 2, 1, 0, 1, 0, 1, 0, 1],  // S or A/V
        [-1, 1, -2, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1],  // F or C/V
        [-1, 1, -1, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1],  // C**2/N
        [-1, 1, +0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],  // C/kg
        [-1, 1, +3, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1], // N·m·m/kg·kg (Gravitational Constant G)
        [+0, 1, -3, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],  // C/m**3
        [+0, 1, -2, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],  // C/m**2
        [+0, 1, -1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],  // C/m
        [+0, 1, 2, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],  // J/kg
        [+0, 1, 0, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],  // Hz
        [+0, 1, 0, 1, -1, 1, 1, 1, 0, 1, 0, 1, 0, 1],  // A
        [0, 1, 1, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // m/s**2
        [0, 1, 1, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // m/s
        [1, 1, 1, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // kg·m/s
        [1, 1, -1, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],  // Pa or N/m**2 or J/m**3
        [1, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],  // Pa·s
        [1, 1, 0, 1, -3, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // W/m**2
        [1, 1, 0, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // N/m
        [1, 1, 0, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 1],  // T or Wb/m**2
        [1, 1, 1, 1, -3, 1, 0, 1, -1, 1, 0, 1, 0, 1],  // W/(m·K)
        [1, 1, 1, 1, -2, 1, -1, 1, 0, 1, 0, 1, 0, 1],  // V/m or N/C
        [1, 1, 1, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // N
        [1, 1, 1, 1, 0, 1, -2, 1, 0, 1, 0, 1, 0, 1],   // H/m
        [1, 1, 2, 1, -2, 1, 0, 1, -1, 1, 0, 1, 0, 1],  // J/K
        [0, 1, 2, 1, -2, 1, 0, 1, -1, 1, 0, 1, 0, 1],  // J/(kg·K)
        [1, 1, 2, 1, -2, 1, 0, 1, -1, 1, -1, 1, 0, 1], // J/(mol·K)
        [1, 1, 2, 1, -2, 1, 0, 1, 0, 1, -1, 1, 0, 1],  // J/(mol)
        [1, 1, 2, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // J or N·m
        [1, 1, 2, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // J·s
        [1, 1, 2, 1, -3, 1, 0, 1, 0, 1, 0, 1, 0, 1],   // W or J/s
        [1, 1, 2, 1, -2, 1, -1, 1, 0, 1, 0, 1, 0, 1],  // V or W/A
        [1, 1, 2, 1, -1, 1, -2, 1, 0, 1, 0, 1, 0, 1],  // Ω or V/A
        [1, 1, 2, 1, 0, 1, -2, 1, 0, 1, 0, 1, 0, 1],   // H or Wb/A
        [1, 1, 2, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 1],  // Wb
        [1, 1, 3, 1, -2, 1, -2, 1, 0, 1, 0, 1, 0, 1]   // N·m**2/C**2
    ];

/**
 * The string literals for the patterns.
 * The convention is to write the unit compactly (without whitespace).
 * TODO: Would be nice to separate...
 * Name (same as the variable name)
 * Symbol
 * Expression in terms of other SI units
 * Expression in terms of SI base units.
 * @hidden
 */
const decodes =
    [
        ["F/m or C**2/N·m**2"],
        ["S or A/V"],
        ["F or C/V"],
        ["C**2/N"],
        ["C/kg"],
        ["N·m·m/kg·kg"],
        ["C/m**3"],
        ["C/m**2"],
        ["C/m"],
        ["J/kg"],
        ["Hz"],
        ["A"],
        ["m/s**2"],
        ["m/s"],
        ["kg·m/s"],
        ["Pa or N/m**2 or J/m**3"],
        ["Pa·s"],
        ["W/m**2"],
        ["N/m"],
        ["T or Wb/m**2"],
        ["W/(m·K)"],
        ["V/m or N/C"],
        ["N"],
        ["H/m"],
        ["J/K"],
        ["J/(kg·K)"],
        ["J/(mol·K)"],
        ["J/mol"],
        ["J or N·m"],
        ["J·s"],
        ["W or J/s"],
        ["V or W/A"],
        ["Ω or V/A"],
        ["H or Wb/A"],
        ["Wb"],
        ["N·m**2/C**2"]
    ];

/**
 * @hidden
 * @param multiplier 
 * @param formatted 
 * @param dimensions 
 * @param labels 
 * @param compact 
 * @returns 
 */
const dumbString = function (multiplier: number, formatted: string, dimensions: Dimensions, labels: string[], compact?: boolean) {
    const stringify = function (rational: QQ, label: string): string | null {
        if (rational.numer === 0) {
            return null;
        }
        else if (rational.denom === 1) {
            if (rational.numer === 1) {
                if (compact) {
                    return label;
                }
                else {
                    return label;
                }
            }
            else {
                return `${label}**${rational.numer}`;
            }
        }
        else {
            return `${label}**${rational}`;
        }
    };

    const operatorStr = multiplier === 1 || dimensions.isOne() ? (compact ? "" : " ") : " ";
    const scaleString = multiplier === 1 ? (compact ? "" : formatted) : formatted;
    const unitsString = [stringify(dimensions.M, labels[0]), stringify(dimensions.L, labels[1]), stringify(dimensions.T, labels[2]), stringify(dimensions.Q, labels[3]), stringify(dimensions.temperature, labels[4]), stringify(dimensions.amount, labels[5]), stringify(dimensions.intensity, labels[6])].filter(function (x) {
        return typeof x === 'string';
    }).join(" ");
    return "" + scaleString + operatorStr + unitsString;
};

/**
 * @hidden
 * @param multiplier 
 * @param formatted 
 * @param dimensions 
 * @param labels 
 * @param compact 
 * @returns 
 */
const unitString = function (multiplier: number, formatted: string, dimensions: Dimensions, labels: string[], compact?: boolean): string {
    const M = dimensions.M;
    const L = dimensions.L;
    const T = dimensions.T;
    const Q = dimensions.Q;
    const temperature = dimensions.temperature;
    const amount = dimensions.amount;
    const intensity = dimensions.intensity;
    for (let i = 0, len = patterns.length; i < len; i++) {
        const pattern = patterns[i];
        if (M.numer === pattern[0] && M.denom === pattern[1] &&
            L.numer === pattern[2] && L.denom === pattern[3] &&
            T.numer === pattern[4] && T.denom === pattern[5] &&
            Q.numer === pattern[6] && Q.denom === pattern[7] &&
            temperature.numer === pattern[8] && temperature.denom === pattern[9] &&
            amount.numer === pattern[10] && amount.denom === pattern[11] &&
            intensity.numer === pattern[12] && intensity.denom === pattern[13]) {
            if (!compact) {
                return multiplier + " * " + decodes[i][0];
            }
            else {
                if (multiplier !== 1) {
                    return multiplier + " * " + decodes[i][0];
                }
                else {
                    return decodes[i][0];
                }
            }
        }
    }
    return dumbString(multiplier, formatted, dimensions, labels, compact);
};

/**
 * @hidden
 * @param lhs 
 * @param rhs 
 * @returns 
 */
function add(lhs: Unit, rhs: Unit): Unit {
    return Unit.valueOf(lhs.multiplier + rhs.multiplier, lhs.dimensions.compatible(rhs.dimensions), lhs.labels);
}

/**
 * @hidden
 * @param lhs 
 * @param rhs 
 * @returns 
 */
function sub(lhs: Unit, rhs: Unit): Unit {
    return Unit.valueOf(lhs.multiplier - rhs.multiplier, lhs.dimensions.compatible(rhs.dimensions), lhs.labels);
}

/**
 * @hidden
 * @param lhs 
 * @param rhs 
 * @returns 
 */
function mul(lhs: Unit, rhs: Unit): Unit {
    return Unit.valueOf(lhs.multiplier * rhs.multiplier, lhs.dimensions.mul(rhs.dimensions), lhs.labels);
}

/**
 * @hidden
 * @param α 
 * @param unit 
 * @returns 
 */
function scale(α: number, unit: Unit): Unit {
    return Unit.valueOf(α * unit.multiplier, unit.dimensions, unit.labels);
}

/**
 * @hidden
 * @param lhs 
 * @param rhs 
 * @returns 
 */
function div(lhs: Unit, rhs: Unit): Unit {
    return Unit.valueOf(lhs.multiplier / rhs.multiplier, lhs.dimensions.div(rhs.dimensions), lhs.labels);
}

/**
 * <p>
 * The Unit class represents the units for a measure.
 * </p>
 * <p>
 * It is important to note that the <code>Unit.ONE</code> value is considered to be equivalent to the absence
 * of a <code>Unit</code> instance or <code>undefined</code>. For this reason, it is convenient to use the
 * <code>static</code> methods when comparing or computing with the <code>Unit</code> class.
 * </p>
 */
export class Unit {

    /**
     * @param uom The unit of measure.
     * @returns `true` if the uom is one or if it is undefined.
     */
    static isOne(uom: Unit | undefined): boolean {
        if (uom === void 0) {
            return true;
        }
        else if (uom instanceof Unit) {
            return uom.isOne();
        }
        else {
            throw new Error("isOne argument must be a Unit or undefined.");
        }
    }

    /**
     * @param uom The unit of measure that must be dimensionless.
     */
    static assertDimensionless(uom: Unit | undefined): void {
        if (!Unit.isOne(uom)) {
            throw new Error(`uom ${uom} must be dimensionless.`);
        }
    }

    /**
     * @param lhs
     * @param rhs
     * @returns
     */
    static compatible(lhs: Unit | undefined, rhs: Unit | undefined): Unit | undefined {
        if (lhs) {
            if (rhs) {
                return lhs.compatible(rhs);
            }
            else {
                if (lhs.isOne()) {
                    return void 0;
                }
                else {
                    throw new Error(lhs + " is incompatible with 1");
                }
            }
        }
        else {
            if (rhs) {
                if (rhs.isOne()) {
                    return void 0;
                }
                else {
                    throw new Error("1 is incompatible with " + rhs);
                }
            }
            else {
                return void 0;
            }
        }
    }

    static isCompatible(lhs: Unit | undefined, rhs: Unit | undefined): boolean {
        if (lhs) {
            if (rhs) {
                return lhs.isCompatible(rhs);
            }
            else {
                if (lhs.isOne()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            if (rhs) {
                if (rhs.isOne()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
    }

    /**
     * @param lhs
     * @param rhs
     * @returns
     */
    static mul(lhs: Unit | undefined, rhs: Unit | undefined): Unit | undefined {
        if (lhs) {
            if (rhs) {
                return lhs.mul(rhs);
            }
            else if (Unit.isOne(rhs)) {
                return lhs;
            }
            else {
                return void 0;
            }
        }
        else if (Unit.isOne(lhs)) {
            return rhs;
        }
        else {
            return void 0;
        }
    }

    /**
     * @param lhs
     * @param rhs
     */
    static div(lhs: Unit | undefined, rhs: Unit | undefined): Unit {
        if (lhs) {
            if (rhs) {
                return lhs.div(rhs);
            }
            else {
                return lhs;
            }
        }
        else {
            if (rhs) {
                return rhs.inv();
            }
            else {
                return Unit.ONE;
            }
        }
    }

    /**
     * Computes the multiplicative inverse of the specified unit of measure. 
     */
    static inv(uom: Unit): Unit {
        if (uom instanceof Unit) {
            if (uom.isOne()) {
                return Unit.ONE;
            }
            else {
                return uom.inv();
            }
        }
        else {
            return Unit.ONE;
        }
    }

    /**
     * 
     */
    static mustBeUnit(name: string, uom: Unit): Unit {
        if (uom instanceof Unit) {
            return uom;
        }
        else if (isUndefined(uom)) {
            return Unit.ONE;
        }
        else {
            throw new Error(`${name} must be a Unit or undefined (meaning 1).`);
        }
    }

    /**
     * Computes the value of the unit of measure raised to the specified power. 
     */
    static pow(uom: Unit, exponent: QQ): Unit | undefined {
        if (uom instanceof Unit) {
            if (uom.isOne()) {
                return void 0;
            }
            else {
                if (exponent.isZero()) {
                    return void 0;
                }
                else {
                    return uom.pow(exponent);
                }
            }
        }
        else {
            return void 0;
        }
    }

    /**
     * @param uom
     * @returns
     */
    static sqrt(uom: Unit): Unit | undefined {
        if (uom instanceof Unit) {
            if (uom.isOne()) {
                return void 0;
            }
            else {
                return uom.sqrt();
            }
        }
        else {
            return void 0;
        }
    }

    /**
     * Constructs a Unit.
     */
    public static valueOf(multiplier: number, dimensions: Dimensions, labels: string[]): Unit {
        // This method is optimized to minimize object creation.
        // The summary on the dimensions is used to improve lookup time.
        if (multiplier === 1) {
            switch (dimensions.summary) {
                case DimensionsSummary.AMOUNT_OF_SUBSTANCE: return Unit.MOLE;
                case DimensionsSummary.ANGULAR_MOMENTUM: return Unit.JOULE_SECOND;
                case DimensionsSummary.AREA: return Unit.METER_SQUARED;
                case DimensionsSummary.ELECTRIC_CHARGE: return Unit.COULOMB;
                case DimensionsSummary.ELECTRIC_CURRENT: return Unit.AMPERE;
                case DimensionsSummary.ELECTRIC_FIELD: return Unit.ELECTRIC_FIELD;
                case DimensionsSummary.ELECTRIC_PERMITTIVITY_TIMES_AREA: return Unit.COULOMB_SQUARED_PER_NEWTON;
                case DimensionsSummary.ENERGY_OR_TORQUE: return Unit.JOULE;
                case DimensionsSummary.FORCE: return Unit.NEWTON;
                case DimensionsSummary.FRICTION_COEFFICIENT: return Unit.FRICTION_COEFFICIENT;
                case DimensionsSummary.INV_LENGTH: return Unit.INV_METER;
                case DimensionsSummary.INV_MASS: return Unit.INV_KILOGRAM;
                case DimensionsSummary.INV_MOMENT_OF_INERTIA: return Unit.INV_KILOGRAM_METER_SQUARED;
                case DimensionsSummary.INV_TIME: return Unit.INV_SECOND;
                case DimensionsSummary.LENGTH: return Unit.METER;
                case DimensionsSummary.LUMINOUS_INTENSITY: return Unit.CANDELA;
                case DimensionsSummary.MASS: return Unit.KILOGRAM;
                case DimensionsSummary.MOMENT_OF_INERTIA: return Unit.KILOGRAM_METER_SQUARED;
                case DimensionsSummary.MOMENTUM: return Unit.KILOGRAM_METER_PER_SECOND;
                case DimensionsSummary.MOMENTUM_SQUARED: return Unit.KILOGRAM_SQUARED_METER_SQUARED_PER_SECOND_SQUARED;
                case DimensionsSummary.ONE: return Unit.ONE;
                case DimensionsSummary.RATE_OF_CHANGE_OF_AREA: return Unit.METER_SQUARED_PER_SECOND;
                case DimensionsSummary.STIFFNESS: return Unit.STIFFNESS;
                case DimensionsSummary.THERMODYNAMIC_TEMPERATURE: return Unit.KELVIN;
                case DimensionsSummary.TIME: return Unit.SECOND;
                case DimensionsSummary.TIME_SQUARED: return Unit.SECOND_SQUARED;
                case DimensionsSummary.VELOCITY: return Unit.METER_PER_SECOND;
                case DimensionsSummary.VELOCITY_SQUARED: return Unit.METER_SQUARED_PER_SECOND_SQUARED;
                case DimensionsSummary.VOLUME: return Unit.METER_CUBED;
                default: {
                    // Do nothing.
                }
            }
        }
        // console.warn(`Unit.valueOf(${multiplier},${dimensions}) is not cached.`);
        for (const entry of entries) {
            if (entry.multiplier === multiplier && entry.dimensions.equals(dimensions)) {
                return entry;
            }
        }
        // console.warn(`Unit.valueOf(${multiplier},${dimensions}) is not cached.`);
        const value = new Unit(multiplier, dimensions, labels);
        entries.push(value);
        // console.warn(`Unit cache size = ${entries.length}`);
        return value;
    }

    /**
     * Internal symbolic constant to improve code readability.
     * May be undefined or an instance of Unit.
     */
    public static readonly ONE: Unit = new Unit(1, Dimensions.ONE, SYMBOLS_SI);

    /**
     * Unit of mass.
     * The kilogram is the unit of mass; it is equal to the mass of the international prototype of the kilogram.
     */
    public static readonly KILOGRAM = new Unit(1, Dimensions.MASS, SYMBOLS_SI);

    /**
     * Unit of length.
     * The meter is the length of the path travelled by light in vacuum during a time interval of 1/299 792 458 of a second.
     */
    public static readonly METER = new Unit(1, Dimensions.LENGTH, SYMBOLS_SI);

    /**
     * Unit of time.
     * The second is the duration of 9 192 631 770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium 133 atom.
     */
    public static readonly SECOND = new Unit(1, Dimensions.TIME, SYMBOLS_SI);

    /**
     * Unit of electric charge.
     * 
     */
    public static readonly COULOMB = new Unit(1, Dimensions.ELECTRIC_CHARGE, SYMBOLS_SI);

    /**
     * Unit of electric current.
     * The ampere is that constant current which,
     * if maintained in two straight parallel conductors of infinite length,
     * of negligible circular cross-section,
     * and placed 1 meter apart in vacuum,
     * would produce between these conductors a force equal to 2 x 10<sup>-7</sup> newton per meter of length.
     */
    public static readonly AMPERE = new Unit(1, Dimensions.ELECTRIC_CURRENT, SYMBOLS_SI);

    /**
     * Unit of thermodynamic temperature.
     * The kelvin, unit of thermodynamic temperature, is the fraction 1/273.16 of the thermodynamic temperature of the triple point of water.
     */
    public static readonly KELVIN = new Unit(1, Dimensions.THERMODYNAMIC_TEMPERATURE, SYMBOLS_SI);

    /**
     * Unit of amount of substance.
     * 1. The mole is the amount of substance of a system which contains as many elementary entities as there are atoms in 0.012 kilogram of carbon 12; its symbol is "mol."
     * 2. When the mole is used, the elementary entities must be specified and may be atoms, molecules, ions, electrons, other particles, or specified groups of such particles.
     */
    public static readonly MOLE = new Unit(1, Dimensions.AMOUNT_OF_SUBSTANCE, SYMBOLS_SI);

    /**
     * Unit of luminous intensity.
     * The candela is the luminous intensity, in a given direction,
     * of a source that emits monochromatic radiation of frequency 540 x 10<sup>12</sup> hertz and that has a radiant intensity in that direction of 1/683 watt per steradian.
     */
    public static readonly CANDELA = new Unit(1, Dimensions.LUMINOUS_INTENSITY, SYMBOLS_SI);

    private static readonly COULOMB_SQUARED_PER_NEWTON = new Unit(1, Dimensions.ELECTRIC_PERMITTIVITY_TIMES_AREA, SYMBOLS_SI);
    private static readonly ELECTRIC_FIELD = new Unit(1, Dimensions.ELECTRIC_FIELD, SYMBOLS_SI);

    /**
     * 
     */
    public static readonly NEWTON = new Unit(1, Dimensions.FORCE, SYMBOLS_SI);

    /**
     * 
     */
    public static readonly JOULE = new Unit(1, Dimensions.ENERGY_OR_TORQUE, SYMBOLS_SI);

    /**
     * The unit of angular momentum.
     */
    public static readonly JOULE_SECOND = new Unit(1, Dimensions.ANGULAR_MOMENTUM, SYMBOLS_SI);
    private static readonly METER_SQUARED = new Unit(1, Dimensions.AREA, SYMBOLS_SI);
    private static readonly METER_CUBED = new Unit(1, Dimensions.VOLUME, SYMBOLS_SI);
    private static readonly SECOND_SQUARED = new Unit(1, Dimensions.TIME_SQUARED, SYMBOLS_SI);
    private static readonly INV_KILOGRAM = new Unit(1, Dimensions.INV_MASS, SYMBOLS_SI);
    private static readonly INV_METER = new Unit(1, Dimensions.INV_LENGTH, SYMBOLS_SI);
    /**
     * The unit of angular velocity.
     */
    public static readonly INV_SECOND = new Unit(1, Dimensions.INV_TIME, SYMBOLS_SI);
    /**
     * The unit of moment of inertia.
     */
    public static readonly KILOGRAM_METER_SQUARED = new Unit(1, Dimensions.MOMENT_OF_INERTIA, SYMBOLS_SI);
    /**
     * The unit of linear momentum.
     */
    public static readonly KILOGRAM_METER_PER_SECOND = new Unit(1, Dimensions.MOMENTUM, SYMBOLS_SI);
    private static readonly KILOGRAM_SQUARED_METER_SQUARED_PER_SECOND_SQUARED = new Unit(1, Dimensions.MOMENTUM_SQUARED, SYMBOLS_SI);
    private static readonly INV_KILOGRAM_METER_SQUARED = new Unit(1, Dimensions.INV_MOMENT_OF_INERTIA, SYMBOLS_SI);
    /**
     * The unit for a Spring constant, N/m.
     */
    public static readonly STIFFNESS = new Unit(1, Dimensions.STIFFNESS, SYMBOLS_SI);
    /**
     * The unit for a Friction Coefficient, Ns/m.
     */
    public static readonly FRICTION_COEFFICIENT = new Unit(1, Dimensions.FRICTION_COEFFICIENT, SYMBOLS_SI);
    /**
     * 
     */
    private static readonly METER_PER_SECOND = new Unit(1, Dimensions.VELOCITY, SYMBOLS_SI);
    private static readonly METER_SQUARED_PER_SECOND = new Unit(1, Dimensions.RATE_OF_CHANGE_OF_AREA, SYMBOLS_SI);
    private static readonly METER_SQUARED_PER_SECOND_SQUARED = new Unit(1, Dimensions.VELOCITY_SQUARED, SYMBOLS_SI);

    /**
     * @param multiplier
     * @param dimensions
     * @param labels The label strings to use for each dimension.
     */
    private constructor(public readonly multiplier: number, public readonly dimensions: Dimensions, public readonly labels: string[]) {
        if (labels.length !== 7) {
            throw new Error("Expecting 7 elements in the labels array.");
        }
        this.multiplier = multiplier;
        this.dimensions = dimensions;
        this.labels = labels;
    }

    private compatible(rhs: Unit): this | never {
        if (rhs instanceof Unit) {
            try {
                this.dimensions.compatible(rhs.dimensions);
            }
            catch (e) {
                const cause = (e instanceof Error) ? e.message : `${e}`;
                throw new Error(`${this} is not compatible with ${rhs}. Cause: ${cause}`);
            }
            return this;
        }
        else {
            throw new Error("Illegal Argument for Unit.compatible: " + rhs);
        }
    }

    /**
     * Computes the unit equal to `this / rhs`.
     */
    public div(rhs: Unit): Unit {
        return div(this, rhs);
    }

    /**
     * @returns true if this and rhs have the same dimensions.
     */
    private isCompatible(rhs: Unit): boolean {
        if (rhs instanceof Unit) {
            return this.dimensions.equals(rhs.dimensions);
        }
        else {
            throw new Error("Illegal Argument for Unit.compatible: " + rhs);
        }
    }

    public isOne(): boolean {
        return this.dimensions.isOne() && (this.multiplier === 1);
    }

    private inv(): Unit {
        return Unit.valueOf(1 / this.multiplier, this.dimensions.inv(), this.labels);
    }

    /**
     * Computes the unit equal to `this * rhs`.
     */
    public mul(rhs: Unit): Unit {
        return mul(this, rhs);
    }

    private neg(): Unit {
        return Unit.valueOf(-this.multiplier, this.dimensions, this.labels);
    }

    private pow(exponent: QQ): Unit {
        return Unit.valueOf(Math.pow(this.multiplier, exponent.numer / exponent.denom), this.dimensions.pow(exponent), this.labels);
    }

    private sqrt(): Unit {
        return Unit.valueOf(Math.sqrt(this.multiplier), this.dimensions.sqrt(), this.labels);
    }

    public toExponential(fractionDigits?: number, compact?: boolean): string {
        return unitString(this.multiplier, this.multiplier.toExponential(fractionDigits), this.dimensions, this.labels, compact);
    }

    public toFixed(fractionDigits?: number, compact?: boolean): string {
        return unitString(this.multiplier, this.multiplier.toFixed(fractionDigits), this.dimensions, this.labels, compact);
    }

    public toPrecision(precision?: number, compact?: boolean): string {
        return unitString(this.multiplier, this.multiplier.toPrecision(precision), this.dimensions, this.labels, compact);
    }

    public toString(radix?: number, compact?: boolean): string {
        return unitString(this.multiplier, this.multiplier.toString(radix), this.dimensions, this.labels, compact);
    }

    /**
     * @hidden
     * @param rhs 
     * @returns 
     */
    public __add__(rhs: Unit): Unit | undefined {
        if (rhs instanceof Unit) {
            return add(this, rhs);
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
    public __radd__(lhs: Unit): Unit | undefined {
        if (lhs instanceof Unit) {
            return add(lhs, this);
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
    public __sub__(rhs: Unit) {
        if (rhs instanceof Unit) {
            return sub(this, rhs);
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
    public __rsub__(lhs: Unit) {
        if (lhs instanceof Unit) {
            return sub(lhs, this);
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
    public __mul__(rhs: number | Unit) {
        if (rhs instanceof Unit) {
            return mul(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return scale(rhs, this);
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
    public __rmul__(lhs: number | Unit) {
        if (lhs instanceof Unit) {
            return mul(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return scale(lhs, this);
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
    public __div__(rhs: number | Unit) {
        if (rhs instanceof Unit) {
            return div(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return Unit.valueOf(this.multiplier / rhs, this.dimensions, this.labels);
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
    public __rdiv__(lhs: number | Unit) {
        if (lhs instanceof Unit) {
            return div(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return Unit.valueOf(lhs / this.multiplier, this.dimensions.inv(), this.labels);
        }
        else {
            return void 0;
        }
    }

    /**
     * @hidden
     * @returns 
     */
    __pos__(): Unit {
        return this;
    }

    /**
     * @hidden
     * @returns 
     */
    __neg__(): Unit {
        return this.neg();
    }
}
