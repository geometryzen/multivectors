import { Dimensions } from './Dimensions';
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
const R4 = R3.add(R1);
/**
 * @hidden
 */
const R5 = R4.add(R1);
/**
 * @hidden
 */
const R6 = R5.add(R1);
/**
 * @hidden
 */
const R7 = R6.add(R1);

const basis = [Dimensions.MASS, Dimensions.LENGTH, Dimensions.TIME, Dimensions.ELECTRIC_CHARGE, Dimensions.THERMODYNAMIC_TEMPERATURE, Dimensions.AMOUNT_OF_SUBSTANCE, Dimensions.LUMINOUS_INTENSITY];

describe("Dimensions", function () {
    describe("constructor", function () {
        it("properties match construction arguments", function () {
            const M = QQ.valueOf(2, 3);
            const L = QQ.valueOf(3, 5);
            const T = QQ.valueOf(5, 7);
            const Q = QQ.valueOf(7, 11);
            const temperature = QQ.valueOf(11, 13);
            const amount = QQ.valueOf(13, 17);
            const intensity = QQ.valueOf(17, 19);
            const x = Dimensions.valueOf(M, L, T, Q, temperature, amount, intensity);
            expect(x.M.numer).toBe(2);
            expect(x.M.denom).toBe(3);
            expect(x.L.numer).toBe(3);
            expect(x.L.denom).toBe(5);
            expect(x.T.numer).toBe(5);
            expect(x.T.denom).toBe(7);
            expect(x.Q.numer).toBe(7);
            expect(x.Q.denom).toBe(11);
            expect(x.temperature.numer).toBe(11);
            expect(x.temperature.denom).toBe(13);
            expect(x.amount.numer).toBe(13);
            expect(x.amount.denom).toBe(17);
            expect(x.intensity.numer).toBe(17);
            expect(x.intensity.denom).toBe(19);
        });
    });

    it("Construction(QQ)", function () {
        const M = QQ.valueOf(1, 1);
        const L = QQ.valueOf(2, 1);
        const T = QQ.valueOf(3, 1);
        const Q = QQ.valueOf(4, 1);
        const temperature = QQ.valueOf(5, 1);
        const amount = QQ.valueOf(6, 1);
        const intensity = QQ.valueOf(7, 1);
        const d = Dimensions.valueOf(M, L, T, Q, temperature, amount, intensity);
        expect(d.M.numer).toBe(1);
        expect(d.M.denom).toBe(1);
        expect(d.L.numer).toBe(2);
        expect(d.L.denom).toBe(1);
        expect(d.T.numer).toBe(3);
        expect(d.T.denom).toBe(1);
        expect(d.Q.numer).toBe(4);
        expect(d.Q.denom).toBe(1);
        expect(d.temperature.numer).toBe(5);
        expect(d.temperature.denom).toBe(1);
        expect(d.amount.numer).toBe(6);
        expect(d.amount.denom).toBe(1);
        expect(d.intensity.numer).toBe(7);
        return expect(d.intensity.denom).toBe(1);
    });

    it("Construction(number)", function () {
        const d = Dimensions.valueOf(R1, R2, R3, R4, R5, R6, R7);
        expect(d.M.numer).toBe(1);
        expect(d.M.denom).toBe(1);
        expect(d.L.numer).toBe(2);
        expect(d.L.denom).toBe(1);
        expect(d.T.numer).toBe(3);
        expect(d.T.denom).toBe(1);
        expect(d.Q.numer).toBe(4);
        expect(d.Q.denom).toBe(1);
        expect(d.temperature.numer).toBe(5);
        expect(d.temperature.denom).toBe(1);
        expect(d.amount.numer).toBe(6);
        expect(d.amount.denom).toBe(1);
        expect(d.intensity.numer).toBe(7);
        return expect(d.intensity.denom).toBe(1);
    });

    it("mul", function () {
        const M = Dimensions.valueOf(R1, R0, R0, R0, R0, R0, R0);
        const L = Dimensions.valueOf(R0, R1, R0, R0, R0, R0, R0);
        const T = Dimensions.valueOf(R0, R0, R1, R0, R0, R0, R0);
        const Q = Dimensions.valueOf(R0, R0, R0, R1, R0, R0, R0);
        const temperature = Dimensions.valueOf(R0, R0, R0, R0, R1, R0, R0);
        const amount = Dimensions.valueOf(R0, R0, R0, R0, R0, R1, R0);
        const intensity = Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R1);
        const N = M.mul(L).mul(T).mul(Q).mul(temperature).mul(amount).mul(intensity);
        expect(N.M.numer).toBe(1);
        expect(N.M.denom).toBe(1);
        expect(N.L.numer).toBe(1);
        expect(N.L.denom).toBe(1);
        expect(N.Q.numer).toBe(1);
        expect(N.Q.denom).toBe(1);
        expect(N.temperature.numer).toBe(1);
        expect(N.temperature.denom).toBe(1);
        expect(N.amount.numer).toBe(1);
        expect(N.amount.denom).toBe(1);
        expect(N.intensity.numer).toBe(1);
        return expect(N.intensity.denom).toBe(1);
    });

    it("div", function () {
        const one = Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R0);
        const M = Dimensions.valueOf(R1, R0, R0, R0, R0, R0, R0);
        const L = Dimensions.valueOf(R0, R1, R0, R0, R0, R0, R0);
        const T = Dimensions.valueOf(R0, R0, R1, R0, R0, R0, R0);
        const Q = Dimensions.valueOf(R0, R0, R0, R1, R0, R0, R0);
        const temperature = Dimensions.valueOf(R0, R0, R0, R0, R1, R0, R0);
        const amount = Dimensions.valueOf(R0, R0, R0, R0, R0, R1, R0);
        const intensity = Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R1);
        const N = one.div(M).div(L).div(T).div(Q).div(temperature).div(amount).div(intensity);
        expect(N.M.numer).toBe(-1);
        expect(N.M.denom).toBe(1);
        expect(N.L.numer).toBe(-1);
        expect(N.L.denom).toBe(1);
        expect(N.T.numer).toBe(-1);
        expect(N.T.denom).toBe(1);
        expect(N.Q.numer).toBe(-1);
        expect(N.Q.denom).toBe(1);
        expect(N.temperature.numer).toBe(-1);
        expect(N.temperature.denom).toBe(1);
        expect(N.amount.numer).toBe(-1);
        expect(N.amount.denom).toBe(1);
        expect(N.intensity.numer).toBe(-1);
        return expect(N.intensity.denom).toBe(1);
    });

    it("pow", function () {
        const base = Dimensions.valueOf(R1, R2, R3, R4, R5, R6, R7);
        const x = base.pow(R2);
        expect(x.M.numer).toBe(2);
        expect(x.M.denom).toBe(1);
        expect(x.L.numer).toBe(4);
        expect(x.L.denom).toBe(1);
        expect(x.T.numer).toBe(6);
        expect(x.T.denom).toBe(1);
        expect(x.Q.numer).toBe(8);
        expect(x.Q.denom).toBe(1);
        expect(x.temperature.numer).toBe(10);
        expect(x.temperature.denom).toBe(1);
        expect(x.amount.numer).toBe(12);
        expect(x.amount.denom).toBe(1);
        expect(x.intensity.numer).toBe(14);
        expect(x.intensity.denom).toBe(1);
        expect(base.M.numer).toBe(1);
        expect(base.M.denom).toBe(1);
        expect(base.L.numer).toBe(2);
        expect(base.L.denom).toBe(1);
        expect(base.T.numer).toBe(3);
        expect(base.T.denom).toBe(1);
        expect(base.Q.numer).toBe(4);
        expect(base.Q.denom).toBe(1);
        expect(base.temperature.numer).toBe(5);
        expect(base.temperature.denom).toBe(1);
        expect(base.amount.numer).toBe(6);
        expect(base.amount.denom).toBe(1);
        expect(base.intensity.numer).toBe(7);
        return expect(base.intensity.denom).toBe(1);
    });

    it("sqrt", function () {
        const quad = Dimensions.valueOf(R1, R2, R3, R2, R2, R2, R2);
        const x = quad.sqrt();
        expect(x.M.numer).toBe(1);
        expect(x.M.denom).toBe(2);
        expect(x.L.numer).toBe(1);
        expect(x.L.denom).toBe(1);
        expect(x.T.numer).toBe(3);
        expect(x.T.denom).toBe(2);
        expect(x.Q.numer).toBe(1);
        expect(x.Q.denom).toBe(1);
        expect(x.temperature.numer).toBe(1);
        expect(x.temperature.denom).toBe(1);
        expect(x.amount.numer).toBe(1);
        expect(x.amount.denom).toBe(1);
        expect(x.intensity.numer).toBe(1);
        expect(x.intensity.denom).toBe(1);
        expect(quad.M.numer).toBe(1);
        expect(quad.M.denom).toBe(1);
        expect(quad.L.numer).toBe(2);
        expect(quad.L.denom).toBe(1);
        expect(quad.T.numer).toBe(3);
        expect(quad.T.denom).toBe(1);
        expect(quad.Q.numer).toBe(2);
        expect(quad.Q.denom).toBe(1);
        expect(quad.temperature.numer).toBe(2);
        expect(quad.temperature.denom).toBe(1);
        expect(quad.amount.numer).toBe(2);
        expect(quad.amount.denom).toBe(1);
        expect(quad.intensity.numer).toBe(2);
        return expect(quad.intensity.denom).toBe(1);
    });

    it("compatible", function () {
        const one = Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R0);
        const all = Dimensions.valueOf(R1, R1, R1, R1, R1, R1, R1);
        const mass = Dimensions.valueOf(R1, R0, R0, R0, R0, R0, R0);
        const length = Dimensions.valueOf(R0, R1, R0, R0, R0, R0, R0);
        const time = Dimensions.valueOf(R0, R0, R1, R0, R0, R0, R0);
        const charge = Dimensions.valueOf(R0, R0, R0, R1, R0, R0, R0);
        const temperature = Dimensions.valueOf(R0, R0, R0, R0, R1, R0, R0);
        const amount = Dimensions.valueOf(R0, R0, R0, R0, R0, R1, R0);
        const intensity = Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R1);

        function inCompatible(a: Dimensions, b: Dimensions): string {
            try {
                a.compatible(b);
                return `Something is rotten in Denmark!!! ${a.toString()} ${b.toString()}`;
            }
            catch (e) {
                if (e instanceof Error) {
                    return (<Error>e).message;
                }
                else {
                    return `Expecting an Error for ${a.toString()} ${b.toString()}`;
                }
            }
        }

        expect(one.compatible(one)).toBe(one);
        expect(all.compatible(all)).toBe(all);
        expect(mass.compatible(mass)).toBe(mass);
        expect(length.compatible(length)).toBe(length);
        expect(time.compatible(time)).toBe(time);
        expect(charge.compatible(charge)).toBe(charge);
        expect(temperature.compatible(temperature)).toBe(temperature);
        expect(amount.compatible(amount)).toBe(amount);
        expect(intensity.compatible(intensity)).toBe(intensity);

        expect(inCompatible(one, length)).toBe('Dimensions must be equal (dimensionless, length)');
        expect(inCompatible(length, one)).toBe('Dimensions must be equal (length, dimensionless)');
        expect(inCompatible(mass, length)).toBe('Dimensions must be equal (mass, length)');
        expect(inCompatible(length, mass)).toBe('Dimensions must be equal (length, mass)');
    });

    it("isOne()", function () {
        expect(Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R0).isOne()).toBe(true);
        expect(Dimensions.valueOf(R1, R0, R0, R0, R0, R0, R0).isOne()).toBe(false);
        expect(Dimensions.valueOf(R0, R1, R0, R0, R0, R0, R0).isOne()).toBe(false);
        expect(Dimensions.valueOf(R0, R0, R1, R0, R0, R0, R0).isOne()).toBe(false);
        expect(Dimensions.valueOf(R0, R0, R0, R1, R0, R0, R0).isOne()).toBe(false);
        expect(Dimensions.valueOf(R0, R0, R0, R0, R1, R0, R0).isOne()).toBe(false);
        expect(Dimensions.valueOf(R0, R0, R0, R0, R0, R1, R0).isOne()).toBe(false);
        return expect(Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R1).isOne()).toBe(false);
    });

    it("inv()", function () {
        const dims = Dimensions.valueOf(R1, R2, R3, R4, R5, R6, R7).inv();
        expect(dims.M.numer).toBe(-1);
        expect(dims.M.denom).toBe(1);
        expect(dims.L.numer).toBe(-2);
        expect(dims.L.denom).toBe(1);
        expect(dims.T.numer).toBe(-3);
        expect(dims.T.denom).toBe(1);
        expect(dims.Q.numer).toBe(-4);
        expect(dims.Q.denom).toBe(1);
        expect(dims.temperature.numer).toBe(-5);
        expect(dims.temperature.denom).toBe(1);
        expect(dims.amount.numer).toBe(-6);
        expect(dims.amount.denom).toBe(1);
        expect(dims.intensity.numer).toBe(-7);
        return expect(dims.intensity.denom).toBe(1);
    });

    it("toString()", function () {
        expect(`${Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R0)}`).toBe("");
        expect(`${Dimensions.valueOf(R1, R0, R0, R0, R0, R0, R0)}`).toBe("mass");
        expect(`${Dimensions.valueOf(R2, R0, R0, R0, R0, R0, R0)}`).toBe("mass ** 2");

        expect("" + (Dimensions.valueOf(R0, R1, R0, R0, R0, R0, R0))).toBe("length");
        expect("" + (Dimensions.valueOf(R0, R0, R1, R0, R0, R0, R0))).toBe("time");
        expect("" + (Dimensions.valueOf(R0, R0, R0, R1, R0, R0, R0))).toBe("charge");
        expect("" + (Dimensions.valueOf(R0, R0, R0, R0, R1, R0, R0))).toBe("thermodynamic temperature");
        expect("" + (Dimensions.valueOf(R0, R0, R0, R0, R0, R1, R0))).toBe("amount of substance");
        expect("" + (Dimensions.valueOf(R0, R0, R0, R0, R0, R0, R1))).toBe("luminous intensity");

        return expect("" + (Dimensions.valueOf(R0, R1, QQ.valueOf(-2, 1), R0, R0, R0, R0))).toBe("length * time ** -2");
    });

    describe("__add__", function () {
        it("", function () {
            for (const base of basis) {
                expect(base.__add__(base).equals(base.compatible(base))).toBe(true);
                expect(base.__add__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__radd__", function () {
        it("", function () {
            for (const base of basis) {
                expect(base.__radd__(base).equals(base.compatible(base))).toBe(true);
                expect(base.__radd__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__sub__", function () {
        it("", function () {
            for (const base of basis) {
                expect(base.__sub__(base).equals(base.compatible(base))).toBe(true);
                expect(base.__sub__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__rsub__", function () {
        it("", function () {
            for (const base of basis) {
                expect(base.__rsub__(base).equals(base.compatible(base))).toBe(true);
                expect(base.__rsub__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__mul__", function () {
        it("", function () {
            for (const lhs of basis) {
                for (const rhs of basis) {
                    expect(lhs.__mul__(rhs).equals(lhs.mul(rhs))).toBe(true);
                }
                expect(lhs.__mul__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__rmul__", function () {
        it("", function () {
            for (const lhs of basis) {
                for (const rhs of basis) {
                    expect(lhs.__rmul__(rhs).equals(rhs.mul(lhs))).toBe(true);
                }
                expect(lhs.__rmul__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__div__", function () {
        it("", function () {
            for (const lhs of basis) {
                for (const rhs of basis) {
                    expect(lhs.__div__(rhs).equals(lhs.div(rhs))).toBe(true);
                }
                expect(lhs.__div__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__rdiv__", function () {
        it("", function () {
            for (const lhs of basis) {
                for (const rhs of basis) {
                    expect(lhs.__rdiv__(rhs).equals(rhs.div(lhs))).toBe(true);
                }
                expect(lhs.__rdiv__(void 0)).toBeUndefined();
            }
        });
    });

    describe("__pos__", function () {
        it("", function () {
            for (const base of basis) {
                expect(base.__pos__().equals(base)).toBe(true);
            }
        });
    });

    describe("__neg__", function () {
        it("", function () {
            for (const base of basis) {
                expect(base.__neg__().equals(base)).toBe(true);
            }
        });
    });

});
