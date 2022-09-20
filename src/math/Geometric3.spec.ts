import { BivectorE3 } from './BivectorE3';
import { Geometric3 } from './Geometric3';
import { ignoreNegativeZero } from './ignoreNegativeZero';
import { Unit } from './Unit';
import { VectorE3 } from './VectorE3';

/**
 * @hidden
 */
const zero = Geometric3.zero;
/**
 * @hidden
 */
const one = Geometric3.one;
/**
 * @hidden
 */
const two = Geometric3.one.mulByNumber(2);
/**
 * @hidden
 */
const e1 = Geometric3.e1;
/**
 * @hidden
 */
const e2 = Geometric3.e2;
/**
 * @hidden
 */
const e3 = Geometric3.e3;
/**
 * @hidden
 */
const e23 = e2.mul(e3);
/**
 * @hidden
 */
const e31 = e3.mul(e1);
/**
 * @hidden
 */
const e13 = e1.mul(e3);
/**
 * @hidden
 */
const e12 = e1.mul(e2);
/**
 * @hidden
 */
const I = Geometric3.I;
/**
 * 
 */
const blades: Geometric3[] = [one, e1, e2, e12, e3, e13, e23, I];
/**
 * @hidden
 */
const meter = Geometric3.meter;
/**
 * @hidden
 */
const kilogram = Geometric3.kilogram;
/**
 * @hidden
 */
const second = Geometric3.second;
/**
 * @hidden
 */
const ampere = Geometric3.ampere;
/**
 * @hidden
 */
const kelvin = Geometric3.kelvin;
/**
 * @hidden
 */
const mole = Geometric3.mole;
/**
 * @hidden
 */
const candela = Geometric3.candela;

/**
 * @hidden
 * @param M 
 * @param n 
 * @returns 
 */
function reflectSpec(M: Geometric3, n: VectorE3) {
    return function () {
        /**
         * We want to verify that coefficients are carried through.
         */
        const S = M.clone().mulByNumber(2).permlock();
        /**
         * We want the reflect method to work even when n is not a unit vector.
         */
        const N = Geometric3.fromVector(n).mulByNumber(3).permlock();
        /**
         * The 'Test' result using the specialized method.
         */
        const T = S.reflect(N);
        /**
         * The 'Control' value computed explicitly as C = -n * S * n
         */
        const C = N.mul(S).mul(N).mulByNumber(-1);

        it("should be -n * M * n", function () {
            expect(T.a).toBe(C.a);
            expect(T.x).toBe(C.x);
            expect(T.y).toBe(C.y);
            expect(T.z).toBe(C.z);
            expect(T.yz).toBe(C.yz);
            expect(T.zx).toBe(C.zx);
            expect(T.xy).toBe(C.xy);
            expect(T.b).toBe(C.b);
        });
    };
}

/**
 * The decimal place up to which the numbers should agree.
 * Make this as large as possible while avoiding rounding errors.
 * @hidden
 */
const PRECISION = 12;

/**
 * @hidden
 */
function checkEQ(result: Geometric3, comp: Geometric3): void {
    expect(result.a).toBe(comp.a);
    expect(result.x).toBe(comp.x);
    expect(result.y).toBe(comp.y);
    expect(result.z).toBe(comp.z);
    expect(ignoreNegativeZero(result.xy)).toBe(ignoreNegativeZero(comp.xy));
    expect(ignoreNegativeZero(result.yz)).toBe(ignoreNegativeZero(comp.yz));
    expect(ignoreNegativeZero(result.zx)).toBe(ignoreNegativeZero(comp.zx));
    expect(ignoreNegativeZero(result.b)).toBe(ignoreNegativeZero(comp.b));
    expect(Unit.isCompatible(result.uom, comp.uom)).toBe(true);
    expect(result.isLocked()).toBe(comp.isLocked());
    expect(result.isMutable()).toBe(comp.isMutable());
}

describe("Geometric3", function () {

    describe("constructor", function () {
        it("should be zero when no arguments given.", function () {
            const mv = new Geometric3();
            expect(mv.a).toBe(0);
            expect(mv.x).toBe(0);
            expect(mv.y).toBe(0);
            expect(mv.z).toBe(0);
            expect(mv.xy).toBe(0);
            expect(mv.yz).toBe(0);
            expect(mv.zx).toBe(0);
            expect(mv.b).toBe(0);
            expect(Unit.isOne(mv.uom)).toBe(true);
        });
        it("should throw Error when coords length is not 8.", function () {
            expect(function () {
                const mv = new Geometric3([] as unknown as [number, number, number, number, number, number, number, number]);
                mv.toString();
            }).toThrowError("coords.length must be 8");
        });
    });

    describe("constants", function () {
        it("I", function () {
            const m = Geometric3.I;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(1);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("e1", function () {
            const m = Geometric3.e1;
            expect(m.a).toBe(0);
            expect(m.x).toBe(1);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("e2", function () {
            const m = Geometric3.e2;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(1);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("e3", function () {
            const m = Geometric3.e3;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(1);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("one", function () {
            const m = Geometric3.one;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("zero", function () {
            const m = Geometric3.zero;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(0);
        });
        it("e12", function () {
            const m = e12;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(1);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("e23", function () {
            const m = e23;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(1);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("e31", function () {
            const m = e31;
            expect(m.a).toBe(0);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(1);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(true);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
        });
        it("meter", function () {
            const m = meter;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 m");
        });
        it("kilogram", function () {
            const m = kilogram;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 kg");
        });
        it("second", function () {
            const m = second;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 s");
        });
        it("ampere", function () {
            const m = ampere;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 A");
        });
        it("kelvin", function () {
            const m = kelvin;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 K");
        });
        it("mole", function () {
            const m = mole;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 mol");
        });
        it("candela", function () {
            const m = candela;
            expect(m.a).toBe(1);
            expect(m.x).toBe(0);
            expect(m.y).toBe(0);
            expect(m.z).toBe(0);
            expect(m.xy).toBe(0);
            expect(m.yz).toBe(0);
            expect(m.zx).toBe(0);
            expect(m.b).toBe(0);
            expect(Unit.isOne(m.uom)).toBe(false);
            expect(m.isLocked()).toBe(true);
            const clone = m.clone().magnitude();
            expect(clone.a).toBe(1);
            expect(clone.toString()).toBe("1 cd");
        });
    });

    describe("uom", function () {
        it("KILOGRAM", function () {
            const kg = Geometric3.scalar(1, Unit.KILOGRAM);
            expect(kg.uom.dimensions.M.numer).toBe(1);
            expect(kg.uom.dimensions.M.denom).toBe(1);
            expect(kg.uom.dimensions.L.numer).toBe(0);
            expect(kg.uom.dimensions.L.denom).toBe(1);
            expect(kg.uom.dimensions.T.numer).toBe(0);
            expect(kg.uom.dimensions.T.denom).toBe(1);
            expect(kg.uom.dimensions.Q.numer).toBe(0);
            expect(kg.uom.dimensions.Q.denom).toBe(1);
        });
        it("METER", function () {
            const m = Geometric3.scalar(1, Unit.METER);
            expect(m.uom.dimensions.M.numer).toBe(0);
            expect(m.uom.dimensions.M.denom).toBe(1);
            expect(m.uom.dimensions.L.numer).toBe(1);
            expect(m.uom.dimensions.L.denom).toBe(1);
            expect(m.uom.dimensions.T.numer).toBe(0);
            expect(m.uom.dimensions.T.denom).toBe(1);
            expect(m.uom.dimensions.Q.numer).toBe(0);
            expect(m.uom.dimensions.Q.denom).toBe(1);
        });
        it("SECOND", function () {
            const s = Geometric3.scalar(1, Unit.SECOND);
            expect(s.uom.dimensions.M.numer).toBe(0);
            expect(s.uom.dimensions.M.denom).toBe(1);
            expect(s.uom.dimensions.L.numer).toBe(0);
            expect(s.uom.dimensions.L.denom).toBe(1);
            expect(s.uom.dimensions.T.numer).toBe(1);
            expect(s.uom.dimensions.T.denom).toBe(1);
            expect(s.uom.dimensions.Q.numer).toBe(0);
            expect(s.uom.dimensions.Q.denom).toBe(1);
        });
        it("AMPERE", function () {
            const A = Geometric3.scalar(1, Unit.AMPERE);
            expect(A.uom.dimensions.M.numer).toBe(0);
            expect(A.uom.dimensions.M.denom).toBe(1);
            expect(A.uom.dimensions.L.numer).toBe(0);
            expect(A.uom.dimensions.L.denom).toBe(1);
            expect(A.uom.dimensions.T.numer).toBe(-1);
            expect(A.uom.dimensions.T.denom).toBe(1);
            expect(A.uom.dimensions.Q.numer).toBe(1);
            expect(A.uom.dimensions.Q.denom).toBe(1);
        });
        it("COULOMB", function () {
            const C = Geometric3.scalar(1, Unit.COULOMB);
            expect(C.uom.dimensions.M.numer).toBe(0);
            expect(C.uom.dimensions.M.denom).toBe(1);
            expect(C.uom.dimensions.L.numer).toBe(0);
            expect(C.uom.dimensions.L.denom).toBe(1);
            expect(C.uom.dimensions.T.numer).toBe(0);
            expect(C.uom.dimensions.T.denom).toBe(1);
            expect(C.uom.dimensions.Q.numer).toBe(1);
            expect(C.uom.dimensions.Q.denom).toBe(1);
        });
    });

    describe("locking", function () {
        it("a", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.a = 1;
            }).toThrowError("Property `a` is readonly.");
        });
        it("x", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.x = 1;
            }).toThrowError("Property `x` is readonly.");
        });
        it("y", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.y = 1;
            }).toThrowError("Property `y` is readonly.");
        });
        it("z", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.z = 1;
            }).toThrowError("Property `z` is readonly.");
        });
        it("xy", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.xy = 1;
            }).toThrowError("Property `xy` is readonly.");
        });
        it("yz", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.yz = 1;
            }).toThrowError("Property `yz` is readonly.");
        });
        it("zx", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.zx = 1;
            }).toThrowError("Property `zx` is readonly.");
        });
        it("b", function () {
            expect(function () {
                const mv = new Geometric3().permlock();
                mv.b = 1;
            }).toThrowError("Property `b` is readonly.");
        });
    });

    describe("conj", function () {
        it("should have pattern +--++--+ on grades (-1)^[a(a+1)/2]", function () {
            for (const element of blades) {
                switch (element.grades) {
                    case 0x1: {
                        checkEQ(element.conj(), element);
                        break;
                    }
                    case 0x2: {
                        checkEQ(element.conj(), element.neg());
                        break;
                    }
                    case 0x4: {
                        checkEQ(element.conj(), element.neg());
                        break;
                    }
                    case 0x8: {
                        checkEQ(element.conj(), element);
                        break;
                    }
                }
            }
        });
    });

    describe("cross", function () {
        it("should work for vectors", function () {
            checkEQ(e1.cross(e2), e3);
            checkEQ(e2.cross(e3), e1);
            checkEQ(e3.cross(e1), e2);
        });
    });

    describe("direction", function () {
        it("should be the identity operation for elements.", function () {
            for (const element of blades) {
                checkEQ(element.direction(), element);
            }
        });
    });

    describe("divByNumber", function () {
        it("should be a shortcut for div.", function () {
            for (const element of blades) {
                checkEQ(element.divByNumber(2), element.div(two));
            }
        });
    });

    describe("divByScalar", function () {
        it("should be a shortcut for div.", function () {
            for (const element of blades) {
                checkEQ(element.divByScalar(2, Unit.METER), element.div(two).div(Geometric3.meter));
                checkEQ(element.divByScalar(2), element.div(two));
            }
        });
    });

    describe("divByVector", function () {
        it("should be a shortcut for div.", function () {
            for (const element of blades) {
                checkEQ(element.divByVector(e1), element.div(e1));
                checkEQ(element.divByVector(e2), element.div(e2));
                checkEQ(element.divByVector(e3), element.div(e3));
            }
        });
    });

    describe("dual", function () {
        it("", function () {
            checkEQ(one.dual(), I.neg());
            checkEQ(e1.dual(), e23.neg());
            checkEQ(e2.dual(), e13);
            checkEQ(e3.dual(), e12.neg());
            checkEQ(e12.dual(), e3);
            checkEQ(e23.dual(), e1);
            checkEQ(e31.dual(), e2);
            checkEQ(I.dual(), one);
        });
        it("dual(Ak) = Ak << inv(I)", function () {
            for (const element of blades) {
                checkEQ(element.dual(), element.lco(I.inv()));
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

    describe("grade", function () {
        const GRADE0 = zero.add(one);
        const GRADE1 = zero.add(e1).add(e2).add(e3);
        const GRADE2 = zero.add(e12).add(e23).add(e31);
        const GRADE3 = zero.add(I);
        const ALL = GRADE0.add(GRADE1).add(GRADE2).add(GRADE3);
        it("sanity check", function () {
            expect(ALL.a).toBe(1);
            expect(ALL.x).toBe(1);
            expect(ALL.y).toBe(1);
            expect(ALL.z).toBe(1);
            expect(ALL.xy).toBe(1);
            expect(ALL.yz).toBe(1);
            expect(ALL.zx).toBe(1);
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
        it("3", function () {
            checkEQ(ALL.grade(3), GRADE3);
        });
        it("otherwise", function () {
            checkEQ(ALL.grade(9.5), zero);
        });
    });

    describe("grades", function () {
        it("0 => 0x0", function () {
            expect(Geometric3.zero.grades).toBe(0x0);
        });
        it("1 => 0x1", function () {
            expect(Geometric3.one.grades).toBe(0x1);
        });
        it("e1 => 0x2", function () {
            expect(e1.grades).toBe(0x2);
        });
        it("e2 => 0x2", function () {
            expect(e2.grades).toBe(0x2);
        });
        it("e3 => 0x2", function () {
            expect(e3.grades).toBe(0x2);
        });
        it("1+e1 => 0x3", function () {
            expect(e1.clone().addScalar(1).grades).toBe(0x3);
        });
        it("e1 ^ e2 => 0x4", function () {
            expect(Geometric3.wedge(e1, e2).grades).toBe(0x4);
        });
        it("e2 ^ e3 => 0x4", function () {
            expect(Geometric3.wedge(e2, e3).grades).toBe(0x4);
        });
        it("e3 ^ e1 => 0x4", function () {
            expect(Geometric3.wedge(e3, e1).grades).toBe(0x4);
        });
        it("rotorFromDirections(e1, e2) => 0x5", function () {
            expect(Geometric3.rotorFromDirections(e1, e2).grades).toBe(0x5);
        });
        it("pseudoscalar => 0x8", function () {
            const I = Geometric3.I;
            expect(I.grades).toBe(0x8);
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
            it("e2", function () {
                checkEQ(one.lco(e2), e2);
            });
            it("e12", function () {
                checkEQ(one.lco(e12), e12);
            });
            it("e3", function () {
                checkEQ(one.lco(e3), e3);
            });
            it("e13", function () {
                checkEQ(one.lco(e13), e13);
            });
            it("e23", function () {
                checkEQ(one.lco(e23), e23);
            });
            it("I", function () {
                checkEQ(one.lco(I), I);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e1.lco(e1), one);
            });
            it("e2", function () {
                checkEQ(e1.lco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e1.lco(e12), e2);
            });
            it("e3", function () {
                checkEQ(e1.lco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e1.lco(e13), e3);
            });
            it("e23", function () {
                checkEQ(e1.lco(e23), zero);
            });
            it("I", function () {
                checkEQ(e1.lco(I), e23);
            });
        });
        describe("e2", function () {
            it("one", function () {
                checkEQ(e2.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e2.lco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e2.lco(e2), one);
            });
            it("e12", function () {
                checkEQ(e2.lco(e12), e1.neg());
            });
            it("e3", function () {
                checkEQ(e2.lco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e2.lco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e2.lco(e23), e3);
            });
            it("I", function () {
                checkEQ(e2.lco(I), e13.neg());
            });
        });
        describe("e12", function () {
            it("one", function () {
                checkEQ(e12.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e12.lco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e12.lco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e12.lco(e12), one.neg());
            });
            it("e3", function () {
                checkEQ(e12.lco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e12.lco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e12.lco(e23), zero);
            });
            it("I", function () {
                checkEQ(e12.lco(I), e3.neg());
            });
        });
        describe("e3", function () {
            it("one", function () {
                checkEQ(e3.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e3.lco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e3.lco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e3.lco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e3.lco(e3), one);
            });
            it("e13", function () {
                checkEQ(e3.lco(e13), e1.neg());
            });
            it("e23", function () {
                checkEQ(e3.lco(e23), e2.neg());
            });
            it("I", function () {
                checkEQ(e3.lco(I), e12);
            });
        });
        describe("e13", function () {
            it("one", function () {
                checkEQ(e13.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e13.lco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e13.lco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e13.lco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e13.lco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e13.lco(e13), one.neg());
            });
            it("e23", function () {
                checkEQ(e13.lco(e23), zero);
            });
            it("I", function () {
                checkEQ(e13.lco(I), e2);
            });
        });
        describe("e23", function () {
            it("one", function () {
                checkEQ(e23.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(e23.lco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e23.lco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e23.lco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e23.lco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e23.lco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e23.lco(e23), one.neg());
            });
            it("I", function () {
                checkEQ(e23.lco(I), e1.neg());
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.lco(one), zero);
            });
            it("e1", function () {
                checkEQ(I.lco(e1), zero);
            });
            it("e2", function () {
                checkEQ(I.lco(e2), zero);
            });
            it("e12", function () {
                checkEQ(I.lco(e12), zero);
            });
            it("e3", function () {
                checkEQ(I.lco(e3), zero);
            });
            it("e13", function () {
                checkEQ(I.lco(e13), zero);
            });
            it("e23", function () {
                checkEQ(I.lco(e23), zero);
            });
            it("I", function () {
                checkEQ(I.lco(I), one.neg());
            });
        });
    });

    describe("magnitude", function () {
        it("should be one for all elements", function () {
            for (const element of blades) {
                checkEQ(element.magnitude(), one);
            }
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
            it("e2", function () {
                checkEQ(one.mul(e2), e2);
            });
            it("e12", function () {
                checkEQ(one.mul(e12), e12);
            });
            it("e3", function () {
                checkEQ(one.mul(e3), e3);
            });
            it("e13", function () {
                checkEQ(one.mul(e13), e13);
            });
            it("e23", function () {
                checkEQ(one.mul(e23), e23);
            });
            it("I", function () {
                checkEQ(one.mul(I), I);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.mul(one), e1);
            });
            it("e1", function () {
                checkEQ(e1.mul(e1), one);
            });
            it("e2", function () {
                checkEQ(e1.mul(e2), e12);
            });
            it("e12", function () {
                checkEQ(e1.mul(e12), e2);
            });
            it("e3", function () {
                checkEQ(e1.mul(e3), e13);
            });
            it("e13", function () {
                checkEQ(e1.mul(e13), e3);
            });
            it("e23", function () {
                checkEQ(e1.mul(e23), I);
            });
            it("I", function () {
                checkEQ(e1.mul(I), e23);
            });
        });
        describe("e2", function () {
            it("one", function () {
                checkEQ(e2.mul(one), e2);
            });
            it("e1", function () {
                checkEQ(e2.mul(e1), e12.neg());
            });
            it("e2", function () {
                checkEQ(e2.mul(e2), one);
            });
            it("e12", function () {
                checkEQ(e2.mul(e12), e1.neg());
            });
            it("e3", function () {
                checkEQ(e2.mul(e3), e23);
            });
            it("e13", function () {
                checkEQ(e2.mul(e13), I.neg());
            });
            it("e23", function () {
                checkEQ(e2.mul(e23), e3);
            });
            it("I", function () {
                checkEQ(e2.mul(I), e13.neg());
            });
        });
        describe("e12", function () {
            it("one", function () {
                checkEQ(e12.mul(one), e12);
            });
            it("e1", function () {
                checkEQ(e12.mul(e1), e2.neg());
            });
            it("e2", function () {
                checkEQ(e12.mul(e2), e1);
            });
            it("e12", function () {
                checkEQ(e12.mul(e12), one.neg());
            });
            it("e3", function () {
                checkEQ(e12.mul(e3), I);
            });
            it("e13", function () {
                checkEQ(e12.mul(e13), e23.neg());
            });
            it("e23", function () {
                checkEQ(e12.mul(e23), e13);
            });
            it("I", function () {
                checkEQ(e12.mul(I), e3.neg());
            });
        });
        describe("e3", function () {
            it("one", function () {
                checkEQ(e3.mul(one), e3);
            });
            it("e1", function () {
                checkEQ(e3.mul(e1), e31);
            });
            it("e2", function () {
                checkEQ(e3.mul(e2), e23.neg());
            });
            it("e12", function () {
                checkEQ(e3.mul(e12), I);
            });
            it("e3", function () {
                checkEQ(e3.mul(e3), one);
            });
            it("e13", function () {
                checkEQ(e3.mul(e13), e1.neg());
            });
            it("e23", function () {
                checkEQ(e3.mul(e23), e2.neg());
            });
            it("I", function () {
                checkEQ(e3.mul(I), e12);
            });
        });
        describe("e13", function () {
            it("one", function () {
                checkEQ(e13.mul(one), e13);
            });
            it("e1", function () {
                checkEQ(e13.mul(e1), e3.neg());
            });
            it("e2", function () {
                checkEQ(e13.mul(e2), I.neg());
            });
            it("e12", function () {
                checkEQ(e13.mul(e12), e23);
            });
            it("e3", function () {
                checkEQ(e13.mul(e3), e1);
            });
            it("e13", function () {
                checkEQ(e13.mul(e13), one.neg());
            });
            it("e23", function () {
                checkEQ(e13.mul(e23), e12.neg());
            });
            it("I", function () {
                checkEQ(e13.mul(I), e2);
            });
        });
        describe("e23", function () {
            it("one", function () {
                checkEQ(e23.mul(one), e23);
            });
            it("e1", function () {
                checkEQ(e23.mul(e1), I);
            });
            it("e2", function () {
                checkEQ(e23.mul(e2), e3.neg());
            });
            it("e12", function () {
                checkEQ(e23.mul(e12), e31);
            });
            it("e3", function () {
                checkEQ(e23.mul(e3), e2);
            });
            it("e13", function () {
                checkEQ(e23.mul(e13), e12);
            });
            it("e23", function () {
                checkEQ(e23.mul(e23), one.neg());
            });
            it("I", function () {
                checkEQ(e23.mul(I), e1.neg());
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.mul(one), I);
            });
            it("e1", function () {
                checkEQ(I.mul(e1), e23);
            });
            it("e2", function () {
                checkEQ(I.mul(e2), e13.neg());
            });
            it("e12", function () {
                checkEQ(I.mul(e12), e3.neg());
            });
            it("e3", function () {
                checkEQ(I.mul(e3), e12);
            });
            it("e13", function () {
                checkEQ(I.mul(e13), e2);
            });
            it("e23", function () {
                checkEQ(I.mul(e23), e1.neg());
            });
            it("I", function () {
                checkEQ(I.mul(I), one.neg());
            });
        });
    });

    describe("mulByBivector", function () {
        it("(vector, bivector) should be same as vector.mul(bivector)", function () {
            const lhs = Geometric3.vector(Math.random(), Math.random(), Math.random());
            const B = Geometric3.bivector(Math.random(), Math.random(), Math.random());
            const actualOut = lhs.clone().mulByBivector(B);
            const expectOut = lhs.clone().mul(B);
            expect(actualOut.a).toBe(expectOut.a);
            expect(actualOut.x).toBe(expectOut.x);
            expect(actualOut.y).toBe(expectOut.y);
            expect(actualOut.z).toBe(expectOut.z);
            expect(actualOut.xy).toBe(expectOut.xy);
            expect(actualOut.yz).toBe(expectOut.yz);
            expect(actualOut.zx).toBe(expectOut.zx);
            expect(actualOut.b).toBe(expectOut.b);
        });
        it("(spinor, bivector) should be same as spinor.mul(bivector)", function () {
            const lhs = Geometric3.spinor(Math.random(), Math.random(), Math.random(), Math.random());
            const B = Geometric3.bivector(Math.random(), Math.random(), Math.random());
            const actualOut = lhs.clone().mulByBivector(B);
            const expectOut = lhs.clone().mul(B);
            expect(actualOut.a).toBe(expectOut.a);
            expect(actualOut.x).toBe(expectOut.x);
            expect(actualOut.y).toBe(expectOut.y);
            expect(actualOut.z).toBe(expectOut.z);
            expect(actualOut.xy).toBe(expectOut.xy);
            expect(actualOut.yz).toBe(expectOut.yz);
            expect(actualOut.zx).toBe(expectOut.zx);
            expect(actualOut.b).toBe(expectOut.b);
        });
        it("(pseudo, bivector) should be same as pseudo.mul(bivector)", function () {
            const lhs = Geometric3.pseudo(Math.random());
            const B = Geometric3.bivector(Math.random(), Math.random(), Math.random());
            const actualOut = lhs.clone().mulByBivector(B);
            const expectOut = lhs.clone().mul(B);
            expect(actualOut.a).toBe(expectOut.a);
            expect(actualOut.x).toBe(expectOut.x);
            expect(actualOut.y).toBe(expectOut.y);
            expect(actualOut.z).toBe(expectOut.z);
            expect(actualOut.xy).toBe(expectOut.xy);
            expect(actualOut.yz).toBe(expectOut.yz);
            expect(actualOut.zx).toBe(expectOut.zx);
            expect(actualOut.b).toBe(expectOut.b);
        });
    });

    describe("mulByScalar", function () {
        it("should be a shortcut for mul.", function () {
            for (const element of blades) {
                checkEQ(element.mulByScalar(2, Unit.METER), element.mul(two).mul(Geometric3.meter));
                checkEQ(element.mulByScalar(2), element.mul(two));
            }
        });
    });

    describe("mulByVector", function () {
        it("(vector, vector) should be same as vector.mul(vector)", function () {
            const lhs = Geometric3.vector(Math.random(), Math.random(), Math.random());
            const rhs = Geometric3.vector(Math.random(), Math.random(), Math.random());
            const actualOut = lhs.clone().mulByVector(rhs);
            const expectOut = lhs.clone().mul(rhs);
            expect(actualOut.a).toBe(expectOut.a);
            expect(actualOut.x).toBe(expectOut.x);
            expect(actualOut.y).toBe(expectOut.y);
            expect(actualOut.z).toBe(expectOut.z);
            expect(actualOut.xy).toBe(expectOut.xy);
            expect(actualOut.yz).toBe(expectOut.yz);
            expect(actualOut.zx).toBe(expectOut.zx);
            expect(actualOut.b).toBe(expectOut.b);
        });
        it("(spinor, vector) should be same as spinor.mul(vector)", function () {
            const lhs = Geometric3.spinor(Math.random(), Math.random(), Math.random(), Math.random());
            const rhs = Geometric3.vector(Math.random(), Math.random(), Math.random());
            const actualOut = lhs.clone().mulByVector(rhs);
            const expectOut = lhs.clone().mul(rhs);
            expect(actualOut.a).toBe(expectOut.a);
            expect(actualOut.x).toBe(expectOut.x);
            expect(actualOut.y).toBe(expectOut.y);
            expect(actualOut.z).toBe(expectOut.z);
            expect(actualOut.xy).toBe(expectOut.xy);
            expect(actualOut.yz).toBe(expectOut.yz);
            expect(actualOut.zx).toBe(expectOut.zx);
            expect(actualOut.b).toBe(expectOut.b);
        });
        it("(pseudo, vector) should be same as pseudo.mul(vector)", function () {
            const lhs = Geometric3.pseudo(Math.random());
            const rhs = Geometric3.vector(Math.random(), Math.random(), Math.random());
            const actualOut = lhs.clone().mulByVector(rhs);
            const expectOut = lhs.clone().mul(rhs);
            expect(actualOut.a).toBe(expectOut.a);
            expect(actualOut.x).toBe(expectOut.x);
            expect(actualOut.y).toBe(expectOut.y);
            expect(actualOut.z).toBe(expectOut.z);
            expect(actualOut.xy).toBe(expectOut.xy);
            expect(actualOut.yz).toBe(expectOut.yz);
            expect(actualOut.zx).toBe(expectOut.zx);
            expect(actualOut.b).toBe(expectOut.b);
        });
    });

    describe("div", function () {
        it("1 / 1 should be 1", function () {
            const numer: Geometric3 = one.clone();
            const denom: Geometric3 = one.clone();
            const ratio = numer.clone().div(denom);
            expect(ratio.isOne()).toBeTruthy();
        });
        it("1 / 2 should be 0.5", function () {
            const numer: Geometric3 = one.clone();
            const denom: Geometric3 = one.clone().mulByNumber(2);
            const ratio = numer.clone().div(denom);
            expect(ratio.toString()).toBe(one.clone().divByNumber(2).toString());
        });
        it("e1 / 1 should be e1", function () {
            const numer: Geometric3 = e1.clone();
            const denom: Geometric3 = one.clone();
            const ratio = numer.clone().div(denom);
            expect(ratio.toString()).toBe(e1.toString());
        });
        it("e1 / e1 should be 1", function () {
            const numer: Geometric3 = e1.clone();
            const denom: Geometric3 = e1.clone();
            const ratio = numer.clone().div(denom);
            expect(ratio.toString()).toBe(one.toString());
        });
        it("e1 / e2 should be e1 * e2", function () {
            const numer: Geometric3 = e1.clone();
            const denom: Geometric3 = e2.clone();
            const ratio = numer.clone().div(denom);
            expect(ratio.toString()).toBe(e1.clone().mul(e2).toString());
        });
        it("e1 / I should be e3 * e2", function () {
            const numer: Geometric3 = e1.clone();
            const denom: Geometric3 = I.clone();
            const ratio = numer.clone().div(denom);
            expect(ratio.toString()).toBe(e3.clone().mul(e2).toString());
        });
    });

    describe("equals", function () {
        it("(M) should be eqial to M", function () {
            const zero: Geometric3 = Geometric3.zero;
            const one: Geometric3 = Geometric3.one;
            expect(zero.equals(zero)).toBe(true);
            expect(one.equals(one)).toBe(true);
            expect(zero.equals(one)).toBe(false);
            expect(one.equals(zero)).toBe(false);
        });
    });

    describe("grade", function () {
        const m = one.add(e1).add(e2).add(e3).add(e12).add(e23).add(e31).add(I);
        it("target should contain all components for testing purposes", function () {
            expect(m.isLocked()).toBe(true);
            expect(m.a).toBe(1);
            expect(m.x).toBe(1);
            expect(m.y).toBe(1);
            expect(m.z).toBe(1);
            expect(m.yz).toBe(1);
            expect(m.zx).toBe(1);
            expect(m.xy).toBe(1);
            expect(m.b).toBe(1);
        });
        it("(0) should extract scalar component", function () {
            expect(m.isLocked()).toBe(true);
            const s = m.grade(0);
            expect(s.isLocked()).toBe(true);
            expect(s.a).toBe(1);
            expect(s.x).toBe(0);
            expect(s.y).toBe(0);
            expect(s.z).toBe(0);
            expect(s.yz).toBe(0);
            expect(s.zx).toBe(0);
            expect(s.xy).toBe(0);
            expect(s.b).toBe(0);
        });
        it("(1) should extract vector components", function () {
            expect(m.isLocked()).toBe(true);
            const s = m.grade(1);
            expect(s.isLocked()).toBe(true);
            expect(s.a).toBe(0);
            expect(s.x).toBe(1);
            expect(s.y).toBe(1);
            expect(s.z).toBe(1);
            expect(s.yz).toBe(0);
            expect(s.zx).toBe(0);
            expect(s.xy).toBe(0);
            expect(s.b).toBe(0);
        });
        it("(2) should extract bivector components", function () {
            expect(m.isLocked()).toBe(true);
            const s = m.grade(2);
            expect(s.isLocked()).toBe(true);
            expect(s.a).toBe(0);
            expect(s.x).toBe(0);
            expect(s.y).toBe(0);
            expect(s.z).toBe(0);
            expect(s.yz).toBe(1);
            expect(s.zx).toBe(1);
            expect(s.xy).toBe(1);
            expect(s.b).toBe(0);
        });
        it("(3) should extract the pseudoscalar component", function () {
            expect(m.isLocked()).toBe(true);
            const s = m.grade(3);
            expect(s.isLocked()).toBe(true);
            expect(s.a).toBe(0);
            expect(s.x).toBe(0);
            expect(s.y).toBe(0);
            expect(s.z).toBe(0);
            expect(s.yz).toBe(0);
            expect(s.zx).toBe(0);
            expect(s.xy).toBe(0);
            expect(s.b).toBe(1);
        });
    });

    describe("inv", function () {
        it("(1) should be 1", function () {
            const one: Geometric3 = Geometric3.one;
            const inv = one.clone().inv();
            expect(inv.equals(one)).toBe(true);
        });
        it("(2) should be 0.5", function () {
            const two: Geometric3 = Geometric3.scalar(2);
            const inv = two.clone().inv();
            const half: Geometric3 = Geometric3.scalar(0.5);
            expect(inv.equals(half)).toBe(true);
        });
        it("(e1) should be e1", function () {
            const e1: Geometric3 = Geometric3.e1;
            const inv = e1.clone().inv();
            expect(inv.equals(e1)).toBe(true);
        });
        it("(2 * e1) should be 0.5 * e1", function () {
            const e1: Geometric3 = Geometric3.e1;
            const inv = e1.clone().mulByNumber(2).inv();
            const halfE1 = e1.clone().mulByNumber(0.5);
            expect(inv.equals(halfE1)).toBe(true);
        });
        it("(e2) should be e2", function () {
            const e2: Geometric3 = Geometric3.e2;
            const inv = e2.clone().inv();
            expect(inv.equals(e2)).toBe(true);
        });
        it("(2 * e2) should be 0.5 * e2", function () {
            const e2: Geometric3 = Geometric3.e2;
            const inv = e2.clone().mulByNumber(2).inv();
            const halfE2 = e2.clone().mulByNumber(0.5);
            expect(inv.equals(halfE2)).toBe(true);
        });
        it("(e3) should be e3", function () {
            const e3: Geometric3 = Geometric3.e3;
            const inv = e3.clone().inv();
            expect(inv.equals(e3)).toBe(true);
        });
        it("(2 * e3) should be 0.5 * e3", function () {
            const e3: Geometric3 = Geometric3.e3;
            const inv = e3.clone().mulByNumber(2).inv();
            const halfE3 = e3.clone().mulByNumber(0.5);
            expect(inv.equals(halfE3)).toBe(true);
        });
        it("(I) should be -I", function () {
            const e1: Geometric3 = Geometric3.e1;
            const e2: Geometric3 = Geometric3.e2;
            const e3: Geometric3 = Geometric3.e3;
            const I = e1.clone().mul(e2).mul(e3);
            const inv = I.clone().inv();
            const minusI = I.clone().neg();
            expect(inv.equals(minusI)).toBe(true);
        });
        it("(2 * I) should be -0.5 * I", function () {
            const e1: Geometric3 = Geometric3.e1;
            const e2: Geometric3 = Geometric3.e2;
            const e3: Geometric3 = Geometric3.e3;
            const I = e1.clone().mul(e2).mul(e3);
            const inv = I.clone().mulByNumber(2).inv();
            const minusHalfI = I.clone().neg().mulByNumber(0.5);
            expect(inv.equals(minusHalfI)).toBe(true);
        });
    });

    describe("quaditude", function () {
        it("should be one for all elements", function () {
            for (const element of blades) {
                checkEQ(element.quaditude(), one);
            }
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
            it("e2", function () {
                checkEQ(one.rco(e2), zero);
            });
            it("e12", function () {
                checkEQ(one.rco(e12), zero);
            });
            it("e3", function () {
                checkEQ(one.rco(e3), zero);
            });
            it("e13", function () {
                checkEQ(one.rco(e13), zero);
            });
            it("e23", function () {
                checkEQ(one.rco(e23), zero);
            });
            it("I", function () {
                checkEQ(one.rco(I), zero);
            });
        });
        describe("e1", function () {
            it("one", function () {
                checkEQ(e1.rco(one), e1);
            });
            it("e1", function () {
                checkEQ(e1.rco(e1), one);
            });
            it("e2", function () {
                checkEQ(e1.rco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e1.rco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e1.rco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e1.rco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e1.rco(e23), zero);
            });
            it("I", function () {
                checkEQ(e1.rco(I), zero);
            });
        });
        describe("e2", function () {
            it("one", function () {
                checkEQ(e2.rco(one), e2);
            });
            it("e1", function () {
                checkEQ(e2.rco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e2.rco(e2), one);
            });
            it("e12", function () {
                checkEQ(e2.rco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e2.rco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e2.rco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e2.rco(e23), zero);
            });
            it("I", function () {
                checkEQ(e2.rco(I), zero);
            });
        });
        describe("e12", function () {
            it("one", function () {
                checkEQ(e12.rco(one), e12);
            });
            it("e1", function () {
                checkEQ(e12.rco(e1), e2.neg());
            });
            it("e2", function () {
                checkEQ(e12.rco(e2), e1);
            });
            it("e12", function () {
                checkEQ(e12.rco(e12), one.neg());
            });
            it("e3", function () {
                checkEQ(e12.rco(e3), zero);
            });
            it("e13", function () {
                checkEQ(e12.rco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e12.rco(e23), zero);
            });
            it("I", function () {
                checkEQ(e12.rco(I), zero);
            });
        });
        describe("e3", function () {
            it("one", function () {
                checkEQ(e3.rco(one), e3);
            });
            it("e1", function () {
                checkEQ(e3.rco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e3.rco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e3.rco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e3.rco(e3), one);
            });
            it("e13", function () {
                checkEQ(e3.rco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e3.rco(e23), zero);
            });
            it("I", function () {
                checkEQ(e3.rco(I), zero);
            });
        });
        describe("e13", function () {
            it("one", function () {
                checkEQ(e13.rco(one), e13);
            });
            it("e1", function () {
                checkEQ(e13.rco(e1), e3.neg());
            });
            it("e2", function () {
                checkEQ(e13.rco(e2), zero);
            });
            it("e12", function () {
                checkEQ(e13.rco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e13.rco(e3), e1);
            });
            it("e13", function () {
                checkEQ(e13.rco(e13), one.neg());
            });
            it("e23", function () {
                checkEQ(e13.rco(e23), zero);
            });
            it("I", function () {
                checkEQ(e13.rco(I), zero);
            });
        });
        describe("e23", function () {
            it("one", function () {
                checkEQ(e23.rco(one), e23);
            });
            it("e1", function () {
                checkEQ(e23.rco(e1), zero);
            });
            it("e2", function () {
                checkEQ(e23.rco(e2), e3.neg());
            });
            it("e12", function () {
                checkEQ(e23.rco(e12), zero);
            });
            it("e3", function () {
                checkEQ(e23.rco(e3), e2);
            });
            it("e13", function () {
                checkEQ(e23.rco(e13), zero);
            });
            it("e23", function () {
                checkEQ(e23.rco(e23), one.neg());
            });
            it("I", function () {
                checkEQ(e23.rco(I), zero);
            });
        });
        describe("I", function () {
            it("one", function () {
                checkEQ(I.rco(one), I);
            });
            it("e1", function () {
                checkEQ(I.rco(e1), e23);
            });
            it("e2", function () {
                checkEQ(I.rco(e2), e13.neg());
            });
            it("e12", function () {
                checkEQ(I.rco(e12), e3.neg());
            });
            it("e3", function () {
                checkEQ(I.rco(e3), e12);
            });
            it("e13", function () {
                checkEQ(I.rco(e13), e2);
            });
            it("e23", function () {
                checkEQ(I.rco(e23), e1.neg());
            });
            it("I", function () {
                checkEQ(I.rco(I), one.neg());
            });
        });
    });

    describe("reflect", function () {
        const n = Geometric3.vector(1, 0, 0);
        const a = Geometric3.vector(2, 3, 0, Unit.METER);
        const chain = a.reflect(n);

        it("should reflect (2,3)", function () {
            expect(a.x).toBe(-2);
            expect(a.y).toBe(+3);
            expect(a.z).toBe(0);
        });
        it("should be chainable", function () {
            expect(chain === a).toBe(true);
        });
        describe("(n)", function () {
            const S = Geometric3.random();
            const n = Geometric3.random().grade(1).direction();
            /**
             * The 'Test' result using the specialized method.
             */
            const T = S.clone().reflect(n);
            /**
             * The 'Control' value computed explicitly as C = -n * S * n
             */
            const C = n.clone().mul(S).mul(n).mulByNumber(-1);

            it("should be -n * M * n", function () {
                expect(T.a).toBeCloseTo(C.a, PRECISION);
                expect(T.x).toBeCloseTo(C.x, PRECISION);
                expect(T.y).toBeCloseTo(C.y, PRECISION);
                expect(T.z).toBeCloseTo(C.z, PRECISION);
                expect(T.yz).toBeCloseTo(C.yz, PRECISION);
                expect(T.zx).toBeCloseTo(C.zx, PRECISION);
                expect(T.xy).toBeCloseTo(C.xy, PRECISION);
                expect(T.b).toBeCloseTo(C.b, PRECISION);
            });
        });
        describe("one reflected in e1", reflectSpec(one, e1));
        describe("one reflected in e2", reflectSpec(one, e2));
        describe("one reflected in e3", reflectSpec(one, e3));

        describe("e1 reflected in e1", reflectSpec(e1, e1));
        describe("e1 reflected in e2", reflectSpec(e1, e2));
        describe("e1 reflected in e3", reflectSpec(e1, e3));

        describe("e2 reflected in e1", reflectSpec(e2, e1));
        describe("e2 reflected in e2", reflectSpec(e2, e2));
        describe("e2 reflected in e3", reflectSpec(e2, e3));

        describe("e3 reflected in e1", reflectSpec(e3, e1));
        describe("e3 reflected in e2", reflectSpec(e3, e2));
        describe("e3 reflected in e3", reflectSpec(e3, e3));

        describe("e12 reflected in e1", reflectSpec(e12, e1));
        describe("e12 reflected in e2", reflectSpec(e12, e2));
        describe("e12 reflected in e3", reflectSpec(e12, e3));

        describe("e23 reflected in e1", reflectSpec(e23, e1));
        describe("e23 reflected in e2", reflectSpec(e23, e2));
        describe("e23 reflected in e3", reflectSpec(e23, e3));

        describe("e31 reflected in e1", reflectSpec(e31, e1));
        describe("e31 reflected in e2", reflectSpec(e31, e2));
        describe("e31 reflected in e3", reflectSpec(e31, e3));

        describe("I reflected in e1", reflectSpec(I, e1));
        describe("I reflected in e2", reflectSpec(I, e2));
        describe("I reflected in e3", reflectSpec(I, e3));
    });

    describe("rev and __tilde__", function () {
        it("should have pattern ++--++-- on grades (-1)^[a(a-1)/2]", function () {
            for (const element of blades) {
                switch (element.grades) {
                    case 0x1: {
                        checkEQ(element.rev(), element);
                        checkEQ(element.__tilde__(), element);
                        break;
                    }
                    case 0x2: {
                        checkEQ(element.rev(), element);
                        checkEQ(element.__tilde__(), element);
                        break;
                    }
                    case 0x4: {
                        checkEQ(element.rev(), element.neg());
                        checkEQ(element.__tilde__(), element.neg());
                        break;
                    }
                    case 0x8: {
                        checkEQ(element.rev(), element.neg());
                        checkEQ(element.__tilde__(), element.neg());
                        break;
                    }
                }
            }
        });
    });

    describe("rotorFromAxisAngle", function () {
        describe("(e3, PI)", function () {
            const axis: VectorE3 = e3;
            const R = Geometric3.random();
            R.rotorFromAxisAngle(axis, Math.PI);
            R.approx(12);
            it("should equal e2 ^ e1", function () {
                expect(R.equals(e2.clone().ext(e1))).toBeTruthy();
            });
        });
        describe("(e3, PI/2)", function () {
            const axis: VectorE3 = e3;
            const R = Geometric3.random();
            R.rotorFromAxisAngle(axis, Math.PI / 2);
            R.approx(12);
            it("should equal (1-e1e2)/sqrt(2)", function () {
                expect(R.a).toBeCloseTo(1 / Math.sqrt(2), 15);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(0);
                expect(R.xy).toBeCloseTo(-1 / Math.sqrt(2), 17);
                expect(R.b).toBe(0);
            });
        });
        describe("(2 * e3, PI)", function () {
            const axis: VectorE3 = e3.clone().mulByNumber(2);
            const R = Geometric3.random();
            R.rotorFromAxisAngle(axis, Math.PI);
            R.approx(12);
            it("should equal e2 ^ e1", function () {
                expect(R.equals(e2.clone().ext(e1))).toBeTruthy();
            });
        });
    });

    describe("rotorFromDirections", function () {
        const cosPIdiv4 = Math.cos(Math.PI / 4);
        const sinPIdiv4 = Math.sin(Math.PI / 4);
        describe("from +e1", function () {
            it("to +e1", function () {
                const R = Geometric3.rotorFromDirections(e1, e1);
                expect(R.a).toBe(1);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(0);
                expect(R.xy).toBe(0);
            });
            it("to +e2", function () {
                const R = Geometric3.rotorFromDirections(e1, e2);
                expect(R.a).toBe(cosPIdiv4);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(0);
                expect(R.xy).toBe(-sinPIdiv4);
            });
            it("to +e3", function () {
                const R = Geometric3.rotorFromDirections(e1, e3);
                expect(R.a).toBe(cosPIdiv4);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(sinPIdiv4);
                expect(R.xy).toBe(0);
            });
            it("to -e1", function () {
                const R = Geometric3.rotorFromDirections(e1, e1.clone().neg());
                const V = e1.clone().rotate(R);
                expect(V.a).toBe(0);
                expect(V.x).toBe(-1);
                expect(V.y).toBe(0);
                expect(V.z).toBe(0);
                expect(V.yz).toBe(0);
                expect(V.zx).toBe(0);
                expect(V.xy).toBe(0);
            });
            it("to -e2", function () {
                const R = Geometric3.rotorFromDirections(e1, e2.clone().neg());
                expect(R.a).toBe(cosPIdiv4);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(0);
                expect(R.xy).toBe(sinPIdiv4);
            });
            it("to -e3", function () {
                const R = Geometric3.rotorFromDirections(e1, e3.clone().neg());
                expect(R.a).toBe(cosPIdiv4);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(-sinPIdiv4);
                expect(R.xy).toBe(0);
            });
        });
        describe("from -e1", function () {
            it("to +e1", function () {
                const R = Geometric3.rotorFromDirections(e1.clone().neg(), e1);
                const V = e1.clone().neg().rotate(R);
                expect(V.a).toBe(0);
                expect(V.x).toBe(1);
                expect(V.y).toBe(0);
                expect(V.z).toBe(0);
                expect(V.yz).toBe(0);
                expect(V.zx).toBe(0);
                expect(V.xy).toBe(0);
            });
            it("to +e2", function () {
                const R = Geometric3.rotorFromDirections(e1.clone().neg(), e2);
                expect(R.a).toBe(cosPIdiv4);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(0);
                expect(R.xy).toBe(sinPIdiv4);
            });
            it("to +e3", function () {
                const R = Geometric3.rotorFromDirections(e1.clone().neg(), e3);
                expect(R.a).toBe(cosPIdiv4);
                expect(R.x).toBe(0);
                expect(R.y).toBe(0);
                expect(R.z).toBe(0);
                expect(R.yz).toBe(0);
                expect(R.zx).toBe(-sinPIdiv4);
                expect(R.xy).toBe(0);
            });
        });
        it("(+e2, +e1)", function () {
            const R = Geometric3.rotorFromDirections(e2, e1);
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(0);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(+sinPIdiv4);
        });
        it("(+e2, -e1)", function () {
            const R = Geometric3.rotorFromDirections(e2, e1.clone().neg());
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(0);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(-sinPIdiv4);
        });
        it("(+e2, +e2)", function () {
            const R = Geometric3.rotorFromDirections(e2, e2);
            expect(R.a).toBe(1);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(0);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(0);
        });
        it("(+e2, +e3)", function () {
            const R = Geometric3.rotorFromDirections(e2, e3);
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(-sinPIdiv4);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(0);
        });
        it("(+e2, -e3)", function () {
            const R = Geometric3.rotorFromDirections(e2, e3.clone().neg());
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(sinPIdiv4);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(0);
        });
        it("(+e3, +e1)", function () {
            const R = Geometric3.rotorFromDirections(e3, e1);
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(0);
            expect(R.zx).toBe(-sinPIdiv4);
            expect(R.xy).toBe(0);
        });
        it("(+e3, -e1)", function () {
            const R = Geometric3.rotorFromDirections(e3, e1.clone().neg());
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(0);
            expect(R.zx).toBe(sinPIdiv4);
            expect(R.xy).toBe(0);
        });
        it("(+e3, +e2)", function () {
            const R = Geometric3.rotorFromDirections(e3, e2);
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(+sinPIdiv4);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(0);
        });
        it("(+e3, -e2)", function () {
            const R = Geometric3.rotorFromDirections(e3, e2.clone().neg());
            expect(R.a).toBe(cosPIdiv4);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(-sinPIdiv4);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(0);
        });
        it("(+e3, +e3)", function () {
            const R = Geometric3.rotorFromDirections(e3, e3);
            expect(R.a).toBe(1);
            expect(R.x).toBe(0);
            expect(R.y).toBe(0);
            expect(R.z).toBe(0);
            expect(R.yz).toBe(0);
            expect(R.zx).toBe(0);
            expect(R.xy).toBe(0);
        });
        it("(+e2, -e2)", function () {
            const R = Geometric3.rotorFromDirections(e2, e2.clone().neg());
            const V = e2.clone().rotate(R);
            expect(V.a).toBe(0);
            expect(V.x).toBe(0);
            expect(V.y).toBe(-1);
            expect(V.z).toBe(0);
            expect(V.yz).toBe(0);
            expect(V.zx).toBe(0);
            expect(V.xy).toBe(0);
        });
        it("(-e2, +e2)", function () {
            const R = Geometric3.rotorFromDirections(e2.clone().neg(), e2);
            const V = e2.clone().neg().rotate(R);
            expect(V.a).toBe(0);
            expect(V.x).toBe(0);
            expect(V.y).toBe(1);
            expect(V.z).toBe(0);
            expect(V.yz).toBe(0);
            expect(V.zx).toBe(0);
            expect(V.xy).toBe(0);
        });
        it("(+e3, -e3)", function () {
            const R = Geometric3.rotorFromDirections(e3, e3.clone().neg());
            const V = e3.clone().rotate(R);
            expect(V.a).toBe(0);
            expect(V.x).toBe(0);
            expect(V.y).toBe(0);
            expect(V.z).toBe(-1);
            expect(V.yz).toBe(0);
            expect(V.zx).toBe(0);
            expect(V.xy).toBe(0);
        });
        it("(-e3, +e3)", function () {
            const R = Geometric3.rotorFromDirections(e3.clone().neg(), e3);
            const V = e3.clone().neg().rotate(R);
            expect(V.a).toBe(0);
            expect(V.x).toBe(0);
            expect(V.y).toBe(0);
            expect(V.z).toBe(1);
            expect(V.yz).toBe(0);
            expect(V.zx).toBe(0);
            expect(V.xy).toBe(0);
        });
        it("(random, random) should be rotor that rotates a to b", function () {
            const a = Geometric3.random().grade(1).direction();
            const b = Geometric3.random().grade(1).direction();
            const R = Geometric3.rotorFromDirections(a, b);
            const V = a.clone().rotate(R);
            expect(V.a).toBe(0);
            expect(V.x).toBeCloseTo(b.x, PRECISION);
            expect(V.y).toBeCloseTo(b.y, PRECISION);
            expect(V.z).toBeCloseTo(b.z, PRECISION);
            expect(V.yz).toBe(0);
            expect(V.zx).toBe(0);
            expect(V.xy).toBe(0);
        });
    });

    describe("rotorFromFrameToFrame", function () {
        it("[e1, e2, e3] to [e1, e2, e3] should be 1", function () {
            const R = Geometric3.rotorFromFrameToFrame([e1, e2, e3], [e1, e2, e3]);
            expect(R.a).toBe(1);
        });
        it("[e2, e3, e1] to [e3, e2, -e1]", function () {
            const R = Geometric3.rotorFromFrameToFrame([e2, e3, e1], [e3, e2, e1.__neg__()]);
            const f1 = e2.clone().rotate(R);
            expect(f1.x).toBeCloseTo(e3.x, 14);
            expect(f1.y).toBeCloseTo(e3.y, 14);
            expect(f1.z).toBeCloseTo(e3.z, 14);
            const f2 = e3.clone().rotate(R);
            expect(f2.x).toBeCloseTo(e2.x, 14);
            expect(f2.y).toBeCloseTo(e2.y, 14);
            expect(f2.z).toBeCloseTo(e2.z, 14);
        });
    });

    describe("rotorFromGeneratorAngle", function () {
        describe("(e1 ^ e2, PI)", function () {
            const B: BivectorE3 = e1.clone().ext(e2);
            const R = Geometric3.random();
            R.rotorFromGeneratorAngle(B, Math.PI);
            R.approx(12);
            it("shoud equal e2 ^ e1", function () {
                expect(R.equals(e2.clone().ext(e1))).toBeTruthy();
            });
        });
        describe("(2  e1 ^ e2, PI/2)", function () {
            const B = e1.clone().ext(e2).mulByNumber(2);
            const R = Geometric3.one.clone().addVector(e1).addVector(e2).addVector(e3).addPseudo(1).add(B);
            R.rotorFromGeneratorAngle(B, Math.PI / 2);
            R.approx(12);
            it("shoud equal e2 ^ e1", function () {
                expect(R.equals(e2.clone().ext(e1))).toBeTruthy();
            });
        });
    });

    describe("scale", function () {
        it("is a shortcut for full scalar multiplication", function () {
            const x = Math.random();
            checkEQ(one.scale(x), one.mul(Geometric3.scalar(x)));
            checkEQ(e1.scale(x), e1.mul(Geometric3.scalar(x)));
            checkEQ(e2.scale(x), e2.mul(Geometric3.scalar(x)));
            checkEQ(e3.scale(x), e3.mul(Geometric3.scalar(x)));
            checkEQ(e12.scale(x), e12.mul(Geometric3.scalar(x)));
            checkEQ(e23.scale(x), e23.mul(Geometric3.scalar(x)));
            checkEQ(e31.scale(x), e31.mul(Geometric3.scalar(x)));
            checkEQ(I.scale(x), I.mul(Geometric3.scalar(x)));
        });
    });

    describe("sub", function () {
        it("zero should be the rhs identity.", function () {
            for (const element of blades) {
                checkEQ(element.sub(zero), element);
                checkEQ(zero.sub(element), element.neg());
            }
        });
    });

    describe("subScalar", function () {
        it("should be a shortcut for sub.", function () {
            checkEQ(zero.subScalar(2), two.neg());
            checkEQ(two.subScalar(0), two);
            for (const element of blades) {
                checkEQ(element.subScalar(2), element.sub(two));
            }
        });
    });

    describe("subVector", function () {
        it("should be a shortcut for sub.", function () {
            for (const element of blades) {
                if (element.isVector()) {
                    checkEQ(zero.subVector(element), element.neg());
                }
            }
            for (const element of blades) {
                checkEQ(element.subVector(e1), element.sub(e1));
                checkEQ(element.subVector(e2), element.sub(e2));
                checkEQ(element.subVector(e3), element.sub(e3));
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
    describe("__add__", function () {
        it("(Geometric)", function () {
            checkEQ(one.__add__(two), one.add(two));
        });
        it("(number)", function () {
            checkEQ(one.__add__(2), one.add(two));
        });
        it("otherwise", function () {
            expect(one.__add__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__radd__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__sub__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rsub__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__mul__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rmul__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__div__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rdiv__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__lshift__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rlshift__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rshift__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rrshift__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__vbar__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__rvbar__("" as unknown as Geometric3)).toBeUndefined();
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
            expect(one.__wedge__("" as unknown as Geometric3)).toBeUndefined();
        });
    });
    describe("__rwedge__", function () {
        it("(Geometric)", function () {
            for (const lhs of blades) {
                for (const rhs of blades) {
                    checkEQ(lhs.__rwedge__(rhs), rhs.ext(lhs));
                }
            }
        });
        it("(number)", function () {
            checkEQ(one.__rwedge__(2), two.ext(one));
        });
        it("otherwise", function () {
            expect(one.__rwedge__("" as unknown as Geometric3)).toBeUndefined();
        });
    });

    describe("__tilde__", function () {
        it("should be the operator overload of reversion", function () {
            for (const element of blades) {
                checkEQ(element.__tilde__(), element.rev());
            }
        });
    });

    describe("copySpinor", function () {
        const target = Geometric3.random();
        const a = Math.random();
        const yz = Math.random();
        const zx = Math.random();
        const xy = Math.random();
        const spinor = Geometric3.spinor(a, yz, zx, xy);
        target.copySpinor(spinor);
        describe("should copy spinor components and zero out others", function () {
            it("a", function () {
                expect(target.a).toBe(spinor.a);
            });
            it("x", function () {
                expect(target.x).toBe(0);
            });
            it("y", function () {
                expect(target.y).toBe(0);
            });
            it("z", function () {
                expect(target.z).toBe(0);
            });
            it("yz", function () {
                expect(target.yz).toBe(yz);
            });
            it("zx", function () {
                expect(target.zx).toBe(zx);
            });
            it("xy", function () {
                expect(target.xy).toBe(xy);
            });
            it("b", function () {
                expect(target.b).toBe(0);
            });
        });
    });

    describe("copyVector", function () {
        const target = Geometric3.random();
        const x = Math.random();
        const y = Math.random();
        const z = Math.random();
        const vector = Geometric3.vector(x, y, z, Unit.METER);
        target.copyVector(vector);
        describe("should copy vector components andzero out others", function () {
            it("a", function () {
                expect(target.a).toBe(0);
            });
            it("x", function () {
                expect(target.x).toBe(x);
            });
            it("y", function () {
                expect(target.y).toBe(y);
            });
            it("z", function () {
                expect(target.z).toBe(z);
            });
            it("yz", function () {
                expect(target.yz).toBe(0);
            });
            it("zx", function () {
                expect(target.zx).toBe(0);
            });
            it("xy", function () {
                expect(target.xy).toBe(0);
            });
            it("b", function () {
                expect(target.b).toBe(0);
            });
        });
    });
});
