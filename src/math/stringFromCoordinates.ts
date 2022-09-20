import { Unit } from './Unit';

/**
 * @hidden
 */
function appendCoord(coord: number, numberToString: (x: number) => string, label: string, sb: string[]): void {
    if (coord !== 0) {
        if (coord >= 0) {
            if (sb.length > 0) {
                sb.push("+");
            }
        }
        else {
            sb.push("-");
        }
        const n = Math.abs(coord);
        if (n === 1) {
            // 1 times something is just 1, so we only need the label.
            sb.push(label);
        }
        else {
            sb.push(numberToString(n));
            if (label !== "1") {
                sb.push("*");
                sb.push(label);
            }
            else {
                // 1 times anything is just the thing.
                // We don't need the scalar label, but maybe we might?
            }
        }
    }
    else {
        // Do nothing if the coordinate is zero.
    }
}

/**
 * @hidden
 */
export function stringFromCoordinates(coordinates: number[], numberToString: (x: number) => string, labels: string[], uom: Unit): string {
    const sb: string[] = [];
    for (let i = 0, iLength = coordinates.length; i < iLength; i++) {
        const coord = coordinates[i];
        appendCoord(coord, numberToString, labels[i], sb);
    }
    if (Unit.isOne(uom)) {
        return sb.length > 0 ? sb.join("") : "0";
    }
    else {
        return sb.length > 0 ? `${sb.join("")} ${uom.toString(10, true)}` : "0";
    }
}
