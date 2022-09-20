import { lcoE3 } from "./lcoE3";

describe("lcoE3", function () {
    it("", function () {
        expect(function () {
            lcoE3(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42);

        }).toThrowError("index must be in the range [0..7]");
    });
});
