import { reduceToLowestForm } from "./reduceToLowestForm";

describe("reduceToLowestForm", function () {
    it("should throw Error if the denominator is zero.", function () {
        const out: [number, number] = [0, 0];
        expect(function () {
            reduceToLowestForm(1, 0, out);
        }).toThrowError("denominator must not be zero");
    });
});
