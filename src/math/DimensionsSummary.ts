/**
 * A summary of all the exponents in physical dimensions.
 * This is used to improve the performance of comparing units of measure.
 * @hidden
 */
export enum DimensionsSummary {
    /**
     * The `amount of substance` base quantity.
     */
    AMOUNT_OF_SUBSTANCE = 0,
    ANGULAR_MOMENTUM = 1,
    /**
     * The `area` derived quantity.
     */
    AREA = 2,
    /**
     * The `electric charge, quantity of electricity` derived quantity.
     */
    ELECTRIC_CHARGE = 3,
    /**
     * The `electric current` base quantity.
     */
    ELECTRIC_CURRENT = 4,
    ELECTRIC_FIELD = 5,
    ELECTRIC_PERMITTIVITY_TIMES_AREA = 6,
    ENERGY_OR_TORQUE = 7,
    FORCE = 8,
    FRICTION_COEFFICIENT = 9,
    INV_LENGTH = 10,
    INV_MASS = 11,
    INV_MOMENT_OF_INERTIA = 12,
    INV_TIME = 13,
    /**
     * The `length` base qiantity.
     */
    LENGTH = 14,
    /**
     * The `liminous intensity` base quantity.
     */
    LUMINOUS_INTENSITY = 15,
    /**
     * The `mass` base quantity.
     */
    MASS = 16,
    MOMENT_OF_INERTIA = 17,
    MOMENTUM = 18,
    MOMENTUM_SQUARED = 19,
    ONE = 20,
    RATE_OF_CHANGE_OF_AREA = 21,
    STIFFNESS = 22,
    /**
     * The `thermodynamic temperature` base quantity.
     */
    THERMODYNAMIC_TEMPERATURE = 23,
    /**
     * The `time` base quantity.
     */
    TIME = 24,
    TIME_SQUARED = 25,
    VELOCITY = 26,
    VELOCITY_SQUARED = 27,
    /**
     * The `volume` derived quantity.
     */
    VOLUME = 28
}
