import { gcd } from "./gcd";

/**
 * @param n the numerator (input).
 * @param d the denominator (input).
 * @param out the numerator and denominatorin lowest form (output).
 */
export function reduceToLowestForm(n: number, d: number, out: [numer: number, denom: number]) {
    let g: number;


    if (d === 0) {
        throw new Error("denominator must not be zero");
    }
    if (n === 0) {
        g = 1;
    }
    else {
        g = gcd(Math.abs(n), Math.abs(d));
    }
    if (d < 0) {
        n = -n;
        d = -d;
    }
    out[0] = n / g;
    out[1] = d / g;
}
