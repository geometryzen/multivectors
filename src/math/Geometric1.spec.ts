import { Geometric1, lock } from "./Geometric1";
import { ignoreNegativeZero } from "./ignoreNegativeZero";
import { Unit } from "./Unit";

/**
 * @hidden
 */
const zero = Geometric1.zero;
/**
 * @hidden
 */
const one = Geometric1.one;
/**
 * @hidden
 */
const two = Geometric1.one.mulByNumber(2);
/**
 * @hidden
 */
const e1 = Geometric1.e1;
/**
 * @hidden
 */
const I = e1;
/**
 * @hidden
 */
const blades = [one, e1];
/**
 * @hidden
 */
const kilogram = Geometric1.kilogram;
/**
 * @hidden
 */
const meter = Geometric1.meter;

/**
 * @hidden
 */
function checkEQ(result: Geometric1, comp: Geometric1): void {
    expect(ignoreNegativeZero(result.a)).toBe(ignoreNegativeZero(comp.a));
    expect(ignoreNegativeZero(result.x)).toBe(ignoreNegativeZero(comp.x));
    expect(Unit.isCompatible(result.uom, comp.uom)).toBe(true);
    expect(result.isLocked()).toBe(comp.isLocked());
    expect(result.isMutable()).toBe(comp.isMutable());
}

describe("Geometric1", function () {
    describe("constructor", function () {
        it("with no args should be zero.", function () {
            const m = new Geometric1();
            expect(m).toBeDefined();
            expect(m.a).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("with scalar value and unit should work.", function () {
            const a = Math.random();
            const m = new Geometric1([a, 0], Unit.KELVIN);
            expect(m).toBeDefined();
            expect(m.a).toBe(a);
            expect(m.uom).toBe(Unit.KELVIN);
        });
        it("", function () {
            expect(function () {
                const m = new Geometric1([1, 2, 3] as unknown[] as [number, number]);
                // Keep the compiler happy.
                expect(m).toBeDefined();
                fail();
            }).toThrowError("coords.length must be 2.");
        });
    });
    describe("a", function () {
        it("should support getter and setter.", function () {
            const m = new Geometric1();
            const a = Math.random();
            const x = Math.random();
            m.a = a;
            m.x = x;
            expect(m.a).toBe(a);
        });
        it("should prevent mutation when locked", function () {
            expect(function () {
                const m = new Geometric1();
                m.lock();
                const a = Math.random();
                m.a = a;
            }).toThrowError("Property `a` is readonly.");
        });
    });
    describe("x", function () {
        it("should support getter and setter.", function () {
            const m = new Geometric1();
            const a = Math.random();
            const x = Math.random();
            m.a = a;
            m.x = x;
            expect(m.x).toBe(x);
        });
        it("should prevent mutation when locked", function () {
            expect(function () {
                const m = new Geometric1();
                m.lock();
                const x = Math.random();
                m.x = x;
            }).toThrowError("Property `x` is readonly.");
        });
    });
    describe("uom", function () {
        it("should support getter and setter.", function () {
            const m = new Geometric1();
            m.uom = Unit.KELVIN;
            expect(m.uom).toBe(Unit.KELVIN);
        });
        it("should prevent mutation when locked", function () {
            expect(function () {
                const m = new Geometric1();
                m.lock();
                m.uom = Unit.MOLE;
            }).toThrowError("Property `uom` is readonly.");
        });
    });
    describe("grades", function () {
        it("", function () {
            expect(Geometric1.scalar(0).grades).toBe(0x0);
            expect(Geometric1.scalar(1).grades).toBe(0x1);
            expect(Geometric1.vector(0).grades).toBe(0x0);
            expect(Geometric1.vector(1).grades).toBe(0x2);
            expect(new Geometric1([1, 1]).grades).toBe(0x3);
        });
    });
    describe("grade", function () {
        const GRADE0 = zero.add(one);
        const GRADE1 = zero.add(e1);
        const ALL = GRADE0.add(GRADE1);
        it("sanity check", function () {
            expect(ALL.a).toBe(1);
            expect(ALL.x).toBe(1);
        });
        it("0", function () {
            checkEQ(ALL.grade(0), GRADE0);
        });
        it("1", function () {
            checkEQ(ALL.grade(1), GRADE1);
        });
        it("otherwise", function () {
            checkEQ(ALL.grade(9.5), zero);
        });
    });
    describe("add", function () {
        it("lhs.isMutable, alpha=undefined", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const sum = lhs.add(rhs);
            const comp = new Geometric1([La + Ra, Lx + Rx], Unit.CANDELA);
            checkEQ(sum, comp);
        });
        it("lhs.isMutable, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const sum = lhs.add(rhs, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx + 0.5 * Rx], Unit.CANDELA);
            checkEQ(sum, comp);
        });
        it("lhs.isLocked, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            lhs.lock();
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const sum = lhs.add(rhs, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx + 0.5 * Rx], Unit.CANDELA);
            comp.lock();
            checkEQ(sum, comp);
        });
        it("lhs.isZero, alpha=0.5", function () {
            const La = 0;
            const Lx = 0;
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.MOLE);
            lhs.lock();
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const sum = lhs.add(rhs, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx + 0.5 * Rx], Unit.CANDELA);
            comp.lock();
            checkEQ(sum, comp);
        });
        it("lhs.isLocked, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Lu = Unit.MOLE;
            const Ra = 0;
            const Rx = 0;
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Lu);
            lhs.lock();
            const rhs = new Geometric1([Ra, Rx], Ru);
            const sum = lhs.add(rhs, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx + 0.5 * Rx], Lu);
            comp.lock();
            checkEQ(sum, comp);
        });
    });
    describe("addScalar", function () {
        it("lhs.isMutable, alpha=undefined", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const sum = lhs.addScalar(Ra, Unit.CANDELA);
            const comp = new Geometric1([La + Ra, Lx], Unit.CANDELA);
            checkEQ(sum, comp);
        });
        it("lhs.isMutable, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const sum = lhs.addScalar(Ra, Unit.CANDELA, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx], Unit.CANDELA);
            checkEQ(sum, comp);
        });
        it("lhs.isLocked, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            lhs.lock();
            const sum = lhs.addScalar(Ra, Unit.CANDELA, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx], Unit.CANDELA);
            comp.lock();
            checkEQ(sum, comp);
        });
        it("lhs.isZero, alpha=0.5", function () {
            const La = 0;
            const Lx = 0;
            const Ra = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.MOLE);
            lhs.lock();
            const sum = lhs.addScalar(Ra, Unit.CANDELA, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx], Unit.CANDELA);
            comp.lock();
            checkEQ(sum, comp);
        });
        it("lhs.isLocked, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Lu = Unit.MOLE;
            const Ra = 0;
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Lu);
            lhs.lock();
            const sum = lhs.addScalar(Ra, Ru, 0.5);
            const comp = new Geometric1([La + 0.5 * Ra, Lx], Lu);
            comp.lock();
            checkEQ(sum, comp);
        });
    });
    describe("clone", function () {
        it("should copy a", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            const clone = mv.clone();
            expect(clone.a).toBe(a);
        });
        it("should copy x", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            const clone = mv.clone();
            expect(clone.x).toBe(x);
        });
        it("should copy uom", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            const clone = mv.clone();
            expect(clone.uom).toBe(Unit.KELVIN);
        });
        it("should be mutable if original was mutable", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            const clone = mv.clone();
            expect(clone.isMutable()).toBe(true);
        });
        it("should be mutable if original was locked", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            mv.lock();
            const clone = mv.clone();
            expect(clone.isMutable()).toBe(true);
        });
        it("should be mutable if original was mutable", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            const clone = mv.clone();
            expect(clone === mv).toBe(false);
        });
    });
    describe("conj", function () {
        it("one", function () {
            checkEQ(one.conj(), one);
        });
        it("e1", function () {
            checkEQ(e1.conj(), e1.neg());
        });
    });
    describe("copy", function () {
        it("", function () {
            const a = Math.random();
            const x = Math.random();
            const original = new Geometric1([a, x], Unit.METER).permlock();
            const target = new Geometric1().permlock();
            const copied = target.copy(original);
            checkEQ(copied, original);
        });
    });
    describe("copyVector", function () {
        it("", function () {
            const x = Math.random();
            const original = new Geometric1([0, x], Unit.METER).permlock();
            const target = new Geometric1([1, 2]).permlock();
            const copied = target.copyVector(original);
            checkEQ(copied, original);
        });
    });
    describe("dual", function () {
        it("", function () {
            checkEQ(one.dual(), e1);
            checkEQ(e1.dual(), one);
        });
        it("dual(Ak) = Ak << inv(I)", function () {
            for (const blade of blades) {
                checkEQ(blade.dual(), blade.lco(I.rev()));
                checkEQ(blade.dual(), blade.lco(I.inv()));
            }
        });
    });
    describe("equals", function () {
        it("blades", function () {
            for (const blade of blades) {
                expect(blade.equals(blade)).toBe(true);
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
    describe("isLocked", function () {
        it("should be unlocked using constructor.", function () {
            const m = new Geometric1();
            expect(m.isLocked()).toBe(false);
        });
    });
    describe("isMutable", function () {
        it("should be mutable using constructor.", function () {
            const m = new Geometric1();
            expect(m.isMutable()).toBe(true);
        });
    });
    describe("lco", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.lco(one), one);
            });
            it("e1", function () {
                checkEQ(one.lco(e1), e1);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e1.lco(e1), one);
            });
        });
    });
    describe("lock/unlock", function () {
        it("should be mutable using constructor.", function () {
            const m = new Geometric1();
            const token = m.lock();
            expect(m.isLocked()).toBe(true);
            expect(m.isMutable()).toBe(false);
            m.unlock(token);
            expect(m.isLocked()).toBe(false);
            expect(m.isMutable()).toBe(true);
        });
    });
    describe("lock() applied to a locked", function () {
        it("should throw an Error.", function () {
            const m = new Geometric1();
            m.lock();
            expect(function () {
                m.lock();
                fail();
            }).toThrowError("already locked");
        });
    });
    describe("mul", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.mul(one), one);
            });
            it("e1", function () {
                checkEQ(one.mul(e1), e1);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.mul(one), e1);
            });
            it("e1", function () {
                checkEQ(e1.mul(e1), one);
            });
        });
    });
    describe("unlock() applied to an unlocked", function () {
        it("should throw an Error.", function () {
            const m = new Geometric1();
            expect(function () {
                const token = Math.random();
                m.unlock(token);
                fail();
            }).toThrowError("not locked");
        });
    });
    describe("unlock() with the wrong token", function () {
        it("should throw an Error.", function () {
            const m = new Geometric1();
            m.lock();
            expect(function () {
                const token = Math.random();
                m.unlock(token);
                fail();
            }).toThrowError("unlock denied");
        });
    });
    describe("isOne", function () {
        it("one", function () {
            const one = new Geometric1([1, 0]);
            expect(one.isOne()).toBe(true);
        });
        it("two", function () {
            const two = new Geometric1([2, 0]);
            expect(two.isOne()).toBe(false);
        });
        it("1 + e1", function () {
            const mv = new Geometric1([1, 1]);
            expect(mv.isOne()).toBe(false);
        });
        it("kg", function () {
            const kg = new Geometric1([1, 0], Unit.KILOGRAM);
            expect(kg.isOne()).toBe(false);
        });
    });
    describe("isZero", function () {
        it("zero", function () {
            const zero = new Geometric1([0, 0]);
            expect(zero.isZero()).toBe(true);
        });
        it("one", function () {
            const one = new Geometric1([1, 0]);
            expect(one.isZero()).toBe(false);
        });
        it("e1", function () {
            const mv = new Geometric1([0, 1]);
            expect(mv.isZero()).toBe(false);
        });
        it("0 * kg", function () {
            const kg = new Geometric1([0, 0], Unit.KILOGRAM);
            expect(kg.isZero()).toBe(true);
        });
    });
    describe("norm", function () {
        it("mutable", function () {
            const a = Math.random();
            const x = Math.random();
            const M = new Geometric1([a, x], Unit.METER);
            const norm = M.magnitude();
            const comp = new Geometric1([Math.sqrt(a * a + x * x), 0], Unit.METER);
            checkEQ(norm, comp);
            expect(norm === M).toBe(true);
        });
        it("locked", function () {
            const a = Math.random();
            const x = Math.random();
            const M = new Geometric1([a, x], Unit.METER);
            M.lock();
            const norm = M.magnitude();
            const comp = lock(new Geometric1([Math.sqrt(a * a + x * x), 0], Unit.METER));
            checkEQ(norm, comp);
            expect(norm !== M).toBe(true);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.uom).toBe(Unit.METER);
        });
    });
    describe("quad", function () {
        it("mutable", function () {
            const a = Math.random();
            const x = Math.random();
            const M = new Geometric1([a, x], Unit.METER);
            const norm = M.quaditude();
            const comp = new Geometric1([a * a + x * x, 0], Unit.mul(Unit.METER, Unit.METER));
            checkEQ(norm, comp);
            expect(norm === M).toBe(true);
        });
        it("locked", function () {
            const a = Math.random();
            const x = Math.random();
            const M = new Geometric1([a, x], Unit.METER);
            M.lock();
            const norm = M.quaditude();
            const comp = lock(new Geometric1([a * a + x * x, 0], Unit.mul(Unit.METER, Unit.METER)));
            checkEQ(norm, comp);
            expect(norm !== M).toBe(true);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.uom).toBe(Unit.METER);
        });
    });
    describe("rco", function () {
        describe("one", function () {
            it("one", function () {
                checkEQ(one.rco(one), one);
            });
            it("e1", function () {
                checkEQ(one.rco(e1), zero);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.rco(one), e1);
            });
            it("e1", function () {
                checkEQ(e1.rco(e1), one);
            });
        });
    });
    describe("scale", function () {
        it("mutable", function () {
            const a = 3; // Math.random();
            const x = 5; // Math.random();
            const M = new Geometric1([a, x], Unit.METER);
            const norm = M.scale(2);
            const comp = new Geometric1([2 * a, 2 * x], Unit.METER);
            checkEQ(norm, comp);
            expect(norm === M).toBe(true);
        });
        it("locked", function () {
            const a = 7; // Math.random();
            const x = 11; // Math.random();
            const M = new Geometric1([a, x], Unit.METER);
            M.lock();
            const norm = M.scale(2);
            const comp = lock(new Geometric1([2 * a, 2 * x], Unit.METER));
            checkEQ(norm, comp);
            expect(norm !== M).toBe(true);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.uom).toBe(Unit.METER);
        });
    });
    describe("scale", function () {
        it("is a shortcut for full scalar multiplication", function () {
            const x = Math.random();
            checkEQ(one.scale(x), one.mul(Geometric1.scalar(x)));
            checkEQ(e1.scale(x), e1.mul(Geometric1.scalar(x)));
        });
    });
    describe("sub", function () {
        it("lhs.isMutable, alpha=undefined", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const result = lhs.sub(rhs);
            const comp = new Geometric1([La - Ra, Lx - Rx], Unit.CANDELA);
            checkEQ(result, comp);
        });
        it("lhs.isMutable, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const result = lhs.sub(rhs, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx - 0.5 * Rx], Unit.CANDELA);
            checkEQ(result, comp);
        });
        it("lhs.isLocked, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Rx = Math.random();
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            lhs.lock();
            const rhs = new Geometric1([Ra, Rx], Unit.CANDELA);
            const result = lhs.sub(rhs, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx - 0.5 * Rx], Unit.CANDELA);
            comp.lock();
            checkEQ(result, comp);
        });
        it("lhs.isZero, alpha=0.5", function () {
            const La = 0;
            const Lx = 0;
            const Lu = Unit.MOLE;
            const Ra = Math.random();
            const Rx = Math.random();
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Lu);
            lhs.lock();
            const rhs = new Geometric1([Ra, Rx], Ru);
            const result = lhs.sub(rhs, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx - 0.5 * Rx], Ru);
            comp.lock();
            checkEQ(result, comp);
        });
        it("rhs.isZero, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Lu = Unit.MOLE;
            const Ra = 0;
            const Rx = 0;
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Lu);
            lhs.lock();
            const rhs = new Geometric1([Ra, Rx], Ru);
            const result = lhs.sub(rhs, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx - 0.5 * Rx], Lu);
            comp.lock();
            checkEQ(result, comp);
        });
    });
    describe("subScalar", function () {
        it("lhs.isMutable, alpha=undefined", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const result = lhs.subScalar(Ra, Ru);
            const comp = new Geometric1([La - Ra, Lx], Unit.CANDELA);
            checkEQ(result, comp);
        });
        it("lhs.isMutable, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            const result = lhs.subScalar(Ra, Ru, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx], Unit.CANDELA);
            checkEQ(result, comp);
        });
        it("lhs.isLocked, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Ra = Math.random();
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Unit.CANDELA);
            lhs.lock();
            const result = lhs.subScalar(Ra, Ru, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx], Unit.CANDELA);
            comp.lock();
            checkEQ(result, comp);
        });
        it("lhs.isZero, alpha=0.5", function () {
            const La = 0;
            const Lx = 0;
            const Lu = Unit.MOLE;
            const Ra = Math.random();
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Lu);
            lhs.lock();
            const result = lhs.subScalar(Ra, Ru, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx], Ru);
            comp.lock();
            checkEQ(result, comp);
        });
        it("rhs.isZero, alpha=0.5", function () {
            const La = Math.random();
            const Lx = Math.random();
            const Lu = Unit.MOLE;
            const Ra = 0;
            const Ru = Unit.CANDELA;
            const lhs = new Geometric1([La, Lx], Lu);
            lhs.lock();
            const result = lhs.subScalar(Ra, Ru, 0.5);
            const comp = new Geometric1([La - 0.5 * Ra, Lx], Lu);
            comp.lock();
            checkEQ(result, comp);
        });
    });
    describe("zero", function () {
        it("(), target isMutable", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x]);
            expect(mv.isMutable()).toBe(true);
            const result = mv.zero();
            expect(result.a).toBe(0);
            expect(result.x).toBe(0);
            expect(result.uom).toBe(Unit.ONE);
            expect(result === mv).toBe(true);
            expect(result.isMutable()).toBe(true);
        });
        it("(), target isLocked", function () {
            const a = Math.random();
            const x = Math.random();
            const mv = new Geometric1([a, x], Unit.KELVIN);
            mv.lock();
            expect(mv.isLocked()).toBe(true);
            const result = mv.zero();
            expect(result.a).toBe(0);
            expect(result.x).toBe(0);
            expect(result.uom).toBe(Unit.ONE);
            expect(result === mv).toBe(false);
            expect(result.isLocked()).toBe(true);
            expect(mv.a).toBe(a);
            expect(mv.x).toBe(x);
            expect(mv.uom).toBe(Unit.KELVIN);
        });
    });
    describe("__add__", function () {
        it("", function () {
            const wA = Geometric1.scalar(1, Unit.METER);
            const wB = Geometric1.scalar(1, Unit.METER);
            expect(wA.a).toBe(1);
            expect(wA.x).toBe(0);
            expect(wA.uom).toBe(Unit.METER);
            expect(wB.a).toBe(1);
            expect(wB.x).toBe(0);
            expect(wB.uom).toBe(Unit.METER);
            const d = wA.__add__(wB);
            checkEQ(d, lock(Geometric1.scalar(2, Unit.METER)));
        });
    });
    describe("__add__", function () {
        it("(Geometric)", function () {
            checkEQ(one.__add__(two), one.add(two));
        });
        it("(number)", function () {
            checkEQ(one.__add__(2), one.add(two));
        });
        it("otherwise", function () {
            expect(one.__add__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__radd__", function () {
        it("(Geometric)", function () {
            checkEQ(one.__radd__(one), one.add(one));
        });
        it("(number)", function () {
            checkEQ(one.__radd__(1), one.add(one));
        });
        it("(Unit)", function () {
            checkEQ(one.__radd__(Unit.ONE), one.add(one));
        });
        it("otherwise", function () {
            expect(one.__radd__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__sub__", function () {
        it("(Geometric)", function () {
            checkEQ(one.__sub__(two), one.sub(two));
        });
        it("(number)", function () {
            checkEQ(one.__sub__(2), one.sub(two));
        });
        it("otherwise", function () {
            expect(one.__sub__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rsub__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rsub__(one), one.sub(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rsub__(2), two.sub(one));
        });
        it("otherwise", function () {
            expect(one.__rsub__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__mul__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__mul__(one), e1.mul(one));
        });
        it("(number)", function () {
            checkEQ(one.__mul__(2), one.mul(two));
        });
        it("otherwise", function () {
            expect(one.__mul__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rmul__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rmul__(two), two.mul(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rmul__(2), two.mul(one));
        });
        it("otherwise", function () {
            expect(one.__rmul__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__div__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__div__(two), e1.div(two));
        });
        it("(number)", function () {
            checkEQ(one.__div__(2), one.div(two));
        });
        it("otherwise", function () {
            expect(one.__div__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rdiv__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rdiv__(two), two.div(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rdiv__(2), two.div(one));
        });
        it("otherwise", function () {
            expect(one.__rdiv__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__lshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__lshift__(two), e1.lco(two));
        });
        it("(number)", function () {
            checkEQ(one.__lshift__(2), one.lco(two));
        });
        it("otherwise", function () {
            expect(one.__lshift__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rlshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rlshift__(two), two.lco(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rlshift__(2), two.lco(one));
        });
        it("otherwise", function () {
            expect(one.__rlshift__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rshift__(two), e1.rco(two));
        });
        it("(number)", function () {
            checkEQ(one.__rshift__(2), one.rco(two));
        });
        it("otherwise", function () {
            expect(one.__rshift__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rrshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rrshift__(two), two.rco(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rrshift__(2), two.rco(one));
        });
        it("otherwise", function () {
            expect(one.__rrshift__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__vbar__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__vbar__(two), e1.scp(two));
        });
        it("(number)", function () {
            checkEQ(one.__vbar__(2), one.scp(two));
        });
        it("otherwise", function () {
            expect(one.__vbar__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rvbar__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rvbar__(two), e1.scp(two));
        });
        it("(number)", function () {
            checkEQ(one.__rvbar__(2), one.scp(two));
        });
        it("otherwise", function () {
            expect(one.__rvbar__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__wedge__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__wedge__(two), e1.ext(two));
        });
        it("(number)", function () {
            checkEQ(one.__wedge__(2), one.ext(two));
        });
        it("otherwise", function () {
            expect(one.__wedge__("" as unknown as Geometric1)).toBeUndefined();
        });
    });
    describe("__rwedge__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rwedge__(two), two.ext(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rwedge__(2), two.ext(one));
        });
        it("otherwise", function () {
            expect(one.__rwedge__("" as unknown as Geometric1)).toBeUndefined();
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
