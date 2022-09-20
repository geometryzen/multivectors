import detectDims from './detectDimensions';
import { DimensionsSummary } from './DimensionsSummary';
import { QQ } from './QQ';

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
const R2 = R1.add(R1);
/**
 * @hidden
 */
const R3 = R2.add(R1);
/**
 * @hidden
 */
const M1 = QQ.valueOf(-1, 1);
/**
 * @hidden
 */
const M2 = QQ.valueOf(-2, 1);

describe("detectDims", function () {
    it("amount of substance", function () {
        expect(detectDims(R0, R0, R0, R0, R0, R1, R0)).toBe(DimensionsSummary.AMOUNT_OF_SUBSTANCE);
    });
    it("angular momentum", function () {
        expect(detectDims(R1, R2, M1, R0, R0, R0, R0)).toBe(DimensionsSummary.ANGULAR_MOMENTUM);
    });
    it("area", function () {
        expect(detectDims(R0, R2, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.AREA);
    });
    it("electric charge", function () {
        expect(detectDims(R0, R0, R0, R1, R0, R0, R0)).toBe(DimensionsSummary.ELECTRIC_CHARGE);
    });
    it("electric current", function () {
        expect(detectDims(R0, R0, M1, R1, R0, R0, R0)).toBe(DimensionsSummary.ELECTRIC_CURRENT);
    });
    it("electric field", function () {
        expect(detectDims(R1, R1, M2, M1, R0, R0, R0)).toBe(DimensionsSummary.ELECTRIC_FIELD);
    });
    it("electric permittivity x area", function () {
        expect(detectDims(M1, M1, R2, R2, R0, R0, R0)).toBe(DimensionsSummary.ELECTRIC_PERMITTIVITY_TIMES_AREA);
    });
    it("energy, work, quantity of heat", function () {
        expect(detectDims(R1, R2, M2, R0, R0, R0, R0)).toBe(DimensionsSummary.ENERGY_OR_TORQUE);
    });
    it("force", function () {
        expect(detectDims(R1, R1, M2, R0, R0, R0, R0)).toBe(DimensionsSummary.FORCE);
    });
    it("luminous intensity", function () {
        expect(detectDims(R0, R0, R0, R0, R0, R0, R1)).toBe(DimensionsSummary.LUMINOUS_INTENSITY);
    });
    it("inverse length", function () {
        expect(detectDims(R0, M1, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.INV_LENGTH);
    });
    it("inverse mass", function () {
        expect(detectDims(M1, R0, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.INV_MASS);
    });
    it("inverse moment of inertia", function () {
        expect(detectDims(M1, M2, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.INV_MOMENT_OF_INERTIA);
    });
    it("inverse time", function () {
        expect(detectDims(R0, R0, M1, R0, R0, R0, R0)).toBe(DimensionsSummary.INV_TIME);
    });
    it("length", function () {
        expect(detectDims(R0, R1, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.LENGTH);
    });
    it("volume", function () {
        expect(detectDims(R0, R3, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.VOLUME);
    });
    it("mass", function () {
        expect(detectDims(R1, R0, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.MASS);
    });
    it("moment of inertia", function () {
        expect(detectDims(R1, R2, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.MOMENT_OF_INERTIA);
    });
    it("momentum", function () {
        expect(detectDims(R1, R1, M1, R0, R0, R0, R0)).toBe(DimensionsSummary.MOMENTUM);
    });
    it("momentum squared", function () {
        expect(detectDims(R2, R2, M2, R0, R0, R0, R0)).toBe(DimensionsSummary.MOMENTUM_SQUARED);
    });
    it("one", function () {
        expect(detectDims(R0, R0, R0, R0, R0, R0, R0)).toBe(DimensionsSummary.ONE);
    });
    it("rate of change of area", function () {
        expect(detectDims(R0, R2, M1, R0, R0, R0, R0)).toBe(DimensionsSummary.RATE_OF_CHANGE_OF_AREA);
    });
    it("stiffness", function () {
        expect(detectDims(R1, R0, M2, R0, R0, R0, R0)).toBe(DimensionsSummary.STIFFNESS);
    });
    it("theromdynamic temperature", function () {
        expect(detectDims(R0, R0, R0, R0, R1, R0, R0)).toBe(DimensionsSummary.THERMODYNAMIC_TEMPERATURE);
    });
    it("time", function () {
        expect(detectDims(R0, R0, R1, R0, R0, R0, R0)).toBe(DimensionsSummary.TIME);
    });
    it("time squared", function () {
        expect(detectDims(R0, R0, R2, R0, R0, R0, R0)).toBe(DimensionsSummary.TIME_SQUARED);
    });
    it("velocity", function () {
        expect(detectDims(R0, R1, M1, R0, R0, R0, R0)).toBe(DimensionsSummary.VELOCITY);
    });
    it("velocity squared", function () {
        expect(detectDims(R0, R2, M2, R0, R0, R0, R0)).toBe(DimensionsSummary.VELOCITY_SQUARED);
    });
});
