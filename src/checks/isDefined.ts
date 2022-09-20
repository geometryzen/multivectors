/**
 * @hidden
 * @returns `typeof arg !== 'undefined'`
 */
export default function isDefined(arg: unknown): boolean {
    return (typeof arg !== 'undefined');
}
