import { extE3 } from "./extE3";

describe("extE3", function () {
    it("", function () {
        expect(function () {
            extE3(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42);

        }).toThrowError("index must be in the range [0..7]");
    });
});
