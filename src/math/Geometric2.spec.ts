import { Geometric2 } from "./Geometric2";
import { ignoreNegativeZero } from "./ignoreNegativeZero";
import { Unit } from "./Unit";

const zero = Geometric2.zero;
const one = Geometric2.one;
const two = Geometric2.one.mulByNumber(2);
const e1 = Geometric2.e1;
const e2 = Geometric2.e2;
const e12 = Geometric2.e1.mul(Geometric2.e2);
const I = e12;
const blades = [one, e1, e2, e12];
const meter = Geometric2.meter;
const kilogram = Geometric2.kilogram;

/**
 * @hidden
 */
function checkEQ(result: Geometric2, comp: Geometric2): void {
    expect(result.a).toBe(comp.a);
    expect(result.x).toBe(comp.x);
    expect(ignoreNegativeZero(result.y)).toBe(ignoreNegativeZero(comp.y));
    expect(ignoreNegativeZero(result.xy)).toBe(ignoreNegativeZero(comp.xy));
    expect(ignoreNegativeZero(result.b)).toBe(ignoreNegativeZero(comp.b));
    expect(Unit.isCompatible(result.uom, comp.uom)).toBe(true);
    expect(result.isLocked()).toBe(comp.isLocked());
    expect(result.isMutable()).toBe(comp.isMutable());
}

describe("Geometric2", function () {
    describe("constructor", function () {
        it("empty", function () {
            const M = new Geometric2();
            expect(M.a).toBe(0);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(false);
        });
        it("coordinates", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(4);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(false);
        });
        it("uom", function () {
            const M = new Geometric2([1, 2, 3, 4], Unit.KILOGRAM);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(4);
            expect(M.uom).toBe(Unit.KILOGRAM);
            expect(M.isLocked()).toBe(false);
        });
        it("should throw Error when coords.length is not 4.", function () {
            expect(function () {
                const M = new Geometric2([] as unknown[] as [number, number, number, number]);
                M.toString();
            }).toThrowError("coords.length must be 4");
        });
    });
    describe("static", function () {
        it("scalar", function () {
            const a = Math.random();
            const M = Geometric2.scalar(a, Unit.METER);
            expect(M.a).toBe(a);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.METER);
            expect(M.isLocked()).toBe(false);
        });
        it("bivector", function () {
            const b = Math.random();
            const M = Geometric2.bivector(b, Unit.JOULE);
            expect(M.a).toBe(0);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.JOULE);
            expect(M.isLocked()).toBe(false);
        });
        it("spinor", function () {
            const a = Math.random();
            const b = Math.random();
            const M = Geometric2.spinor(a, b, Unit.ONE);
            expect(M.a).toBe(a);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.ONE);
            expect(M.isLocked()).toBe(false);
        });
        describe("vector", function () {
            it("should work for x and y numbers", function () {
                const x = Math.random();
                const y = Math.random();
                const M = Geometric2.vector(x, y, Unit.AMPERE);
                expect(M.a).toBe(0);
                expect(M.x).toBe(x);
                expect(M.y).toBe(y);
                expect(M.b).toBe(0);
                expect(M.uom).toBe(Unit.AMPERE);
                expect(M.isLocked()).toBe(false);
            });
            it("should throw Error for x undefined", function () {
                expect(function () {
                    Geometric2.vector(void 0, Math.random(), Unit.AMPERE);
                }).toThrowError("x must be a `number` in Geometric2.vector(x: number, y: number, uom?: Unit): Geometric2.");
            });
            it("should throw Error for y undefined", function () {
                expect(function () {
                    Geometric2.vector(Math.random(), void 0, Unit.AMPERE);
                }).toThrowError("y must be a `number` in Geometric2.vector(x: number, y: number, uom?: Unit): Geometric2.");
            });
        });
        it("copy", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const M = new Geometric2([a, x, y, b], Unit.AMPERE);
            const K = Geometric2.copy(M);
            expect(K.a).toBe(a);
            expect(K.x).toBe(x);
            expect(K.y).toBe(y);
            expect(K.b).toBe(b);
            expect(K.uom).toBe(Unit.AMPERE);
            expect(K.isLocked()).toBe(false);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.y).toBe(y);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.AMPERE);
            expect(M.isLocked()).toBe(false);
        });
        it("fromBivector", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const M = new Geometric2([a, x, y, b], Unit.AMPERE);
            const K = Geometric2.fromBivector(M);
            expect(K.a).toBe(0);
            expect(K.x).toBe(0);
            expect(K.y).toBe(0);
            expect(K.b).toBe(b);
            expect(K.uom).toBe(Unit.AMPERE);
            expect(K.isLocked()).toBe(false);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.y).toBe(y);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.AMPERE);
            expect(M.isLocked()).toBe(false);
        });
        it("fromScalar", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const M = new Geometric2([a, x, y, b], Unit.AMPERE);
            const K = Geometric2.fromScalar(M);
            expect(K.a).toBe(a);
            expect(K.x).toBe(0);
            expect(K.y).toBe(0);
            expect(K.b).toBe(0);
            expect(K.uom).toBe(Unit.AMPERE);
            expect(K.isLocked()).toBe(false);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.y).toBe(y);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.AMPERE);
            expect(M.isLocked()).toBe(false);
        });
        it("fromSpinor", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const M = new Geometric2([a, x, y, b], Unit.AMPERE);
            const K = Geometric2.fromSpinor(M);
            expect(K.a).toBe(a);
            expect(K.x).toBe(0);
            expect(K.y).toBe(0);
            expect(K.b).toBe(b);
            expect(K.uom).toBe(Unit.AMPERE);
            expect(K.isLocked()).toBe(false);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.y).toBe(y);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.AMPERE);
            expect(M.isLocked()).toBe(false);
        });
        it("fromVector", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const M = new Geometric2([a, x, y, b], Unit.AMPERE);
            const K = Geometric2.fromVector(M);
            expect(K.a).toBe(0);
            expect(K.x).toBe(x);
            expect(K.y).toBe(y);
            expect(K.b).toBe(0);
            expect(K.uom).toBe(Unit.AMPERE);
            expect(K.isLocked()).toBe(false);
            expect(M.a).toBe(a);
            expect(M.x).toBe(x);
            expect(M.y).toBe(y);
            expect(M.b).toBe(b);
            expect(M.uom).toBe(Unit.AMPERE);
            expect(M.isLocked()).toBe(false);
        });
    });
    describe("constants", function () {
        it("zero", function () {
            const M = Geometric2.zero;
            expect(M.a).toBe(0);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(true);
        });
        it("one", function () {
            const M = Geometric2.one;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(true);
        });
        it("e1", function () {
            const M = Geometric2.e1;
            expect(M.a).toBe(0);
            expect(M.x).toBe(1);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(true);
        });
        it("e2", function () {
            const M = Geometric2.e2;
            expect(M.a).toBe(0);
            expect(M.x).toBe(0);
            expect(M.y).toBe(1);
            expect(M.b).toBe(0);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(true);
        });
        it("I", function () {
            const M = Geometric2.I;
            expect(M.a).toBe(0);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(1);
            expect(M.uom).toBeUndefined();
            expect(M.isLocked()).toBe(true);
        });
        it("meter", function () {
            const M = Geometric2.meter;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.METER);
            expect(M.isLocked()).toBe(true);
        });
        it("kilogram", function () {
            const M = Geometric2.kilogram;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.KILOGRAM);
            expect(M.isLocked()).toBe(true);
        });
        it("second", function () {
            const M = Geometric2.second;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.SECOND);
            expect(M.isLocked()).toBe(true);
        });
        it("ampere", function () {
            const M = Geometric2.ampere;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.AMPERE);
            expect(M.isLocked()).toBe(true);
        });
        it("kelvin", function () {
            const M = Geometric2.kelvin;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.KELVIN);
            expect(M.isLocked()).toBe(true);
        });
        it("mole", function () {
            const M = Geometric2.mole;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.MOLE);
            expect(M.isLocked()).toBe(true);
        });
        it("candela", function () {
            const M = Geometric2.candela;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.CANDELA);
            expect(M.isLocked()).toBe(true);
        });
        it("newton", function () {
            const M = Geometric2.newton;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.NEWTON);
            expect(M.isLocked()).toBe(true);
        });
        it("joule", function () {
            const M = Geometric2.joule;
            expect(M.a).toBe(1);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
            expect(M.uom).toBe(Unit.JOULE);
            expect(M.isLocked()).toBe(true);
        });
    });
    describe("locking", function () {
        it("should work.", function () {
            const M = new Geometric2();
            expect(M.isLocked()).toBe(false);
            const token = M.lock();
            expect(M.isLocked()).toBe(true);
            M.unlock(token);
            expect(M.isLocked()).toBe(false);
        });
        it("should not be able to lock if locked.", function () {
            const M = new Geometric2();
            expect(M.isLocked()).toBe(false);
            M.lock();
            expect(function () {
                M.lock();
            }).toThrowError("already locked");
        });
        it("should not be able to unlock if unlocked.", function () {
            const M = new Geometric2();
            expect(M.isLocked()).toBe(false);
            expect(function () {
                M.unlock(42);
            }).toThrowError("not locked");
        });
        it("should not be able to unlock with wrong token.", function () {
            const M = new Geometric2();
            expect(M.isLocked()).toBe(false);
            M.lock();
            expect(M.isLocked()).toBe(true);
            expect(function () {
                M.unlock(42);
            }).toThrowError("unlock denied");
        });
    });
    describe("properties", function () {
        it("a", function () {
            const M = new Geometric2();
            M.a = Math.PI;
            expect(M.a).toBe(Math.PI);
            M.lock();
            expect(function () {
                M.a = Math.random();
            }).toThrowError("Property `a` is readonly.");
        });
        it("x", function () {
            const M = new Geometric2();
            M.x = Math.PI;
            expect(M.x).toBe(Math.PI);
            M.lock();
            expect(function () {
                M.x = Math.random();
            }).toThrowError("Property `x` is readonly.");
        });
        it("y", function () {
            const M = new Geometric2();
            M.y = Math.PI;
            expect(M.y).toBe(Math.PI);
            M.lock();
            expect(function () {
                M.y = Math.random();
            }).toThrowError("Property `y` is readonly.");
        });
        it("b", function () {
            const M = new Geometric2();
            M.b = Math.PI;
            expect(M.b).toBe(Math.PI);
            M.lock();
            expect(function () {
                M.b = Math.random();
            }).toThrowError("Property `b` is readonly.");
        });
        it("xy", function () {
            const M = new Geometric2();
            M.xy = Math.PI;
            expect(M.xy).toBe(Math.PI);
            M.lock();
            expect(function () {
                M.xy = Math.random();
            }).toThrowError("Property `xy` is readonly.");
        });
        it("b and xy are equivalent", function () {
            const M = new Geometric2();
            M.xy = Math.PI;
            expect(M.b).toBe(Math.PI);
            expect(M.xy).toBe(Math.PI);
            M.b = Math.E;
            expect(M.b).toBe(Math.E);
            expect(M.xy).toBe(Math.E);
        });
        it("uom", function () {
            const M = new Geometric2();
            M.uom = Unit.METER;
            expect(M.uom).toBe(Unit.METER);
            M.lock();
            expect(function () {
                M.uom = Unit.SECOND;
            }).toThrowError("Property `uom` is readonly.");
        });
    });
    describe("grades", function () {
        it("scalar", function () {
            expect(Geometric2.zero.grades).toBe(0);
            expect(Geometric2.one.grades).toBe(1);
        });
        it("vector", function () {
            expect(Geometric2.e1.grades).toBe(2);
            expect(Geometric2.e2.grades).toBe(2);
            expect(Geometric2.vector(0, 0).grades).toBe(0);
        });
        it("pseudoscalar", function () {
            expect(Geometric2.I.grades).toBe(4);
            expect(Geometric2.bivector(0).grades).toBe(0);
        });
        it("ALL", function () {
            expect(new Geometric2([1, 2, 3, 4]).grades).toBe(7);
        });
    });

    describe("grade", function () {
        const GRADE0 = zero.add(one);
        const GRADE1 = zero.add(e1).add(e2);
        const GRADE2 = zero.add(e12);
        const ALL = GRADE0.add(GRADE1).add(GRADE2);
        it("sanity check", function () {
            expect(ALL.a).toBe(1);
            expect(ALL.x).toBe(1);
            expect(ALL.y).toBe(1);
            expect(ALL.xy).toBe(1);
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

    describe("add", function () {
        it("LHS is zero.", function () {
            const lhs = new Geometric2([0, 0, 0, 0]);
            const rhs = new Geometric2([5, 6, 7, 8]);
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(5);
            expect(sum.x).toBe(6);
            expect(sum.y).toBe(7);
            expect(sum.b).toBe(8);
            expect(lhs.a).toBe(5);
            expect(lhs.x).toBe(6);
            expect(lhs.y).toBe(7);
            expect(lhs.b).toBe(8);
            expect(rhs.a).toBe(5);
            expect(rhs.x).toBe(6);
            expect(rhs.y).toBe(7);
            expect(rhs.b).toBe(8);
        });
        it("RHS is zero.", function () {
            const lhs = new Geometric2([1, 2, 3, 4]);
            const rhs = new Geometric2([0, 0, 0, 0]);
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(1);
            expect(sum.x).toBe(2);
            expect(sum.y).toBe(3);
            expect(sum.b).toBe(4);
            expect(lhs.a).toBe(1);
            expect(lhs.x).toBe(2);
            expect(lhs.y).toBe(3);
            expect(lhs.b).toBe(4);
            expect(rhs.a).toBe(0);
            expect(rhs.x).toBe(0);
            expect(rhs.y).toBe(0);
            expect(rhs.b).toBe(0);
        });
        it("mutates LHS if it is unlocked.", function () {
            const lhs = new Geometric2([1, 2, 3, 4]);
            const rhs = new Geometric2([5, 6, 7, 8]);
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(1 + 5);
            expect(sum.x).toBe(2 + 6);
            expect(sum.y).toBe(3 + 7);
            expect(sum.b).toBe(4 + 8);
            expect(lhs.a).toBe(1 + 5);
            expect(lhs.x).toBe(2 + 6);
            expect(lhs.y).toBe(3 + 7);
            expect(lhs.b).toBe(4 + 8);
            expect(rhs.a).toBe(5);
            expect(rhs.x).toBe(6);
            expect(rhs.y).toBe(7);
            expect(rhs.b).toBe(8);
        });
        it("leaves LHS if it is unlocked.", function () {
            const lhs = new Geometric2([1, 2, 3, 4]);
            lhs.lock();
            const rhs = new Geometric2([5, 6, 7, 8]);
            const sum = lhs.add(rhs);
            expect(sum.a).toBe(1 + 5);
            expect(sum.x).toBe(2 + 6);
            expect(sum.y).toBe(3 + 7);
            expect(sum.b).toBe(4 + 8);
            expect(lhs.a).toBe(1);
            expect(lhs.x).toBe(2);
            expect(lhs.y).toBe(3);
            expect(lhs.b).toBe(4);
            expect(rhs.a).toBe(5);
            expect(rhs.x).toBe(6);
            expect(rhs.y).toBe(7);
            expect(rhs.b).toBe(8);
        });
    });

    describe("dual", function () {
        it("", function () {
            checkEQ(one.dual(), I.neg());
            checkEQ(e1.dual(), e2.neg());
            checkEQ(e2.dual(), e1);
            checkEQ(I.dual(), one);
        });
        it("dual(Ak) = Ak << inv(I)", function () {
            for (const element of blades) {
                checkEQ(element.dual(), element.lco(I.rev()));
                checkEQ(element.dual(), element.lco(I.inv()));
            }
        });
    });

    describe("div", function () {
        it("scalar/scalar", function () {
            const result = one.__div__(one);
            expect(result.a).toBe(one.a);
            expect(result.__eq__(one)).toBe(true);
        });
        it("scalar/number", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const lhs = new Geometric2([a, x, y, b], Unit.KELVIN);
            const rhs = 0.5;
            const result = lhs.__div__(rhs);
            expect(result.a).toBe(2 * a);
            expect(result.x).toBe(2 * x);
            expect(result.y).toBe(2 * y);
            expect(result.b).toBe(2 * b);
            expect(result.uom).toBe(Unit.KELVIN);
        });
    });
    describe("direction", function () {
        it("locked=false", function () {
            const M = Geometric2.vector(5, 0);
            const dir = M.direction();
            expect(dir.a).toBe(0);
            expect(dir.x).toBe(1);
            expect(dir.y).toBe(0);
            expect(dir.b).toBe(0);
            expect(M.a).toBe(0);
            expect(M.x).toBe(1);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
        });
        it("locked=true", function () {
            const M = Geometric2.vector(5, 0);
            M.lock();
            const dir = M.direction();
            expect(dir.a).toBe(0);
            expect(dir.x).toBe(1);
            expect(dir.y).toBe(0);
            expect(dir.b).toBe(0);
            expect(M.a).toBe(0);
            expect(M.x).toBe(5);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
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

    describe("inv", function () {
        it("scalar(2) should be 0.5", function () {
            const M = Geometric2.scalar(2, Unit.METER);
            const inverse = M.inv();
            expect(inverse.a).toBe(0.5);
            expect(inverse.x).toBe(0);
            expect(inverse.y).toBe(0);
            expect(inverse.b).toBe(0);
            expect(inverse.uom).toBe(Unit.ONE.div(Unit.METER));
        });
        it("2 * e1 should be 0.5 * e1", function () {
            const M = Geometric2.vector(2, 0, Unit.METER);
            const inverse = M.inv();
            expect(inverse.a).toBe(0);
            expect(inverse.x).toBe(0.5);
            expect(inverse.y).toBe(0);
            expect(inverse.b).toBe(0);
            expect(inverse.uom).toBe(Unit.ONE.div(Unit.METER));
        });
        it("2 * e2 should be 0.5 * e2", function () {
            const M = Geometric2.vector(0, 2, Unit.METER);
            const inverse = M.inv();
            expect(inverse.a).toBe(0);
            expect(inverse.x).toBe(0);
            expect(inverse.y).toBe(0.5);
            expect(inverse.b).toBe(0);
            expect(inverse.uom).toBe(Unit.ONE.div(Unit.METER));
        });
        it("2 * I should be -0.5 * I", function () {
            const M = Geometric2.bivector(2, Unit.METER);
            const inverse = M.inv();
            expect(inverse.a).toBe(0);
            expect(inverse.x).toBe(0);
            expect(inverse.y).toBe(0);
            expect(inverse.b).toBe(-0.5);
            expect(inverse.uom).toBe(Unit.ONE.div(Unit.METER));
        });
        it("", function () {
            checkEQ(one.inv(), one);
            checkEQ(e1.inv(), e1);
            checkEQ(e2.inv(), e2);
            checkEQ(e12.inv(), e12.neg());
        });
        it("1+I should be (1-I)/2", function () {
            checkEQ(one.add(I).inv(), one.sub(I).divByNumber(2));
        });
        it("e1-e2 should be (e1-e2)/2", function () {
            checkEQ(e1.sub(e2).inv(), e1.sub(e2).divByNumber(2));
        });
        it("2+e1 should be (2-e1)/3", function () {
            checkEQ(two.add(e1).inv(), two.sub(e1).divByNumber(3));
        });
        it("2+e2 should be (2-e2)/3", function () {
            checkEQ(two.add(e2).inv(), two.sub(e2).divByNumber(3));
        });
        it("2*e2+I should be (2*e2+I)/3", function () {
            checkEQ(e2.scale(2).add(I).inv(), e2.scale(2).add(I).divByNumber(3));
        });
        it("2*e1-I should be (2*e1-I)/3", function () {
            checkEQ(e1.scale(2).sub(I).inv(), e1.scale(2).sub(I).divByNumber(3));
        });
        it("2*e1+I should be (2*e1+I)/3", function () {
            checkEQ(e1.scale(2).add(I).inv(), e1.scale(2).add(I).divByNumber(3));
        });
    });
    describe("isScalar", function () {
        it("should only be true if all other components are zero.", function () {
            const a = 0;
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const M = new Geometric2([a, x, y, b], Unit.KILOGRAM);
            expect(M.isScalar()).toBe(false);
            M.x = 0;
            M.y = 0;
            M.b = 0;
            expect(M.isScalar()).toBe(true);
            M.x = x;
            M.y = 0;
            M.b = 0;
            expect(M.isScalar()).toBe(false);
            M.x = 0;
            M.y = y;
            M.b = 0;
            expect(M.isScalar()).toBe(false);
            M.x = 0;
            M.y = 0;
            M.b = b;
            expect(M.isScalar()).toBe(false);
        });
    });
    describe("isSpinor", function () {
        it("should only be true if all other components are zero.", function () {
            expect(zero.isSpinor()).toBe(true);
            expect(one.isSpinor()).toBe(true);
            expect(Geometric2.meter.isSpinor()).toBe(false);
            expect(two.isSpinor()).toBe(true);
            expect(e1.isSpinor()).toBe(false);
            expect(e2.isSpinor()).toBe(false);
            expect(e12.isSpinor()).toBe(true);
        });
    });
    describe("lco", function () {
        it("", function () {
            checkEQ(one.lco(one), one);
            checkEQ(one.lco(e1), e1);
            checkEQ(one.lco(e2), e2);
            checkEQ(one.lco(I), I);

            checkEQ(e1.lco(one), zero);
            checkEQ(e1.lco(e1), one);
            checkEQ(e1.lco(e2), zero);
            checkEQ(e1.lco(I), e2);

            checkEQ(e2.lco(one), zero);
            checkEQ(e2.lco(e1), zero);
            checkEQ(e2.lco(e2), one);
            checkEQ(e2.lco(I), e1.neg());

            checkEQ(I.lco(one), zero);
            checkEQ(I.lco(e1), zero);
            checkEQ(I.lco(e2), zero);
            checkEQ(I.lco(I), one.neg());
        });
    });
    describe("norm", function () {
        it("zero is scalar(0)", function () {
            const M = Geometric2.zero;
            const mag = M.magnitude();
            expect(mag.a).toBe(0);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
        });
        it("one is scalar(1)", function () {
            const M = Geometric2.one;
            const mag = M.magnitude();
            expect(mag.a).toBe(1);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
        });
        it("e1 is scalar(1)", function () {
            const M = Geometric2.e1;
            const mag = M.magnitude();
            expect(mag.a).toBe(1);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
        });
        it("e2 is scalar(1)", function () {
            const M = Geometric2.e2;
            const mag = M.magnitude();
            expect(mag.a).toBe(1);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
        });
        it("I is scalar(1)", function () {
            const M = Geometric2.I;
            const mag = M.magnitude();
            expect(mag.a).toBe(1);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
        });
        it("should change if the multivector is Mutable.", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            const norm = Math.sqrt(1 + 4 + 9 + 16);
            const mag = M.magnitude();
            expect(mag.a).toBe(norm);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
            expect(M.a).toBe(norm);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
        });
        it("should mutate if mutate is true and the multivector is Mutable.", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            const norm = Math.sqrt(1 + 4 + 9 + 16);
            const mag = M.magnitude();
            expect(mag.a).toBe(norm);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
            expect(M.a).toBe(norm);
            expect(M.x).toBe(0);
            expect(M.y).toBe(0);
            expect(M.b).toBe(0);
        });
        it("should preserve if mutate is false and the multivector is Mutable.", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            const norm = Math.sqrt(1 + 4 + 9 + 16);
            const mag = M.clone().magnitude();
            expect(mag.a).toBe(norm);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(4);
        });
        it("should preserve if mutate is undefined and the multivector is Locked.", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            M.lock();
            const norm = Math.sqrt(1 + 4 + 9 + 16);
            const mag = M.magnitude();
            expect(mag.a).toBe(norm);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(4);
        });
        it("should preserve if mutate is false and the multivector is Locked.", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            M.lock();
            const norm = Math.sqrt(1 + 4 + 9 + 16);
            const mag = M.magnitude();
            expect(mag.a).toBe(norm);
            expect(mag.x).toBe(0);
            expect(mag.y).toBe(0);
            expect(mag.b).toBe(0);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(4);
        });
    });
    describe("rco", function () {
        it("", function () {
            checkEQ(one.rco(one), one);
            checkEQ(one.rco(e1), zero);
            checkEQ(one.rco(e2), zero);
            checkEQ(one.rco(I), zero);

            checkEQ(e1.rco(one), e1);
            checkEQ(e1.rco(e1), one);
            checkEQ(e1.rco(e2), zero);
            checkEQ(e1.rco(I), zero);

            checkEQ(e2.rco(one), e2);
            checkEQ(e2.rco(e1), zero);
            checkEQ(e2.rco(e2), one);
            checkEQ(e2.rco(I), zero);

            checkEQ(I.rco(one), I);
            checkEQ(I.rco(e1), e2.neg());
            checkEQ(I.rco(e2), e1);
            checkEQ(I.rco(I), one.neg());
        });
    });
    describe("reflect", function () {
        it("e1 in the plane perpendicular to e1 should be -e1", function () {
            const reflected = e1.reflect(e1);
            expect(reflected.a).toBe(0);
            expect(reflected.x).toBe(-1);
            expect(reflected.y).toBe(0);
            expect(reflected.b).toBe(0);
        });
        it("e2 in the plane perpendicular to e2 should be -e2", function () {
            const reflected = e2.reflect(e2);
            expect(reflected.a).toBe(0);
            expect(reflected.x).toBe(0);
            expect(reflected.y).toBe(-1);
            expect(reflected.b).toBe(0);
        });
        it("v in the plane perpendicular to e1 should reverse x component only", function () {
            const x = Math.random();
            const y = Math.random();
            const v = Geometric2.vector(x, y);
            v.lock();
            const reflected = v.reflect(e1);
            expect(reflected.a).toBe(0);
            expect(reflected.x).toBe(-x);
            expect(reflected.y).toBe(y);
            expect(reflected.b).toBe(0);
        });
        it("v in the plane perpendicular to e2 should reverse y component only", function () {
            const x = Math.random();
            const y = Math.random();
            const v = Geometric2.vector(x, y);
            v.lock();
            const reflected = v.reflect(e2);
            expect(reflected.a).toBe(0);
            expect(reflected.x).toBe(x);
            expect(reflected.y).toBe(-y);
            expect(reflected.b).toBe(0);
        });
        it("M in the plane perpendicular to e1 should change sign of scalar part.", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const v = new Geometric2([a, x, y, b]);
            v.lock();
            const reflected = v.reflect(e1);
            expect(reflected.a).toBe(-a);
            expect(reflected.x).toBe(-x);
            expect(reflected.y).toBe(y);
            expect(reflected.b).toBe(b);
        });
    });
    describe("rev", function () {
        it("locked=false", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            const dir = M.rev();
            expect(dir.a).toBe(1);
            expect(dir.x).toBe(2);
            expect(dir.y).toBe(3);
            expect(dir.b).toBe(-4);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(-4);
            expect(dir === M).toBe(true);
        });
        it("locked=true", function () {
            const M = new Geometric2([1, 2, 3, 4]);
            M.lock();
            const dir = M.rev();
            expect(dir.a).toBe(1);
            expect(dir.x).toBe(2);
            expect(dir.y).toBe(3);
            expect(dir.b).toBe(-4);
            expect(M.a).toBe(1);
            expect(M.x).toBe(2);
            expect(M.y).toBe(3);
            expect(M.b).toBe(4);
            expect(dir !== M).toBe(true);
        });
    });
    describe("rotorFromDirections", function () {
        it("(e1, e2)", function () {
            const m = new Geometric2([Math.random(), Math.random(), Math.random(), Math.random()]);
            m.rotorFromDirections(e1, e2);
            expect(m.a).toBe(0.7071067811865475);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("(e1, e1)", function () {
            const m = new Geometric2([Math.random(), Math.random(), Math.random(), Math.random()]);
            m.rotorFromDirections(e1, e1);
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("(e2, e2)", function () {
            const m = new Geometric2([Math.random(), Math.random(), Math.random(), Math.random()]);
            m.rotorFromDirections(e2, e2);
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("on locked should not mutate and should return the rotor.", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const m = new Geometric2([a, x, y, b], Unit.KELVIN);
            m.lock();
            const R = m.rotorFromDirections(e1, e2);
            expect(m.a).toBe(a);
            expect(m.x).toBe(x);
            expect(m.y).toBe(y);
            expect(m.b).toBe(b);
            expect(m.uom).toBe(Unit.KELVIN);
            expect(R.a).toBe(0.7071067811865475);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(R.uom)).toBe(true);
        });
        it("static", function () {
            const R = Geometric2.rotorFromDirections(e1, e2);
            expect(R.a).toBe(0.7071067811865475);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(R.uom)).toBe(true);
        });
        it("result should be independent of |b| and |a|.", function () {
            const R = Geometric2.rotorFromDirections(e1.mulByNumber(0.5), e2.mulByNumber(2));
            expect(R.a).toBe(0.7071067811865475);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(R.uom)).toBe(true);
        });
    });
    describe("rotorFromVectorToVector", function () {
        it("(e1, e2)", function () {
            const m = new Geometric2([Math.random(), Math.random(), Math.random(), Math.random()]);
            m.rotorFromVectorToVector(e1, e2);
            expect(m.a).toBe(0.7071067811865475);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("(e1, e1)", function () {
            const m = new Geometric2([Math.random(), Math.random(), Math.random(), Math.random()]);
            m.rotorFromVectorToVector(e1, e1);
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("(e2, e2)", function () {
            const m = new Geometric2([Math.random(), Math.random(), Math.random(), Math.random()]);
            m.rotorFromVectorToVector(e2, e2);
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
        });
        it("on locked should not mutate and should return the rotor.", function () {
            const a = Math.random();
            const x = Math.random();
            const y = Math.random();
            const b = Math.random();
            const m = new Geometric2([a, x, y, b], Unit.KELVIN);
            m.lock();
            const R = m.rotorFromVectorToVector(e1, e2);
            expect(m.a).toBe(a);
            expect(m.x).toBe(x);
            expect(m.y).toBe(y);
            expect(m.b).toBe(b);
            expect(m.uom).toBe(Unit.KELVIN);
            expect(R.a).toBe(0.7071067811865475);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(R.uom)).toBe(true);
        });
        it("static", function () {
            const R = Geometric2.rotorFromVectorToVector(e1, e2);
            expect(R.a).toBe(0.7071067811865475);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.b).toBe(-0.7071067811865475);
            expect(Unit.isOne(R.uom)).toBe(true);
        });
        it("scaling", function () {
            const R = Geometric2.rotorFromVectorToVector(e1.mulByNumber(0.5), e2.mulByNumber(2));
            expect(R.a).toBe(1.414213562373095);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.b).toBe(-1.414213562373095);
            expect(Unit.isOne(R.uom)).toBe(true);
            const rotated = e1.rotate(R);
            expect(rotated.x).toBe(0);
            expect(rotated.y).toBe(3.999999999999999);
        });
    });
    describe("scale", function () {
        it("is a shortcut for full scalar multiplication", function () {
            const x = Math.random();
            checkEQ(one.scale(x), one.mul(Geometric2.scalar(x)));
            checkEQ(e1.scale(x), e1.mul(Geometric2.scalar(x)));
            checkEQ(e2.scale(x), e2.mul(Geometric2.scalar(x)));
            checkEQ(e12.scale(x), e12.mul(Geometric2.scalar(x)));
        });
    });
    describe("scp", function () {
        it("", function () {
            checkEQ(one.scp(one), one);
            checkEQ(one.scp(e1), zero);
            checkEQ(one.scp(e2), zero);
            checkEQ(one.scp(I), zero);
            checkEQ(e1.scp(one), zero);
            checkEQ(e1.scp(e1), one);
            checkEQ(e1.scp(e2), zero);
            checkEQ(e1.scp(I), zero);
            checkEQ(e2.scp(one), zero);
            checkEQ(e2.scp(e1), zero);
            checkEQ(e2.scp(e2), one);
            checkEQ(e2.scp(I), zero);
            checkEQ(I.scp(one), zero);
            checkEQ(I.scp(e1), zero);
            checkEQ(I.scp(e2), zero);
            checkEQ(I.scp(I), one.neg());
        });
    });
    describe("toExponential", function () {
        it("zero is scalar(0)", function () {
            const M = Geometric2.zero;
            expect(M.toExponential()).toBe("0");
        });
        it("one", function () {
            const M = Geometric2.one;
            expect(M.toExponential()).toBe("1");
        });
        it("e1", function () {
            const M = Geometric2.e1;
            expect(M.toExponential()).toBe("e1");
        });
        it("e2", function () {
            const M = Geometric2.e2;
            expect(M.toExponential()).toBe("e2");
        });
        it("I is e12", function () {
            const M = Geometric2.I;
            expect(M.toExponential()).toBe("e12");
        });
        it("10", function () {
            const M = Geometric2.one.mulByNumber(10);
            expect(M.toExponential()).toBe("1e+1");
            expect(M.toExponential(10)).toBe("1.0000000000e+1");
        });
        it("kilogram", function () {
            const M = Geometric2.kilogram;
            expect(M.toExponential()).toBe("1 kg");
        });
        it("meter", function () {
            const M = Geometric2.meter;
            expect(M.toExponential()).toBe("1 m");
        });
        it("second", function () {
            const M = Geometric2.second;
            expect(M.toExponential()).toBe("1 s");
        });
    });
    describe("toFixed", function () {
        it("zero is scalar(0)", function () {
            const M = Geometric2.zero;
            expect(M.toFixed()).toBe("0");
        });
        it("one", function () {
            const M = Geometric2.one;
            expect(M.toFixed()).toBe("1");
        });
        it("e1", function () {
            const M = Geometric2.e1;
            expect(M.toFixed()).toBe("e1");
        });
        it("e2", function () {
            const M = Geometric2.e2;
            expect(M.toFixed()).toBe("e2");
        });
        it("I is e12", function () {
            const M = Geometric2.I;
            expect(M.toFixed()).toBe("e12");
        });
        it("10", function () {
            const M = Geometric2.one.mulByNumber(10);
            expect(M.toFixed()).toBe("10");
            expect(M.toFixed(10)).toBe("10.0000000000");
        });
        it("kilogram", function () {
            const M = Geometric2.kilogram;
            expect(M.toFixed()).toBe("1 kg");
        });
        it("meter", function () {
            const M = Geometric2.meter;
            expect(M.toFixed()).toBe("1 m");
        });
        it("second", function () {
            const M = Geometric2.second;
            expect(M.toFixed()).toBe("1 s");
        });
    });
    describe("toString", function () {
        it("zero is scalar(0)", function () {
            const M = Geometric2.zero;
            expect(M.toString()).toBe("0");
        });
        it("one", function () {
            const M = Geometric2.one;
            expect(M.toString()).toBe("1");
        });
        it("e1", function () {
            const M = Geometric2.e1;
            expect(M.toString()).toBe("e1");
        });
        it("e2", function () {
            const M = Geometric2.e2;
            expect(M.toString()).toBe("e2");
        });
        it("I is e12", function () {
            const M = Geometric2.I;
            expect(M.toString()).toBe("e12");
        });
        it("10", function () {
            const M = Geometric2.one.mulByNumber(10);
            expect(M.toString()).toBe("10");
            expect(M.toString(10)).toBe("10");
            expect(M.toString(2)).toBe("1010");
            expect(M.toString(16)).toBe("a");
        });
        it("kilogram", function () {
            const M = Geometric2.kilogram;
            expect(M.toString()).toBe("1 kg");
        });
        it("meter", function () {
            const M = Geometric2.meter;
            expect(M.toString()).toBe("1 m");
        });
        it("second", function () {
            const M = Geometric2.second;
            expect(M.toString()).toBe("1 s");
        });
    });
    describe("__add__", function () {
        it("+ scalar", function () {
            const lhs = new Geometric2([0, 0, 0, 0]);
            const rhs = new Geometric2([1, 0, 0, 0]);
            const sum = lhs.__add__(rhs);
            expect(sum.a).toBe(1);
            expect(sum.x).toBe(0);
            expect(sum.y).toBe(0);
            expect(sum.b).toBe(0);
        });
        it("+ e1", function () {
            const lhs = new Geometric2([0, 0, 0, 0]);
            const rhs = new Geometric2([0, 1, 0, 0]);
            const sum = lhs.__add__(rhs);
            expect(sum.a).toBe(0);
            expect(sum.x).toBe(1);
            expect(sum.y).toBe(0);
            expect(sum.b).toBe(0);
        });
        it("+ e2", function () {
            const lhs = new Geometric2([0, 0, 0, 0]);
            const rhs = new Geometric2([0, 0, 1, 0]);
            const sum = lhs.__add__(rhs);
            expect(sum.a).toBe(0);
            expect(sum.x).toBe(0);
            expect(sum.y).toBe(1);
            expect(sum.b).toBe(0);
        });
        it("+ I", function () {
            const lhs = new Geometric2([0, 0, 0, 0]);
            const rhs = new Geometric2([0, 0, 0, 1]);
            const sum = lhs.__add__(rhs);
            expect(sum.a).toBe(0);
            expect(sum.x).toBe(0);
            expect(sum.y).toBe(0);
            expect(sum.b).toBe(1);
        });
    });
    describe("__mul__", function () {
        it("* scalar", function () {
            const lhs = new Geometric2([1, 0, 0, 0]);
            const rhs = new Geometric2([1, 0, 0, 0]);
            const sum = lhs.__mul__(rhs);
            expect(sum.a).toBe(1);
            expect(sum.x).toBe(0);
            expect(sum.y).toBe(0);
            expect(sum.b).toBe(0);
        });
        it("* e1", function () {
            const lhs = new Geometric2([1, 0, 0, 0]);
            const rhs = new Geometric2([0, 1, 0, 0]);
            const sum = lhs.__mul__(rhs);
            expect(sum.a).toBe(0);
            expect(sum.x).toBe(1);
            expect(sum.y).toBe(0);
            expect(sum.b).toBe(0);
        });
        it("* e2", function () {
            const lhs = new Geometric2([1, 0, 0, 0]);
            const rhs = new Geometric2([0, 0, 1, 0]);
            const sum = lhs.__mul__(rhs);
            expect(sum.a).toBe(0);
            expect(sum.x).toBe(0);
            expect(sum.y).toBe(1);
            expect(sum.b).toBe(0);
        });
        it("* I", function () {
            const lhs = new Geometric2([1, 0, 0, 0]);
            const rhs = new Geometric2([0, 0, 0, 1]);
            const sum = lhs.__mul__(rhs);
            expect(sum.a).toBe(0);
            expect(sum.x).toBe(0);
            expect(sum.y).toBe(0);
            expect(sum.b).toBe(1);
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
    describe("__add__", function () {
        it("(Geometric)", function () {
            checkEQ(one.__add__(two), one.add(two));
        });
        it("(number)", function () {
            checkEQ(one.__add__(2), one.add(two));
        });
        it("otherwise", function () {
            expect(one.__add__("" as unknown as Geometric2)).toBeUndefined();
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
            expect(one.__radd__("" as unknown as Geometric2)).toBeUndefined();
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
            expect(one.__sub__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rsub__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rsub__(e2), e2.sub(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rsub__(2), two.sub(one));
        });
        it("otherwise", function () {
            expect(one.__rsub__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__mul__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__mul__(e2), e1.mul(e2));
        });
        it("(number)", function () {
            checkEQ(one.__mul__(2), one.mul(two));
        });
        it("otherwise", function () {
            expect(one.__mul__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rmul__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rmul__(e2), e2.mul(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rmul__(2), two.mul(one));
        });
        it("otherwise", function () {
            expect(one.__rmul__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__div__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__div__(e2), e1.div(e2));
        });
        it("(number)", function () {
            checkEQ(one.__div__(2), one.div(two));
        });
        it("otherwise", function () {
            expect(one.__div__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rdiv__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rdiv__(e2), e2.div(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rdiv__(2), two.div(one));
        });
        it("otherwise", function () {
            expect(one.__rdiv__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__lshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__lshift__(e2), e1.lco(e2));
        });
        it("(number)", function () {
            checkEQ(one.__lshift__(2), one.lco(two));
        });
        it("otherwise", function () {
            expect(one.__lshift__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rlshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rlshift__(e2), e2.lco(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rlshift__(2), two.lco(one));
        });
        it("otherwise", function () {
            expect(one.__rlshift__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rshift__(e2), e1.rco(e2));
        });
        it("(number)", function () {
            checkEQ(one.__rshift__(2), one.rco(two));
        });
        it("otherwise", function () {
            expect(one.__rshift__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rrshift__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rrshift__(e2), e2.rco(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rrshift__(2), two.rco(one));
        });
        it("otherwise", function () {
            expect(one.__rrshift__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__vbar__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__vbar__(e2), e1.scp(e2));
        });
        it("(number)", function () {
            checkEQ(one.__vbar__(2), one.scp(two));
        });
        it("otherwise", function () {
            expect(one.__vbar__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rvbar__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rvbar__(e2), e1.scp(e2));
        });
        it("(number)", function () {
            checkEQ(one.__rvbar__(2), one.scp(two));
        });
        it("otherwise", function () {
            expect(one.__rvbar__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__wedge__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__wedge__(e2), e1.ext(e2));
        });
        it("(number)", function () {
            checkEQ(one.__wedge__(2), one.ext(two));
        });
        it("otherwise", function () {
            expect(one.__wedge__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
    describe("__rwedge__", function () {
        it("(Geometric)", function () {
            checkEQ(e1.__rwedge__(e2), e2.ext(e1));
        });
        it("(number)", function () {
            checkEQ(one.__rwedge__(2), two.ext(one));
        });
        it("otherwise", function () {
            expect(one.__rwedge__("" as unknown as Geometric2)).toBeUndefined();
        });
    });
});
