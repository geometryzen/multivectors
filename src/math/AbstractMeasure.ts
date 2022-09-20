import { readOnly } from "../i18n/readOnly";
import { Unit } from "./Unit";

/**
 * Sentinel value to indicate that the Geometric is not locked.
 * UNLOCKED is in the range -1 to 0.
 * @hidden
 */
const UNLOCKED = -1 * Math.random();

/**
 * Abstract base class providing a unit of measure and locking capabilities.
 * @hidden
 */
export abstract class AbstractMeasure {
    private $unit: Unit;

    /**
     * 
     */
    private lock_ = UNLOCKED;
    /**
     * 
     * @param uom
     */
    constructor(uom?: Unit) {
        this.$unit = uom;
    }

    get uom(): Unit {
        return this.$unit;
    }

    set uom(uom: Unit) {
        if (this.isMutable()) {
            this.$unit = uom;
        }
        else {
            throw new Error(readOnly('uom').message);
        }
    }

    /**
     * Determines whether this multivector is locked.
     * If the multivector is in the unlocked state then it is mutable.
     * If the multivector is in the locked state then it is immutable.
     */
    isLocked(): boolean {
        return this.lock_ !== UNLOCKED;
    }

    isMutable(): boolean {
        return this.lock_ === UNLOCKED;
    }

    /**
     * Locks this multivector (preventing any further mutation),
     * and returns a token that may be used to unlock it.
     */
    lock(): number {
        if (this.lock_ !== UNLOCKED) {
            throw new Error("already locked");
        }
        else {
            this.lock_ = Math.random();
            return this.lock_;
        }
    }

    /**
     * Unlocks this multivector (allowing mutation),
     * using a token that was obtained from a preceding lock method call.
     */
    unlock(token: number): this {
        if (this.lock_ === UNLOCKED) {
            throw new Error("not locked");
        }
        else if (this.lock_ === token) {
            this.lock_ = UNLOCKED;
            return this;
        }
        else {
            throw new Error("unlock denied");
        }
    }

    permlock(): this {
        this.lock();
        return this;
    }
}
