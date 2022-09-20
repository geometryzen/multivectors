/**
 * @hidden
 */
export default function isBoolean(x: unknown): x is boolean {
    return (typeof x === 'boolean');
}
