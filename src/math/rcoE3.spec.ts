import { rcoE3 } from "./rcoE3";

describe("rcoE3", function () {
    it("", function () {
        expect(function () {
            rcoE3(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42 as unknown as 0);

        }).toThrowError("index must be in the range [0..7]");
    });
});
