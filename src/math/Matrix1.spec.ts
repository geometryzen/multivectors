import { Matrix1 } from "./Matrix1";

describe("Matrix1", function () {
    it("zero should be defined and equal to [0].", function () {
        const zero = Matrix1.zero();
        expect(zero).toBeDefined();
        expect(zero.dimensions).toBe(1);
        expect(zero.isOne()).toBe(false);
        expect(zero.getElement(0, 0)).toBe(0);
    });
    it("one should be defined, and equal to [1].", function () {
        const one = Matrix1.one();
        expect(one).toBeDefined();
        expect(one.dimensions).toBe(1);
        expect(one.isOne()).toBe(true);
        expect(one.getElement(0, 0)).toBe(1);
    });
    it("setElement(row, column) should be implemented.", function () {
        const M = new Matrix1(new Float32Array([0]));
        const s = 42;
        M.setElement(0, 0, s);
        expect(M.getElement(0, 0)).toBe(s);
    });
    it("setElement(row, column) should be implemented.", function () {
        const M = new Matrix1(new Float32Array([0]));
        const s = 42;
        M.setElement(0, 0, s);
        expect(M.getElement(0, 0)).toBe(s);
    });
});
