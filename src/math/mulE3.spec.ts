import { mulE3 } from "./mulE3";

describe("mulE3", function () {
    it("", function () {
        expect(function () {
            mulE3(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42 as unknown as 0);

        }).toThrowError("index must be in the range [0..7]");
    });
});
