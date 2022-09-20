import { Mat1 } from "./Mat1";

describe("Mat1", function () {
    describe("constructor", function () {
        it("should be defined.", function () {
            const m00 = Math.random();
            const M = new Mat1(m00);
            expect(M).toBeDefined();
        });
    });
    describe("dimensions", function () {
        it("should be 1.", function () {
            const m00 = Math.random();
            const M = new Mat1(m00);
            expect(M.dimensions).toBe(1);
        });
    });
    describe("getElement", function () {
        it("should get properties.", function () {
            const m00 = Math.random();
            const M = new Mat1(m00);
            expect(M.getElement(0, 0)).toBe(m00);
        });
        it("should throw Error if incorrect row", function () {
            expect(function () {
                const m00 = Math.random();
                const M = new Mat1(m00);
                M.getElement(1, 0);

            }).toThrowError("row and column must both be zero.");
        });
        it("should throw Error if incorrect column", function () {
            expect(function () {
                const m00 = Math.random();
                const M = new Mat1(m00);
                M.getElement(0, 1);

            }).toThrowError("row and column must both be zero.");
        });
    });
});
