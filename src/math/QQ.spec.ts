import { QQ } from './QQ';

describe("QQ", function () {
    describe("constructor", function () {
        it("numer matches construction argument", function () {
            const x = QQ.valueOf(3, 5);
            expect(x.numer).toBe(3);
        });
        it("denom matches construction argument", function () {
            const x = QQ.valueOf(3, 5);
            expect(x.denom).toBe(5);
        });
        it("Construction", function () {
            const x = QQ.valueOf(1, 1);
            expect(x.numer).toBe(1);
            expect(x.denom).toBe(1);
        });
        it("Construction on zero", function () {
            const x = QQ.valueOf(0, 1);
            expect(x.numer).toBe(0);
            expect(x.denom).toBe(1);
        });
        it("GCD", function () {
            const x = QQ.valueOf(2, 2);
            expect(x.numer).toBe(1);
            expect(x.denom).toBe(1);
        });
        it("Canonical (-1,3) => (-1,3)", function () {
            const x = QQ.valueOf(-1, 3);
            expect(x.numer).toBe(-1);
            expect(x.denom).toBe(3);
        });
        it("Canonical (1,-3) => (-1,3)", function () {
            const x = QQ.valueOf(1, -3);
            expect(x.numer).toBe(-1);
            expect(x.denom).toBe(3);
        });
        it("add QQ", function () {
            const x = QQ.valueOf(1, 3);
            const y = QQ.valueOf(2, 1);
            const sum = x.add(y);
            expect(sum.numer).toBe(7);
            expect(sum.denom).toBe(3);
            expect(x.numer).toBe(1);
            expect(x.denom).toBe(3);
            expect(y.numer).toBe(2);
            expect(y.denom).toBe(1);
        });
        it("sub QQ", function () {
            const x = QQ.valueOf(1, 3);
            const y = QQ.valueOf(2, 1);
            const sum = x.sub(y);
            expect(sum.numer).toBe(-5);
            expect(sum.denom).toBe(3);
            expect(x.numer).toBe(1);
            expect(x.denom).toBe(3);
            expect(y.numer).toBe(2);
            expect(y.denom).toBe(1);
        });
        it("mul", function () {
            const x = QQ.valueOf(1, 3);
            const y = QQ.valueOf(2, 1);
            const sum = x.mul(y);
            expect(sum.numer).toBe(2);
            expect(sum.denom).toBe(3);
            expect(x.numer).toBe(1);
            expect(x.denom).toBe(3);
            expect(y.numer).toBe(2);
            expect(y.denom).toBe(1);
        });
        it("div", function () {
            const x = QQ.valueOf(0, 1);
            const y = QQ.valueOf(2, 1);
            const q = x.div(y);
            expect(q.numer).toBe(0);
            expect(q.denom).toBe(1);
            expect(x.numer).toBe(0);
            expect(x.denom).toBe(1);
            expect(y.numer).toBe(2);
            expect(y.denom).toBe(1);
        });
        it("neg() should change the sign of the numerator", function () {
            const x = QQ.valueOf(1, 3);
            const n = x.neg();
            expect(x.numer).toBe(+1);
            expect(n.numer).toBe(-1);
        });
        it("neg() should leave the denominator unchanged", function () {
            const x = QQ.valueOf(1, 3);
            const n = x.neg();
            expect(x.denom).toBe(+3);
            expect(n.denom).toBe(+3);
        });
        it("toString", function () {
            const x = QQ.valueOf(1, 2);
            expect("" + x).toBe("1/2");
        });
    });
    describe("__add__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(1, 3);
            const rhs = QQ.valueOf(2, 1);
            const sum = lhs.__add__(rhs);
            expect(sum.numer).toBe(7);
            expect(sum.denom).toBe(3);
            expect(lhs.numer).toBe(1);
            expect(lhs.denom).toBe(3);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__radd__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(1, 3);
            const rhs = QQ.valueOf(2, 1);
            const sum = rhs.__radd__(lhs);
            expect(sum.numer).toBe(7);
            expect(sum.denom).toBe(3);
            expect(lhs.numer).toBe(1);
            expect(lhs.denom).toBe(3);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__sub__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(1, 3);
            const rhs = QQ.valueOf(2, 1);
            const sum = lhs.__sub__(rhs);
            expect(sum.numer).toBe(-5);
            expect(sum.denom).toBe(3);
            expect(lhs.numer).toBe(1);
            expect(lhs.denom).toBe(3);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__rsub__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(1, 3);
            const rhs = QQ.valueOf(2, 1);
            const sum = rhs.__rsub__(lhs);
            expect(sum.numer).toBe(-5);
            expect(sum.denom).toBe(3);
            expect(lhs.numer).toBe(1);
            expect(lhs.denom).toBe(3);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__mul__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(1, 3);
            const rhs = QQ.valueOf(2, 1);
            const sum = lhs.__mul__(rhs);
            expect(sum.numer).toBe(2);
            expect(sum.denom).toBe(3);
            expect(lhs.numer).toBe(1);
            expect(lhs.denom).toBe(3);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__rmul__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(1, 3);
            const rhs = QQ.valueOf(2, 1);
            const sum = rhs.__rmul__(lhs);
            expect(sum.numer).toBe(2);
            expect(sum.denom).toBe(3);
            expect(lhs.numer).toBe(1);
            expect(lhs.denom).toBe(3);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__div__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(0, 1);
            const rhs = QQ.valueOf(2, 1);
            const q = lhs.__div__(rhs);
            expect(q.numer).toBe(0);
            expect(q.denom).toBe(1);
            expect(lhs.numer).toBe(0);
            expect(lhs.denom).toBe(1);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
    describe("__rdiv__", function () {
        it("QQ", function () {
            const lhs = QQ.valueOf(0, 1);
            const rhs = QQ.valueOf(2, 1);
            const q = rhs.__rdiv__(lhs);
            expect(q.numer).toBe(0);
            expect(q.denom).toBe(1);
            expect(lhs.numer).toBe(0);
            expect(lhs.denom).toBe(1);
            expect(rhs.numer).toBe(2);
            expect(rhs.denom).toBe(1);
        });
    });
});
