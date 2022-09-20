import { mustBeArray } from "./mustBeArray";

describe("mustBeArray", function () {
    it("should allow an empty array", function () {
        try {
            mustBeArray('foo', []);
            expect(true).toBe(true);
        }
        catch (e) {
            fail();
        }
    });
    it("should not allow a string", function () {
        expect(function () {
            mustBeArray('bar', "" as unknown as []);
        }).toThrowError("bar must be an array.");
    });
});
