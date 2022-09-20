import { Matrix3 } from "./Matrix3";
import { Unit } from "./Unit";

describe("Matrix3", function () {
    describe("constructor", function () {
        it("should populate elements in column-major order.", function () {
            // 1 4 7
            // 2 5 8
            // 3 6 9
            const A = new Matrix3(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), Unit.METER);
            expect(A).toBeDefined();
            expect(A.getElement(0, 0)).toBe(1);
            expect(A.getElement(1, 0)).toBe(2);
            expect(A.getElement(2, 0)).toBe(3);
            expect(A.getElement(0, 1)).toBe(4);
            expect(A.getElement(1, 1)).toBe(5);
            expect(A.getElement(2, 1)).toBe(6);
            expect(A.getElement(0, 2)).toBe(7);
            expect(A.getElement(1, 2)).toBe(8);
            expect(A.getElement(2, 2)).toBe(9);
            expect(A.uom).toBe(Unit.METER);
        });
    });
    describe("transpose", function () {
        it("should exchange rows and columns.", function () {
            const A = new Matrix3(new Float32Array([1, 4, 7, 2, 5, 8, 3, 6, 9]), Unit.METER);
            A.transpose();
            expect(A.getElement(0, 0)).toBe(1);
            expect(A.getElement(1, 0)).toBe(2);
            expect(A.getElement(2, 0)).toBe(3);
            expect(A.getElement(0, 1)).toBe(4);
            expect(A.getElement(1, 1)).toBe(5);
            expect(A.getElement(2, 1)).toBe(6);
            expect(A.getElement(0, 2)).toBe(7);
            expect(A.getElement(1, 2)).toBe(8);
            expect(A.getElement(2, 2)).toBe(9);
            expect(A.uom).toBe(Unit.METER);
        });
    });
    describe("toString", function () {
        it("", function () {
            const A = new Matrix3(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), Unit.METER);
            expect(A.toString()).toBe("1 4 7\n2 5 8\n3 6 9");
        });
    });
    describe("mul", function () {
        it("", function () {
            const A = new Matrix3(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), Unit.METER);
            const B = new Matrix3(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), Unit.METER);
            A.mul(B);
            expect(A.getElement(0, 0)).toBe(1);
            expect(A.getElement(1, 0)).toBe(2);
            expect(A.getElement(2, 0)).toBe(3);
            expect(A.getElement(0, 1)).toBe(4);
            expect(A.getElement(1, 1)).toBe(5);
            expect(A.getElement(2, 1)).toBe(6);
            expect(A.getElement(0, 2)).toBe(7);
            expect(A.getElement(1, 2)).toBe(8);
            expect(A.getElement(2, 2)).toBe(9);
            expect(A.uom).toBe(Unit.mul(Unit.METER, Unit.METER));
        });
    });
    describe("rmul", function () {
        it("", function () {
            const A = new Matrix3(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), Unit.METER);
            const B = new Matrix3(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), Unit.METER);
            B.rmul(A);
            expect(B.getElement(0, 0)).toBe(1);
            expect(B.getElement(1, 0)).toBe(2);
            expect(B.getElement(2, 0)).toBe(3);
            expect(B.getElement(0, 1)).toBe(4);
            expect(B.getElement(1, 1)).toBe(5);
            expect(B.getElement(2, 1)).toBe(6);
            expect(B.getElement(0, 2)).toBe(7);
            expect(B.getElement(1, 2)).toBe(8);
            expect(B.getElement(2, 2)).toBe(9);
            expect(B.uom).toBe(Unit.mul(Unit.METER, Unit.METER));
        });
    });
});
