import { ignoreNegativeZero } from "./ignoreNegativeZero";
import { Spacetime1 } from "./Spacetime1";
import { Unit } from "./Unit";

/**
 * @hidden
 */
const zero = Spacetime1.zero;
/**
 * @hidden
 */
const one = Spacetime1.one;
/**
 * @hidden
 */
const two = one.add(one);
/**
 * @hidden
 */
const e0 = Spacetime1.e0;
/**
 * @hidden
 */
const e1 = Spacetime1.e1;
/**
 * @hidden
 */
const I = Spacetime1.I;
/**
 * @hidden
 */
const meter = Spacetime1.meter;
/**
 * @hidden
 */
const kilogram = Spacetime1.kilogram;
/**
 * @hidden
 */
const blades = [one, e0, e1, I];
/**
 * @hidden
 */
function checkEQ(result: Spacetime1, comp: Spacetime1): void {
    expect(ignoreNegativeZero(result.a)).toBe(ignoreNegativeZero(comp.a));
    expect(ignoreNegativeZero(result.t)).toBe(ignoreNegativeZero(comp.t));
    expect(ignoreNegativeZero(result.x)).toBe(ignoreNegativeZero(comp.x));
    expect(ignoreNegativeZero(result.b)).toBe(ignoreNegativeZero(comp.b));
    expect(Unit.isCompatible(result.uom, comp.uom)).toBe(true);
    expect(result.isLocked()).toBe(comp.isLocked());
    expect(result.isMutable()).toBe(comp.isMutable());
}

describe("Spacetime1", function () {
    describe("constructor", function () {
        it("should be defined", function () {
            const m = new Spacetime1();
            expect(m).toBeDefined();
            expect(m.a).toBe(0);
            expect(m.t).toBe(0);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("a", function () {
            const a = Math.random();
            const m = new Spacetime1(a);
            expect(m.a).toBe(a);
        });
        it("t", function () {
            const t = Math.random();
            const m = new Spacetime1(0, t);
            expect(m.t).toBe(t);
        });
        it("x", function () {
            const x = Math.random();
            const m = new Spacetime1(0, 0, x);
            expect(m.x).toBe(x);
        });
        it("b", function () {
            const b = Math.random();
            const m = new Spacetime1(0, 0, 0, b);
            expect(m.b).toBe(b);
        });
    });
    describe("accessors", function () {
        it("a", function () {
            const a = Math.random();
            const m = new Spacetime1();
            m.a = a;
            expect(m.a).toBe(a);
            m.lock();
            expect(function () {
                m.a = 0;
            }).toThrowError("Property `a` is readonly.");
        });
        it("t", function () {
            const t = Math.random();
            const m = new Spacetime1();
            m.t = t;
            expect(m.t).toBe(t);
            m.lock();
            expect(function () {
                m.t = 0;
            }).toThrowError("Property `t` is readonly.");
        });
        it("x", function () {
            const x = Math.random();
            const m = new Spacetime1();
            m.x = x;
            expect(m.x).toBe(x);
            m.lock();
            expect(function () {
                m.x = 0;
            }).toThrowError("Property `x` is readonly.");
        });
        it("b", function () {
            const b = Math.random();
            const m = new Spacetime1();
            m.b = b;
            expect(m.b).toBe(b);
            m.lock();
            expect(function () {
                m.b = 0;
            }).toThrowError("Property `b` is readonly.");
        });
        it("uom", function () {
            const uom = Unit.JOULE;
            const m = new Spacetime1();
            m.uom = uom;
            expect(m.uom).toBe(uom);
            m.lock();
            expect(function () {
                m.uom = Unit.JOULE;
            }).toThrowError("Property `uom` is readonly.");
        });
    });
    describe("toExponential", function () {
        it("should use scientific notation", function () {
            const m = new Spacetime1(2, 3, 5, 7);
            expect(m.toExponential(1)).toBe("2.0e+0+3.0e+0*e0+5.0e+0*e1+7.0e+0*I");
        });
    });
    describe("toFixed", function () {
        it("should use toFixed", function () {
            const m = new Spacetime1(2, 3, 5, 7);
            expect(m.toFixed(1)).toBe("2.0+3.0*e0+5.0*e1+7.0*I");
        });
    });
    describe("toPrecision", function () {
        it("should use toPrecision", function () {
            const m = new Spacetime1(2, 3, 5, 7);
            expect(m.toPrecision(2)).toBe("2.0+3.0*e0+5.0*e1+7.0*I");
        });
    });
    describe("toString", function () {
        it("should use toString", function () {
            const m = new Spacetime1(2, 3, 5, 7);
            expect(m.toString()).toBe("2+3*e0+5*e1+7*I");
        });
    });
    describe("grades", function () {
        it("0", function () {
            const m = new Spacetime1();
            expect(m.grades).toBe(0x0);
        });
        it("a", function () {
            const m = new Spacetime1(1);
            expect(m.grades).toBe(0x1);
        });
        it("t", function () {
            const m = new Spacetime1(0, 1);
            expect(m.grades).toBe(0x2);
        });
        it("x", function () {
            const m = new Spacetime1(0, 0, 1);
            expect(m.grades).toBe(0x2);
        });
        it("b", function () {
            const m = new Spacetime1(0, 0, 0, 1);
            expect(m.grades).toBe(0x4);
        });
        it("ALL", function () {
            const m = new Spacetime1(1, 1, 1, 1);
            expect(m.grades).toBe(7);
        });
    });
    describe("grade", function () {
        const GRADE0 = zero.add(one);
        const GRADE1 = zero.add(e0).add(e1);
        const GRADE2 = zero.add(I);
        const ALL = GRADE0.add(GRADE1).add(GRADE2);
        it("sanity check", function () {
            expect(ALL.a).toBe(1);
            expect(ALL.t).toBe(1);
            expect(ALL.x).toBe(1);
            expect(ALL.b).toBe(1);
        });
        it("0", function () {
            checkEQ(ALL.grade(0), GRADE0);
        });
        it("1", function () {
            checkEQ(ALL.grade(1), GRADE1);
        });
        it("2", function () {
            checkEQ(ALL.grade(2), GRADE2);
        });
        it("otherwise", function () {
            checkEQ(ALL.grade(9.5), zero);
        });
    });
    describe("isZero", function () {
        it("0", function () {
            const m = new Spacetime1();
            expect(m.isZero()).toBe(true);
        });
        it("a", function () {
            const m = new Spacetime1(1);
            expect(m.isZero()).toBe(false);
        });
        it("t", function () {
            const m = new Spacetime1(0, 1);
            expect(m.isZero()).toBe(false);
        });
        it("x", function () {
            const m = new Spacetime1(0, 0, 1);
            expect(m.isZero()).toBe(false);
        });
        it("b", function () {
            const m = new Spacetime1(0, 0, 0, 1);
            expect(m.isZero()).toBe(false);
        });
        it("ALL", function () {
            const m = new Spacetime1(1, 1, 1, 1);
            expect(m.isZero()).toBe(false);
        });
    });
    describe("add", function () {
        it("lhs non-zero", function () {
            const La = Math.random();
            const Lt = Math.random();
            const Lx = Math.random();
            const Lb = Math.random();
            const lhs = new Spacetime1(La, Lt, Lx, Lb);
            const Ra = Math.random();
            const Rt = Math.random();
            const Rx = Math.random();
            const Rb = Math.random();
            const rhs = new Spacetime1(Ra, Rt, Rx, Rb);
            const sum = lhs.add(rhs);
            // sum should be correct.
            expect(sum.a).toBe(La + Ra);
            expect(sum.t).toBe(Lt + Rt);
            expect(sum.x).toBe(Lx + Rx);
            expect(sum.b).toBe(Lb + Rb);
            // sum should be same as lhs.
            expect(sum === lhs).toBe(true);
            // rhs should not be modified.
            expect(rhs.a).toBe(Ra);
            expect(rhs.t).toBe(Rt);
            expect(rhs.x).toBe(Rx);
            expect(rhs.b).toBe(Rb);
        });
        it("lhs zero", function () {
            const lhs = new Spacetime1();
            const Ra = Math.random();
            const Rt = Math.random();
            const Rx = Math.random();
            const Rb = Math.random();
            const rhs = new Spacetime1(Ra, Rt, Rx, Rb);
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(Ra);
            expect(sum.t).toBe(Rt);
            expect(sum.x).toBe(Rx);
            expect(sum.b).toBe(Rb);
            // sum should be same as lhs.
            expect(sum === lhs).toBe(true);
            // rhs should not be modified.
            expect(rhs.a).toBe(Ra);
            expect(rhs.t).toBe(Rt);
            expect(rhs.x).toBe(Rx);
            expect(rhs.b).toBe(Rb);
        });
        it("rhs zero", function () {
            const La = Math.random();
            const Lt = Math.random();
            const Lx = Math.random();
            const Lb = Math.random();
            const lhs = new Spacetime1(La, Lt, Lx, Lb);
            const rhs = new Spacetime1();
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(La);
            expect(sum.t).toBe(Lt);
            expect(sum.x).toBe(Lx);
            expect(sum.b).toBe(Lb);
            // sum should be same as lhs.
            expect(sum === lhs).toBe(true);
            // rhs should not be modified.
            expect(rhs.a).toBe(0);
            expect(rhs.t).toBe(0);
            expect(rhs.x).toBe(0);
            expect(rhs.b).toBe(0);
        });
        it("lhs locked", function () {
            const La = Math.random();
            const Lt = Math.random();
            const Lx = Math.random();
            const Lb = Math.random();
            const lhs = new Spacetime1(La, Lt, Lx, Lb).permlock();
            const Ra = Math.random();
            const Rt = Math.random();
            const Rx = Math.random();
            const Rb = Math.random();
            const rhs = new Spacetime1(Ra, Rt, Rx, Rb);
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(La + Ra);
            expect(sum.t).toBe(Lt + Rt);
            expect(sum.x).toBe(Lx + Rx);
            expect(sum.b).toBe(Lb + Rb);
            expect(sum === lhs).toBe(false);
            // lhs should not be modified.
            expect(lhs.a).toBe(La);
            expect(lhs.t).toBe(Lt);
            expect(lhs.x).toBe(Lx);
            expect(lhs.b).toBe(Lb);
            // rhs should not be modified.
            expect(rhs.a).toBe(Ra);
            expect(rhs.t).toBe(Rt);
            expect(rhs.x).toBe(Rx);
            expect(rhs.b).toBe(Rb);
        });
    });
    describe("addScalar", function () {
        it("", function () {
            checkEQ(zero.addScalar(one.a, one.uom), zero.add(one));
            for (const blade of blades) {
                checkEQ(blade.addScalar(one.a, one.uom), blade.add(one));
                checkEQ(blade.addScalar(zero.a, zero.uom), blade.add(zero));
                checkEQ(blade.addScalar(one.a, one.uom, 0.5), blade.add(one.mulByNumber(0.5)));
            }
        });
    });
    describe("addVector", function () {
        it("e0 + e1", function () {
            const m = e0.addVector(e1);
            expect(m.a).toBe(0);
            expect(m.t).toBe(1);
            expect(m.x).toBe(1);
            expect(m.b).toBe(0);
        });
        it("e0 + 0", function () {
            const m = e0.addVector(zero);
            expect(m.a).toBe(0);
            expect(m.t).toBe(1);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("0 + e0", function () {
            const m = zero.addVector(e0);
            expect(m.a).toBe(0);
            expect(m.t).toBe(1);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("0 + e0 * 0.5", function () {
            const m = zero.addVector(e0, 0.5);
            expect(m.a).toBe(0);
            expect(m.t).toBe(0.5);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("0 + e1 * 0.5", function () {
            const m = zero.addVector(e1, 0.5);
            expect(m.a).toBe(0);
            expect(m.t).toBe(0);
            expect(m.x).toBe(0.5);
            expect(m.b).toBe(0);
        });
    });
    describe("div", function () {
        it("", function () {
            checkEQ(one.div(one), one);
            checkEQ(one.div(e0), e0);
            checkEQ(one.div(e1), e1.neg());
        });
        it("", function () {
            for (const blade of blades) {
                checkEQ(one.div(blade), blade.rev().div(blade.squaredNorm()));
            }
        });
        it("", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.div(rhs), lhs.mul(rhs.rev().div(rhs.squaredNorm())));
                }
            }
        });
    });
    describe("divByNumber", function () {
        it("", function () {
            for (const blade of blades) {
                checkEQ(blade.mulByNumber(2).divByNumber(2), blade);
            }
        });
    });
    describe("divByScalar", function () {
        it("", function () {
            for (const blade of blades) {
                checkEQ(blade.mul(meter).divByScalar(meter.a, meter.uom), blade);
            }
        });
    });
    describe("divByVector", function () {
        it("", function () {
            for (const blade of blades) {
                checkEQ(blade.mul(e0).divByVector(e0), blade);
                checkEQ(blade.mul(e1).divByVector(e1), blade);
            }
        });
    });
    describe("dual", function () {
        it("one", function () {
            checkEQ(one.dual(), one.lco(I.inv()));
        });
        it("e0", function () {
            checkEQ(e0.dual(), e0.lco(I.inv()));
        });
        it("e1", function () {
            checkEQ(e1.dual(), e1.lco(I.inv()));
        });
        it("I", function () {
            checkEQ(I.dual(), I.lco(I.inv()));
        });
    });
    describe("conj", function () {
        it("", function () {
            checkEQ(one.conj(), one);
            checkEQ(e0.conj(), e0.neg());
            checkEQ(e1.conj(), e1.neg());
            checkEQ(I.conj(), I.neg());
            checkEQ(meter.conj(), meter);
        });
    });
    describe("constants", function () {
        it("zero", function () {
            expect(zero.isZero()).toBe(true);
            expect(zero.isOne()).toBe(false);
            expect(Unit.isOne(zero.uom)).toBe(true);
            expect(zero.toString()).toBe("0");
            expect(zero.isScalar()).toBe(true);
            expect(zero.isSpinor()).toBe(true);
            expect(zero.isVector()).toBe(true);
            expect(zero.isBivector()).toBe(true);
        });
        it("one", function () {
            expect(one.isZero()).toBe(false);
            expect(one.isOne()).toBe(true);
            expect(Unit.isOne(one.uom)).toBe(true);
            expect(one.toString()).toBe("1");
            expect(one.isScalar()).toBe(true);
            expect(one.isSpinor()).toBe(true);
            expect(one.isVector()).toBe(false);
            expect(one.isBivector()).toBe(false);
        });
        it("e0", function () {
            expect(e0.isZero()).toBe(false);
            expect(e0.isOne()).toBe(false);
            expect(Unit.isOne(e0.uom)).toBe(true);
            expect(e0.toString()).toBe("e0");
            expect(e0.isScalar()).toBe(false);
            expect(e0.isSpinor()).toBe(false);
            expect(e0.isVector()).toBe(true);
            expect(e0.isBivector()).toBe(false);
        });
        it("e1", function () {
            expect(e1.isZero()).toBe(false);
            expect(e1.isOne()).toBe(false);
            expect(Unit.isOne(e1.uom)).toBe(true);
            expect(e1.toString()).toBe("e1");
            expect(e1.isScalar()).toBe(false);
            expect(e1.isSpinor()).toBe(false);
            expect(e1.isVector()).toBe(true);
            expect(e1.isBivector()).toBe(false);
        });
        it("I", function () {
            expect(I.isZero()).toBe(false);
            expect(I.isOne()).toBe(false);
            expect(Unit.isOne(I.uom)).toBe(true);
            expect(I.toString()).toBe("I");
            expect(I.isScalar()).toBe(false);
            expect(I.isSpinor()).toBe(true);
            expect(I.isVector()).toBe(false);
            expect(I.isBivector()).toBe(true);
        });
    });

    describe("equals", function () {
        it("identity", function () {
            for (const blade of blades) {
                expect(blade.equals(blade)).toBe(true);
                expect(blade.clone().equals(blade)).toBe(true);
            }
        });
        it("coords", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    if (lhs.scp(rhs).isZero()) {
                        expect(lhs.equals(rhs)).toBe(false);
                    }
                }
            }
        });
        it("units", function () {
            expect(meter.equals(meter)).toBe(true);
            expect(kilogram.equals(kilogram)).toBe(true);
            expect(meter.equals(kilogram)).toBe(false);
        });
        it("otherwise", function () {
            expect(one.equals(0)).toBe(false);
            expect(one.equals("0")).toBe(false);
            expect(one.equals(false)).toBe(false);
            expect(one.equals(1)).toBe(false);
            expect(one.equals("1")).toBe(false);
            expect(one.equals(true)).toBe(false);
        });
    });

    describe("mul", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.mul(one), one);
            });
            it("e0", function () {
                checkEQ(one.mul(e0), e0);
            });
            it("e1", function () {
                checkEQ(one.mul(e1), e1);
            });
            it("I", function () {
                checkEQ(one.mul(I), I);
            });
        });
        describe("e0", function () {
            it("one", function () {
                checkEQ(e0.mul(one), e0);
            });
            it("e0", function () {
                checkEQ(e0.mul(e0), one);
            });
            it("e1", function () {
                checkEQ(e0.mul(e1), I);
            });
            it("I", function () {
                checkEQ(e0.mul(I), e1);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.mul(one), e1);
            });
            it("e0", function () {
                checkEQ(e1.mul(e0), I.neg());
            });
            it("e1", function () {
                checkEQ(e1.mul(e1), one.neg());
            });
            it("I", function () {
                checkEQ(e1.mul(I), e0);
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.mul(one), I);
            });
            it("e0", function () {
                checkEQ(I.mul(e0), e1.neg());
            });
            it("e1", function () {
                checkEQ(I.mul(e1), e0.neg());
            });
            it("I", function () {
                checkEQ(I.mul(I), one);
            });
        });
    });
    describe("mulByScalar", function () {
        it("", function () {
            checkEQ(zero.mulByScalar(two.a, two.uom), zero.mul(one));
            for (const blade of blades) {
                checkEQ(blade.mulByScalar(two.a, two.uom), blade.mul(two));
                checkEQ(blade.mulByScalar(zero.a, zero.uom), blade.mul(zero));
                checkEQ(blade.mulByScalar(meter.a, meter.uom), blade.mul(meter));
            }
        });
    });
    describe("mulByVector", function () {
        it("", function () {
            for (const blade of blades) {
                checkEQ(blade.mulByVector(e0), blade.mul(e0));
                checkEQ(blade.mulByVector(e1), blade.mul(e1));
            }
        });
    });
    describe("ext", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.ext(one), one);
            });
            it("e0", function () {
                checkEQ(one.ext(e0), e0);
            });
            it("e1", function () {
                checkEQ(one.ext(e1), e1);
            });
            it("I", function () {
                checkEQ(one.ext(I), I);
            });
        });
        describe("e0", function () {
            it("one", function () {
                checkEQ(e0.ext(one), e0);
            });
            it("e0", function () {
                checkEQ(e0.ext(e0), zero);
            });
            it("e1", function () {
                checkEQ(e0.ext(e1), I);
            });
            it("I", function () {
                checkEQ(e0.ext(I), zero);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.ext(one), e1);
            });
            it("e0", function () {
                checkEQ(e1.ext(e0), I.neg());
            });
            it("e1", function () {
                checkEQ(e1.ext(e1), zero);
            });
            it("I", function () {
                checkEQ(e1.ext(I), zero);
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.ext(one), I);
            });
            it("e0", function () {
                checkEQ(I.ext(e0), zero);
            });
            it("e1", function () {
                checkEQ(I.ext(e1), zero);
            });
            it("I", function () {
                checkEQ(I.ext(I), zero);
            });
        });
    });
    describe("inv", function () {
        it("one", function () {
            checkEQ(one.inv(), one);
        });
        it("e0", function () {
            checkEQ(e0.inv(), e0);
        });
        it("e1", function () {
            checkEQ(e1.inv(), e1.neg());
        });
        it("I", function () {
            checkEQ(I.inv(), I);
        });
        it("", function () {
            for (const blade of blades) {
                checkEQ(blade.mul(blade.inv()), one);
            }
        });
        it("n+e0 should be (n-e0)/(n*n-1)", function () {
            checkEQ(two.add(e0).inv(), two.sub(e0).divByNumber(3));
        });
        it("n+e1 should be (n-e1)/(n*n+1)", function () {
            checkEQ(two.add(e1).inv(), two.sub(e1).divByNumber(5));
        });
        it("n+I should be (n-I)/(n*n-1)", function () {
            checkEQ(two.add(I).inv(), two.sub(I).divByNumber(3));
        });
    });
    describe("lco", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.lco(one), one);
            });
            it("e0", function () {
                checkEQ(one.lco(e0), e0);
            });
            it("e1", function () {
                checkEQ(one.lco(e1), e1);
            });
            it("I", function () {
                checkEQ(one.lco(I), I);
            });
        });
        describe("e0", function () {
            it("one", function () {
                checkEQ(e0.lco(one), zero);
            });
            it("e0", function () {
                checkEQ(e0.lco(e0), one);
            });
            it("e1", function () {
                checkEQ(e0.lco(e1), zero);
            });
            it("I", function () {
                checkEQ(e0.lco(I), e1);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.lco(one), zero);
            });
            it("e0", function () {
                checkEQ(e1.lco(e0), zero);
            });
            it("e1", function () {
                checkEQ(e1.lco(e1), one.neg());
            });
            it("I", function () {
                checkEQ(e1.lco(I), e0);
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.lco(one), zero);
            });
            it("e0", function () {
                checkEQ(I.lco(e0), zero);
            });
            it("e1", function () {
                checkEQ(I.lco(e1), zero);
            });
            it("I", function () {
                checkEQ(I.lco(I), one);
            });
        });
    });
    describe("quaditude", function () {
        it("should be an alias for squaredNorm", function () {
            for (const blade of blades) {
                checkEQ(blade.mul(two).quaditude(), blade.mul(two).squaredNorm());
            }
        });
    });
    describe("quaditudeNoUnit", function () {
        it("should be an alias for squaredNorm", function () {
            for (const blade of blades) {
                expect(blade.mul(two).quaditudeNoUnits()).toBe(blade.mul(two).squaredNorm().a);
            }
        });
        it("should be an alias for squaredNorm", function () {
            for (const blade of blades) {
                expect(blade.mul(two).quaditudeNoUnits()).toBe(blade.mul(two).squaredNorm().a);
            }
        });
    });
    describe("rco", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.rco(one), one);
            });
            it("e0", function () {
                checkEQ(one.rco(e0), zero);
            });
            it("e1", function () {
                checkEQ(one.rco(e1), zero);
            });
            it("I", function () {
                checkEQ(one.rco(I), zero);
            });
        });
        describe("e0", function () {
            it("one", function () {
                checkEQ(e0.rco(one), e0);
            });
            it("e0", function () {
                checkEQ(e0.rco(e0), one);
            });
            it("e1", function () {
                checkEQ(e0.rco(e1), zero);
            });
            it("I", function () {
                checkEQ(e0.rco(I), zero);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.rco(one), e1);
            });
            it("e0", function () {
                checkEQ(e1.rco(e0), zero);
            });
            it("e1", function () {
                checkEQ(e1.rco(e1), one.neg());
            });
            it("I", function () {
                checkEQ(e1.rco(I), zero);
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.rco(one), I);
            });
            it("e0", function () {
                checkEQ(I.rco(e0), e1.neg());
            });
            it("e1", function () {
                checkEQ(I.rco(e1), e0.neg());
            });
            it("I", function () {
                checkEQ(I.rco(I), one);
            });
        });
    });
    describe("reflect", function () {
        it("commutes with exterior product", function () {
            checkEQ(one.reflect(e0), one.neg());
            checkEQ(one.reflect(e1), one);

            checkEQ(e0.reflect(e0), e0.neg());
            checkEQ(e0.reflect(e1), e0.neg());

            checkEQ(e1.reflect(e0), e1);
            checkEQ(e1.reflect(e1), e1);

            checkEQ(I.reflect(e0), e0.reflect(e0).ext(e1.reflect(e0)));
            checkEQ(I.reflect(e1), e0.reflect(e1).ext(e1.reflect(e1)));
        });
        it("summary", function () {
            checkEQ(one.reflect(e0), one.neg());
            checkEQ(one.reflect(e1), one);

            checkEQ(e0.reflect(e0), e0.neg());
            checkEQ(e0.reflect(e1), e0.neg());

            checkEQ(e1.reflect(e0), e1);
            checkEQ(e1.reflect(e1), e1);

            checkEQ(I.reflect(e0), I.neg());
            checkEQ(I.reflect(e1), I.neg());
        });
        it("scaling", function () {
            for (const blade of blades) {
                checkEQ(blade.mul(two).reflect(e0), blade.reflect(e0).mul(two));
            }
        });
    });
    describe("rev", function () {
        it("", function () {
            checkEQ(one.rev(), one);
            checkEQ(e0.rev(), e0);
            checkEQ(e1.rev(), e1);
            checkEQ(I.rev(), I.neg());
            checkEQ(meter.rev(), meter);
        });
    });
    describe("scp", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.scp(one), one);
            });
            it("e0", function () {
                checkEQ(one.scp(e0), zero);
            });
            it("e1", function () {
                checkEQ(one.scp(e1), zero);
            });
            it("I", function () {
                checkEQ(one.scp(I), zero);
            });
        });
        describe("e0", function () {
            it("one", function () {
                checkEQ(e0.scp(one), zero);
            });
            it("e0", function () {
                checkEQ(e0.scp(e0), one);
            });
            it("e1", function () {
                checkEQ(e0.scp(e1), zero);
            });
            it("I", function () {
                checkEQ(e0.scp(I), zero);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.scp(one), zero);
            });
            it("e0", function () {
                checkEQ(e1.scp(e0), zero);
            });
            it("e1", function () {
                checkEQ(e1.scp(e1), one.neg());
            });
            it("I", function () {
                checkEQ(e1.scp(I), zero);
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.scp(one), zero);
            });
            it("e0", function () {
                checkEQ(I.scp(e0), zero);
            });
            it("e1", function () {
                checkEQ(I.scp(e1), zero);
            });
            it("I", function () {
                checkEQ(I.scp(I), one);
            });
        });
    });
    describe("scale", function () {
        it("zero", function () {
            const α = Math.random();
            const m = zero.scale(α);
            expect(m.a).toBe(0);
            expect(m.t).toBe(0);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("one", function () {
            const α = Math.random();
            const m = one.scale(α);
            expect(m.a).toBe(α);
            expect(m.t).toBe(0);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("e0", function () {
            const α = Math.random();
            const m = e0.scale(α);
            expect(m.a).toBe(0);
            expect(m.t).toBe(α);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("e1", function () {
            const α = Math.random();
            const m = e1.scale(α);
            expect(m.a).toBe(0);
            expect(m.t).toBe(0);
            expect(m.x).toBe(α);
            expect(m.b).toBe(0);
        });
        it("I", function () {
            const α = Math.random();
            const m = I.scale(α);
            expect(m.a).toBe(0);
            expect(m.t).toBe(0);
            expect(m.x).toBe(0);
            expect(m.b).toBe(α);
        });
    });
    describe("squaredNorm", function () {
        it("definition", function () {
            checkEQ(one.squaredNorm(), one.mul(one.rev()));
            checkEQ(e0.squaredNorm(), e0.mul(e0.rev()));
            checkEQ(e1.squaredNorm(), e1.mul(e1.rev()));
            checkEQ(I.squaredNorm(), I.mul(I.rev()));
        });
        it("simplified", function () {
            checkEQ(one.squaredNorm(), one);
            checkEQ(e0.squaredNorm(), one);
            checkEQ(e1.squaredNorm(), one.neg());
            checkEQ(I.squaredNorm(), one.neg());
        });
        it("scaling", function () {
            for (const blade of blades) {
                checkEQ(blade.mul(two).squaredNorm(), blade.mul(blade.rev()).mul(two).mul(two));
            }
        });
    });
    describe("sub", function () {
        it("lhs non-zero", function () {
            const La = Math.random();
            const Lt = Math.random();
            const Lx = Math.random();
            const Lb = Math.random();
            const lhs = new Spacetime1(La, Lt, Lx, Lb);
            const Ra = Math.random();
            const Rt = Math.random();
            const Rx = Math.random();
            const Rb = Math.random();
            const rhs = new Spacetime1(Ra, Rt, Rx, Rb);
            const sum = lhs.sub(rhs);
            // sum should be correct.
            expect(sum.a).toBe(La - Ra);
            expect(sum.t).toBe(Lt - Rt);
            expect(sum.x).toBe(Lx - Rx);
            expect(sum.b).toBe(Lb - Rb);
            // sum should be same as lhs.
            expect(sum === lhs).toBe(true);
            // rhs should not be modified.
            expect(rhs.a).toBe(Ra);
            expect(rhs.t).toBe(Rt);
            expect(rhs.x).toBe(Rx);
            expect(rhs.b).toBe(Rb);
        });
        it("lhs zero", function () {
            const lhs = new Spacetime1();
            const Ra = Math.random();
            const Rt = Math.random();
            const Rx = Math.random();
            const Rb = Math.random();
            const rhs = new Spacetime1(Ra, Rt, Rx, Rb);
            const sum = lhs.sub(rhs);
            expect(sum.a).toBe(-Ra);
            expect(sum.t).toBe(-Rt);
            expect(sum.x).toBe(-Rx);
            expect(sum.b).toBe(-Rb);
            // sum should be same as lhs.
            expect(sum === lhs).toBe(true);
            // rhs should not be modified.
            expect(rhs.a).toBe(Ra);
            expect(rhs.t).toBe(Rt);
            expect(rhs.x).toBe(Rx);
            expect(rhs.b).toBe(Rb);
        });
        it("rhs zero", function () {
            const La = Math.random();
            const Lt = Math.random();
            const Lx = Math.random();
            const Lb = Math.random();
            const lhs = new Spacetime1(La, Lt, Lx, Lb);
            const rhs = new Spacetime1();
            const sum = lhs.sub(rhs);
            expect(sum.a).toBe(La);
            expect(sum.t).toBe(Lt);
            expect(sum.x).toBe(Lx);
            expect(sum.b).toBe(Lb);
            // sum should be same as lhs.
            expect(sum === lhs).toBe(true);
            // rhs should not be modified.
            expect(rhs.a).toBe(0);
            expect(rhs.t).toBe(0);
            expect(rhs.x).toBe(0);
            expect(rhs.b).toBe(0);
        });
        it("lhs locked", function () {
            const La = Math.random();
            const Lt = Math.random();
            const Lx = Math.random();
            const Lb = Math.random();
            const lhs = new Spacetime1(La, Lt, Lx, Lb).permlock();
            const Ra = Math.random();
            const Rt = Math.random();
            const Rx = Math.random();
            const Rb = Math.random();
            const rhs = new Spacetime1(Ra, Rt, Rx, Rb);
            const sum = lhs.sub(rhs);
            expect(sum.a).toBe(La - Ra);
            expect(sum.t).toBe(Lt - Rt);
            expect(sum.x).toBe(Lx - Rx);
            expect(sum.b).toBe(Lb - Rb);
            expect(sum === lhs).toBe(false);
            // lhs should not be modified.
            expect(lhs.a).toBe(La);
            expect(lhs.t).toBe(Lt);
            expect(lhs.x).toBe(Lx);
            expect(lhs.b).toBe(Lb);
            // rhs should not be modified.
            expect(rhs.a).toBe(Ra);
            expect(rhs.t).toBe(Rt);
            expect(rhs.x).toBe(Rx);
            expect(rhs.b).toBe(Rb);
        });
    });
    describe("subScalar", function () {
        it("", function () {
            checkEQ(zero.subScalar(one.a, one.uom), zero.sub(one));
            for (const blade of blades) {
                checkEQ(blade.subScalar(one.a, one.uom), blade.sub(one));
                checkEQ(blade.subScalar(zero.a, zero.uom), blade.sub(zero));
                checkEQ(blade.subScalar(one.a, one.uom, 0.5), blade.sub(one.mulByNumber(0.5)));
            }
        });
    });
    describe("subVector", function () {
        it("e0 - e1", function () {
            const m = e0.subVector(e1);
            expect(m.a).toBe(0);
            expect(m.t).toBe(1);
            expect(m.x).toBe(-1);
            expect(m.b).toBe(0);
        });
        it("e0 - 0", function () {
            const m = e0.subVector(zero);
            expect(m.a).toBe(0);
            expect(m.t).toBe(1);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("0 - e0", function () {
            const m = zero.subVector(e0);
            expect(m.a).toBe(0);
            expect(m.t).toBe(-1);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("0 - e0 * 0.5", function () {
            const m = zero.subVector(e0, 0.5);
            expect(m.a).toBe(0);
            expect(m.t).toBe(-0.5);
            expect(m.x).toBe(0);
            expect(m.b).toBe(0);
        });
        it("0 - e1 * 0.5", function () {
            const m = zero.subVector(e1, 0.5);
            expect(m.a).toBe(0);
            expect(m.t).toBe(0);
            expect(m.x).toBe(-0.5);
            expect(m.b).toBe(0);
        });
    });
    describe("statics", function () {
        describe("scalar", function () {
            it("should initialize accessors.", function () {
                const a = Math.random();
                const s = Spacetime1.scalar(a, Unit.SECOND);
                expect(s.a).toBe(a);
                expect(s.t).toBe(0);
                expect(s.x).toBe(0);
                expect(s.b).toBe(0);
                expect(s.uom).toBe(Unit.SECOND);
            });
            it("should initialize accessors.", function () {
                const t = Math.random();
                const x = Math.random();
                const s = Spacetime1.vector(t, x, Unit.SECOND);
                expect(s.a).toBe(0);
                expect(s.t).toBe(t);
                expect(s.x).toBe(x);
                expect(s.b).toBe(0);
                expect(s.uom).toBe(Unit.SECOND);
            });
        });
    });
    describe("__add__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__add__(rhs), lhs.add(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__add__(2), lhs.add(two));
            }
        });
        it("(Unit)", function () {
            checkEQ(meter.__add__(Unit.METER), meter.add(meter));
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__add__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__radd__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__radd__(lhs), lhs.add(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__radd__(2), two.add(rhs));
            }
        });
        it("(Unit)", function () {
            checkEQ(meter.__radd__(Unit.METER), meter.add(meter));
        });
        it("otherwise", function () {
            expect(one.__radd__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__sub__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__sub__(rhs), lhs.sub(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__sub__(2), lhs.sub(two));
            }
        });
        it("(Unit)", function () {
            checkEQ(meter.__sub__(Unit.METER), meter.sub(meter));
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__sub__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rsub__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rsub__(lhs), lhs.sub(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rsub__(2), two.sub(rhs));
            }
        });
        it("(Unit)", function () {
            checkEQ(meter.__rsub__(Unit.METER), meter.sub(meter));
        });
        it("otherwise", function () {
            expect(one.__rsub__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__mul__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__mul__(rhs), lhs.mul(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__mul__(2), lhs.mul(two));
            }
        });
        it("(Unit)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__mul__(Unit.METER), lhs.mul(meter));
            }
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__mul__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rmul__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rmul__(lhs), lhs.mul(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rmul__(2), two.mul(rhs));
            }
        });
        it("(Unit)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rmul__(Unit.METER), meter.mul(rhs));
            }
        });
        it("otherwise", function () {
            expect(one.__rmul__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__div__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__div__(rhs), lhs.div(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__div__(2), lhs.div(two));
            }
        });
        it("(Unit)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__div__(Unit.METER), lhs.div(meter));
            }
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__div__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rdiv__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rdiv__(lhs), lhs.div(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rdiv__(2), two.div(rhs));
            }
        });
        it("(Unit)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rdiv__(Unit.METER), meter.div(rhs));
            }
        });
        it("otherwise", function () {
            expect(one.__rdiv__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__vbar__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__vbar__(rhs), lhs.scp(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__vbar__(2), lhs.scp(two));
            }
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__vbar__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rvbar__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rvbar__(lhs), lhs.scp(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rvbar__(2), two.scp(rhs));
            }
        });
        it("otherwise", function () {
            expect(one.__rvbar__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__wedge__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__wedge__(rhs), lhs.ext(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__wedge__(2), lhs.ext(two));
            }
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__wedge__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rwedge__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rwedge__(lhs), lhs.ext(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rwedge__(2), two.ext(rhs));
            }
        });
        it("otherwise", function () {
            expect(one.__rwedge__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__lshift__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__lshift__(rhs), lhs.lco(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__lshift__(2), lhs.lco(two));
            }
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__lshift__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rlshift__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rlshift__(lhs), lhs.lco(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rlshift__(2), two.lco(rhs));
            }
        });
        it("otherwise", function () {
            expect(one.__rlshift__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__rshift__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__rshift__(rhs), lhs.rco(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const lhs of blades) {
                checkEQ(lhs.__rshift__(2), lhs.rco(two));
            }
        });
        it("otherwise", function () {
            for (const lhs of blades) {
                expect(lhs.__rshift__("" as unknown as Spacetime1)).toBeUndefined();
            }
        });
    });
    describe("__rrshift__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(rhs.__rrshift__(lhs), lhs.rco(rhs));
                }
            }
        });
        it("(number)", function () {
            for (const rhs of blades) {
                checkEQ(rhs.__rrshift__(2), two.rco(rhs));
            }
        });
        it("otherwise", function () {
            expect(one.__rrshift__("" as unknown as Spacetime1)).toBeUndefined();
        });
    });
    describe("__tilde__", function () {
        it("should be the operator overload of reversion", function () {
            for (const blade of blades) {
                checkEQ(blade.__tilde__(), blade.rev());
            }
        });
    });
    describe("__pos__", function () {
        it("should be the operator overload of identity", function () {
            for (const blade of blades) {
                checkEQ(blade.__pos__(), blade);
            }
        });
    });
    describe("__neg__", function () {
        it("should be the operator overload of negation", function () {
            for (const blade of blades) {
                checkEQ(blade.__neg__(), blade.neg());
            }
        });
    });
    describe("__bang__", function () {
        it("should be the operator overload of inverse", function () {
            for (const blade of blades) {
                checkEQ(blade.__bang__(), blade.inv());
            }
        });
    });
    describe("__eq__", function () {
        it("should be the operator overload of equals", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    expect(lhs.__eq__(rhs)).toBe(lhs.equals(rhs));
                }
                expect(lhs.__eq__(1)).toBe(lhs.equals(one));
                expect(lhs.__eq__(Unit.ONE)).toBe(lhs.equals(one));
                expect(lhs.__eq__(Unit.METER)).toBe(lhs.equals(meter));
                expect(lhs.__eq__("1" as unknown as Unit)).toBe(false);
            }
        });
        it("", function () {
            expect(one.__eq__(Unit.ONE)).toBe(true);
            expect(meter.__eq__(Unit.METER)).toBe(true);
            expect(one.__eq__(Unit.METER)).toBe(false);
            expect(meter.__eq__(Unit.ONE)).toBe(false);
        });
    });
    describe("__ne__", function () {
        it("should be the operator overload of !equals", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    expect(lhs.__ne__(rhs)).toBe(!lhs.equals(rhs));
                }
                expect(lhs.__ne__(1)).toBe(!lhs.equals(one));
                expect(lhs.__ne__(Unit.ONE)).toBe(!lhs.equals(one));
                expect(lhs.__ne__(Unit.METER)).toBe(!lhs.equals(meter));
                expect(lhs.__ne__("1" as unknown as Unit)).toBe(true);
            }
        });
    });
});
