/**
 * Throws an error if the argument is not a finite number.
 * @param value the number to test
 * @return the value that passed the test
 * @throws if the argument is not a finite number
 * @hidden
 */
export default function mustBeFinite(value: number): number {
    if (typeof value !== 'number' || !isFinite(value)) {
        throw new Error('not a finite number ' + value);
    }
    return value;
}
