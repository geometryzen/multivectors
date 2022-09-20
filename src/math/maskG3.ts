import isNumber from '../checks/isNumber';
import isObject from '../checks/isObject';
import { GeometricE3 } from './GeometricE3';
import { GradeMasked } from './GradeMasked';
import { Unit } from './Unit';

/**
 * @hidden
 */
const ONE: Unit = void 0; // Unit.ONE;

/**
 * @hidden
 */
const scratch: GeometricE3 = { a: 0, x: 0, y: 0, z: 0, yz: 0, zx: 0, xy: 0, b: 0, uom: ONE };

/**
 * @hidden 
 */
export function maskG3(arg: GeometricE3 | number): GeometricE3 {
    const duck = <GradeMasked>(arg as unknown);
    if (isObject(arg) && 'grades' in (arg as GeometricE3)) {
        const g = <GeometricE3>arg;
        if (duck.grades & 0x1) {
            scratch.a = g.a;
        }
        else {
            scratch.a = 0;
        }
        if (duck.grades & 0x2) {
            scratch.x = g.x;
            scratch.y = g.y;
            scratch.z = g.z;
        }
        else {
            scratch.x = 0;
            scratch.y = 0;
            scratch.z = 0;
        }
        if (duck.grades & 0x4) {
            scratch.yz = g.yz;
            scratch.zx = g.zx;
            scratch.xy = g.xy;
        }
        else {
            scratch.yz = 0;
            scratch.zx = 0;
            scratch.xy = 0;
        }
        if (duck.grades & 0x8) {
            scratch.b = g.b;
        }
        else {
            scratch.b = 0;
        }
        scratch.uom = Unit.mustBeUnit('g.uom', g.uom);
        return scratch;
    }
    else if (isNumber(arg)) {
        scratch.a = arg;
        scratch.x = 0;
        scratch.y = 0;
        scratch.z = 0;
        scratch.yz = 0;
        scratch.zx = 0;
        scratch.xy = 0;
        scratch.b = 0;
        scratch.uom = ONE;
        return scratch;
    }
    else {
        return void 0;
    }
}
