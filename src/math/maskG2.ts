import isNumber from '../checks/isNumber';
import isObject from '../checks/isObject';
import { GeometricE2 } from './GeometricE2';
import { GradeMasked } from './GradeMasked';
import { Unit } from './Unit';

/**
 * @hidden
 */
const ONE: Unit = void 0; // Unit.ONE;

/**
 * @hidden
 */
const scratch: GeometricE2 = { a: 0, x: 0, y: 0, xy: 0, b: 0, uom: ONE };

/**
 * "Promotes" the argument to a GeometricE2.
 * @hidden
 */
export function maskG2(arg: GeometricE2 | number): GeometricE2 {
    const duck = <GradeMasked>(arg as unknown);
    if (isObject(arg) && 'grades' in (arg as GeometricE2)) {
        const g = <GeometricE2>arg;
        if (duck.grades & 0x1) {
            scratch.a = g.a;
        }
        else {
            scratch.a = 0;
        }
        if (duck.grades & 0x2) {
            scratch.x = g.x;
            scratch.y = g.y;
        }
        else {
            scratch.x = 0;
            scratch.y = 0;
        }
        if (duck.grades & 0x4) {
            scratch.xy = g.xy;
        }
        else {
            scratch.xy = 0;
        }
        scratch.uom = Unit.mustBeUnit('g.uom', g.uom);
        return scratch;
    }
    else if (isNumber(arg)) {
        scratch.a = arg;
        scratch.x = 0;
        scratch.y = 0;
        scratch.xy = 0;
        scratch.b = 0;
        scratch.uom = ONE;
        return scratch;
    }
    else {
        return void 0;
    }
}
